import { interval } from "rxjs";
import {
  filter,
  pipe,
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
  setSelection
} from "./interface.ts";

const STEPS = 16;
const DEFAULT_BPM = 60;

const bpmToInterval = (bpm: number) => {
  return (60 / bpm) * 250;
};

const bpmSubject$ = new BehaviorSubject(bpmToInterval(DEFAULT_BPM));

bpmSource$
  .pipe(
    pluck("target", "value"),
    debounceTime(500),
    distinctUntilChanged(),
    map(v => +v)
  )
  .subscribe(v => bpmSubject$.next(bpmToInterval(+v)));

bpmSubject$.subscribe(stepper$);

const stepper$ = bpmSubject$
  .pipe(
    switchMap((bpm: number) => interval(bpm)),
    take(STEPS),
    repeat(),
    v => v
  )
  .subscribe(x => setCurrent(x));

gridClicks$
  .pipe(
    pluck("target", "id"),
    filter(id => id.includes("cell-"))
  )
  .subscribe(id => setSelection(id));
