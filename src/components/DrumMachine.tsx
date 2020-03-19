import React, { FC } from "react";
import Instruments from "../instruments";

import Grid from "./Grid";

interface DrumMachineProps {
  instruments: Instruments
}

const DrumMachine: FC<DrumMachineProps> = props => {
  return (
    <div id="grid" className="centre">
      <div className="row bpm-input">
        <p id="name">ts-ts-ts</p>
        <p id="pause">pause</p>
        <div>
          <label htmlFor="bpm" className="label bpm-label">BPM</label>
          <input id="bpm" name="bpm" type="number" min="1" max="200" defaultValue="100" />
        </div>
      </div>
      <Grid instruments={props.instruments} />
    </div>
  );
}

export default DrumMachine;
