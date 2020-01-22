import { interval } from "rxjs";
import {
  filter,
  take,
  map,
  repeat,
  debounceTime,
  pluck,
  switchMap,
  distinctUntilChanged
} from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

import {
  bpmSource$,
  gridClicks$,
  setCurrent,
  setSelection,
  initialiseGrid
} from "./interface";
import { SoundManager, InstrumentIdent } from "./sounds";

const STEPS = 16;
const DEFAULT_BPM = 60;
const INSTRUMENTS: Array<InstrumentIdent> = [
  "closed-hihat",
  "open-hihat",
  "rimshot",
  "clap",
  "hi-tom",
  "medium-tom",
  "low-tom",
  "snare",
  "kick"
];

const bpmToInterval = (bpm: number) => {
  return (60 / bpm) * 250;
};

const bpmSubject$ = new BehaviorSubject(bpmToInterval(DEFAULT_BPM));

const sm = new SoundManager(STEPS);

initialiseGrid(INSTRUMENTS);

bpmSource$
  .pipe(
    pluck("target", "value"),
    debounceTime(500),
    distinctUntilChanged(),
    map(v => +v)
  )
  .subscribe(v => bpmSubject$.next(bpmToInterval(v)));

// TODO: fix TS errors here
bpmSubject$.subscribe(stepper$);

const stepper$ = bpmSubject$
  .pipe(
    switchMap((bpm: number) => interval(bpm)),
    take(STEPS),
    repeat(),
    v => v
  )
  .subscribe(x => {
    setCurrent(x);
    sm.trigger(x);
  });

gridClicks$
  .pipe(
    pluck("target", "id"),
    map((id: string) => id.match(/cell-([\w-]+)-(\d+)/)),
    filter(v => v !== null)
  )
  .subscribe(([id, instrument, beat]) => {
    setSelection(id);
    sm.toggleBeat(instrument, +beat);
  });
