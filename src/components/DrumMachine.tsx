import React, { FC, Component, useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BehaviorSubject } from "rxjs";
import Instruments from "../instruments";
import { setBpm } from "../store/actions";
import { RootState } from "../store/reducers";

import Grid from "./Grid";

interface DrumMachineProps {
  instruments: Array<Instruments>
}

const DrumMachine: FC<DrumMachineProps> = ({ instruments }) => {
  const bpm = useSelector((state: RootState) => state.bpm);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBpm(bpm));
  }, []);

  const handleBpmChange = (e: ChangeEvent<{ value: string }>) => {
    e.preventDefault();

    dispatch(setBpm(+e.target.value));
  };

  return (
    <div id="grid" className="centre">
      <div className="row bpm-input">
        <p id="name">ts-ts-ts</p>
        <p id="pause">pause</p>
        <div>
          <label htmlFor="bpm" className="label bpm-label">BPM</label>
          <input id="bpm" name="bpm" type="number" min="1" max="200" value={bpm} onChange={handleBpmChange} />
        </div>
      </div>
      <Grid instruments={instruments} />
    </div>
  );
}

export default DrumMachine;
