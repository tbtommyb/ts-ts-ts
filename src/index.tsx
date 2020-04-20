import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import { createEpicMiddleware } from "redux-observable";
import { rootReducer } from "./store/reducers";
import rootEpic from "./store/epics";
import { DrumMachineTypes } from "./store/types";

import DrumMachine from "./components/DrumMachine";
import instruments from "./instruments";
import { step } from "./store/actions";
import ISoundManager from "./ISoundManager";
import HowlSoundManager from "./HowlSoundManager";

const epicMiddleware = createEpicMiddleware<DrumMachineTypes>();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(epicMiddleware)));

epicMiddleware.run(rootEpic);

const sm: ISoundManager = new HowlSoundManager(16); // fixme

ReactDOM.render(
  <Provider store={store}>
    <DrumMachine instruments={Object.values(instruments)} />
  </Provider>,
  document.getElementById("app")
);
