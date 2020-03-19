import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import DrumMachine from "./components/DrumMachine";
import instruments from "./instruments";
import drumMachine from "./store/reducers";

const store = createStore(drumMachine);

ReactDOM.render(
  <Provider store={store}>
    <DrumMachine instruments={Object.values(instruments)} />
  </Provider>,
  document.getElementById("app")
);
