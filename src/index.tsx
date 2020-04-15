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

const epicMiddleware = createEpicMiddleware<DrumMachineTypes>();
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(epicMiddleware)));

epicMiddleware.run(rootEpic);

ReactDOM.render(
  <Provider store={store}>
    <DrumMachine instruments={Object.values(instruments)} />
  </Provider>,
  document.getElementById("app")
);
