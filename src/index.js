"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const rxjs_2 = require("rxjs");
const interface_1 = require("./interface");
const sounds_1 = require("./sounds");
const STEPS = 16;
const DEFAULT_BPM = 60;
const bpmToInterval = (bpm) => {
    return (60 / bpm) * 250;
};
const bpmSubject$ = new rxjs_2.BehaviorSubject(bpmToInterval(DEFAULT_BPM));
const sm = new sounds_1.SoundManager(STEPS);
interface_1.initialiseGrid();
interface_1.bpmSource$
    .pipe(operators_1.pluck("target", "value"), operators_1.debounceTime(500), operators_1.distinctUntilChanged(), operators_1.map((v) => { return +v; }))
    .subscribe((v) => { return bpmSubject$.next(bpmToInterval(v)); });
// TODO: fix TS errors here
bpmSubject$.subscribe(stepper$);
const stepper$ = bpmSubject$
    .pipe(operators_1.switchMap((bpm) => rxjs_1.interval(bpm)), operators_1.take(STEPS), operators_1.repeat(), v => v)
    .subscribe(x => {
    interface_1.setCurrent(x);
    sm.trigger(x);
});
interface_1.gridClicks$
    .pipe(operators_1.pluck("target", "id"), operators_1.map((id) => id.match(/cell-([\w-]+)-(\d+)/)), operators_1.filter(v => v !== null))
    .subscribe(function ([id, sound, beat]) {
    interface_1.setSelection(id);
    sm.toggle(sound, +beat);
});
