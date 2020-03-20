import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./store/reducers";
import { BehaviorSubject, interval } from "rxjs";
import { take, repeat, switchMap } from "rxjs/operators";

import DrumMachine from "./components/DrumMachine";
import instruments from "./instruments";
import { tick } from "./store/actions";

const store = createStore(rootReducer);

const STEPS = 16;
const DEFAULT_BPM = 60;
const bpmToInterval = (bpm: number) => {
  return (60 / bpm) * 250;
};

const steps$ = new BehaviorSubject(bpmToInterval(DEFAULT_BPM));
steps$.pipe(
  switchMap((bpm: number) => interval(bpm)),
  take(STEPS),
  repeat(),
  v => v
).subscribe(x => store.dispatch(tick(x)));

ReactDOM.render(
  <Provider store={store}>
    <DrumMachine instruments={Object.values(instruments)} />
  </Provider>,
  document.getElementById("app")
);
