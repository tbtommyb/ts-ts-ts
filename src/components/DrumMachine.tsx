import React, { Component } from "react";
import { BehaviorSubject } from "rxjs";
import Instruments from "../instruments";

import Grid from "./Grid";

interface DrumMachineProps {
  instruments: Array<Instruments>
}

type DrumMachineState = {
  clock$: BehaviorSubject<number>
}

class DrumMachine extends Component<DrumMachineProps, DrumMachineState> {
  state: DrumMachineState = {
    clock$: new BehaviorSubject((60 / 100) * 250)
  }

  render() {
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
        <Grid instruments={this.props.instruments} />
      </div>
    );
  }
}

export default DrumMachine;
