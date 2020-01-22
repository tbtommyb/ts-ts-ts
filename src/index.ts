import { range, interval, fromEvent, Observable } from 'rxjs';
import { throttle, pipe, flatMap, take, map, zip, repeat, debounceTime, pluck, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject } from "rxjs";

const STEPS = 16;
const DEFAULT_BPM = 60;

const bpmToInterval = (bpm :number) => {
    return (60 / bpm) * 250
}

const bpmSubject$ = new BehaviorSubject(bpmToInterval(DEFAULT_BPM));

const bpmInput = document.getElementById("bpm");
const bpmSource$ = fromEvent(bpmInput, "input")

bpmSource$.pipe(
    pluck("target", "value"),
    debounceTime(500),
    distinctUntilChanged(),
    map(v => +v)
).subscribe(v => bpmSubject$.next(bpmToInterval(+v)));

bpmSubject$.subscribe(stepper$)

const stepper$ = bpmSubject$
    .pipe(
        switchMap((bpm : number) => interval(bpm)),
        take(STEPS),
        repeat(),
        v => v
    )
    .subscribe(x => {
        resetSelection(cells);
        setCurrent(x);
    });

// TODO: replace with React
const cells = document.querySelectorAll(".cell");

const resetSelection = (cells) => {
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("current");
    }
}

const setCurrent = (n : number) => {
    document.getElementById(`cell-0-${n}`).classList.add("current");
}
