import { ofType } from "redux-observable";
import { interval, Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map, repeat, switchMap, take } from "rxjs/operators";
import { step } from "./actions";
import { DrumMachineTypes, SetBpmAction, SET_BPM } from "./types";

const STEPS = 16;
const bpmToInterval = (bpm: number) => {
  return (60 / bpm) * 250;
};

const bpmEpic = (
  action$: Observable<DrumMachineTypes>
): Observable<DrumMachineTypes> =>
  action$.pipe(
    ofType<DrumMachineTypes, SetBpmAction>(SET_BPM),
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((action: SetBpmAction) =>
      interval(bpmToInterval(action.payload)).pipe(
        take(STEPS),
        map((v: number) => step(v)),
        repeat()
      )
    )
  );

export default bpmEpic;
