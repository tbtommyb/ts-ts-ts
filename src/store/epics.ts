import { ofType } from "redux-observable";
import { Observable, interval } from "rxjs";
import { tap, take, takeWhile, repeat, switchMap, map } from "rxjs/operators";
import { DrumMachineTypes, SET_BPM, SetBpmAction } from "./types";
import { step } from "./actions";

const STEPS = 16;
const bpmToInterval = (bpm: number) => {
  return (60 / bpm) * 250;
};

const bpmEpic = (
  action$: Observable<DrumMachineTypes>
): Observable<DrumMachineTypes> =>
  action$.pipe(
  ofType<DrumMachineTypes, SetBpmAction>(SET_BPM),
    switchMap((action: SetBpmAction) =>
      interval(bpmToInterval(action.payload)).pipe(
        take(STEPS),
        map((v: number) => step(v)),
        repeat()
      )
    )
  );

export default bpmEpic;
