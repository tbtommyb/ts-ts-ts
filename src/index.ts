import { interval } from "rxjs";
import { filter, take, map, repeat, debounceTime, pluck, switchMap, distinctUntilChanged } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

import { bpmSource$, gridClicks$, setCurrent, setSelection, initialiseGrid } from "./interface";
import SoundInterface from "./SoundInterface";
import Instrument from "./Instrument";
import { SoundManager } from "./sounds";

const STEPS = 16;
const DEFAULT_BPM = 60;

const bpmToInterval = (bpm: number) => {
  return (60 / bpm) * 250;
};

const bpmSubject$ = new BehaviorSubject(bpmToInterval(DEFAULT_BPM));

const sm: SoundInterface = new SoundManager(STEPS);

initialiseGrid();

bpmSource$
  .pipe(
    pluck("target", "value"),
    debounceTime(500),
    distinctUntilChanged(),
    map((v: string) => { return +v })
  )
  .subscribe((v: number) => { return bpmSubject$.next(bpmToInterval(v)) });

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
  .subscribe(function([id, sound, beat]: [string, Instrument, string]) {
    setSelection(id);
    sm.toggle(sound, +beat);
  });
