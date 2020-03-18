import * as React from "react";
import * as ReactDOM from "react-dom";

import DrumMachine from "./components/DrumMachine";
import instruments from "./instruments";

ReactDOM.render(
  <DrumMachine instruments={instruments} />,
  document.getElementById("app")
);
