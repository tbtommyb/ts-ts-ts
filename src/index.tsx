import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";

console.log("hello from tsx");
ReactDOM.render(
  <Hello compiler="TypeScript" framework="React" />,
  document.getElementById("example")
);
