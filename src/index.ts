import { interval } from "rxjs";
import { filter, take, map, repeat, debounceTime, pluck, switchMap, distinctUntilChanged } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

import { bpmSource$, gridClicks$, setCurrent, setSelection, initialiseGrid } from "./interface";
import SoundInterface from "./SoundInterface";
import Instrument from "./Instrument";
import CellClick from "./CellClick";
import { SoundManager } from "./SoundManager";

const STEPS = 16;
const DEFAULT_BPM = 60;

const bpmToInterval = (bpm: number) => {
  return (60 / bpm) * 250;
};

const sm: SoundInterface = new SoundManager(STEPS);

initialiseGrid();

const steps$ = new BehaviorSubject(bpmToInterval(DEFAULT_BPM));

steps$.pipe(
  switchMap((bpm: number) => interval(bpm)),
  take(STEPS),
  repeat(),
  v => v
).subscribe(x => {
  setCurrent(x);
  sm.trigger(x);
});

bpmSource$
  .pipe(
    pluck<Event, string>("target", "value"),
    debounceTime(500),
    distinctUntilChanged<string>(),
    map((v: string) => { return +v })
  )
  .subscribe((v: number) => { return steps$.next(bpmToInterval(v)) });

gridClicks$
  .pipe(
    pluck<Event, string>("target", "id"),
    map((id: string) => id.match(/cell-([\w-]+)-(\d+)/)),
    filter((v): v is RegExpMatchArray => {
      return v !== null;
    }),
    map<RegExpMatchArray, CellClick>(match => {
      return <CellClick>{ id: match[0], sound: match[1], beat: +match[2] };
    })
  )
  .subscribe((cc: CellClick) => {
    setSelection(cc.id);
    sm.toggle(cc.sound, cc.beat);
  });
