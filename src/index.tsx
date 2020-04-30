import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import DrumMachine from "./components/DrumMachine";
import HowlSoundManager from "./HowlSoundManager";
import instruments from "./instruments";
import ISoundManager from "./ISoundManager";
import rootEpic from "./store/epics";
import { rootReducer } from "./store/reducers";
import { DrumMachineTypes } from "./store/types";

const epicMiddleware = createEpicMiddleware<DrumMachineTypes>();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(epicMiddleware)));

epicMiddleware.run(rootEpic);

const sm: ISoundManager = new HowlSoundManager();

ReactDOM.render(
  <Provider store={store}>
    <DrumMachine instruments={Object.values(instruments)} soundManager={sm} />
  </Provider>,
  document.getElementById("app")
);
