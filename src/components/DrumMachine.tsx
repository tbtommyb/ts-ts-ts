import React, { FC, Component, useEffect, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BehaviorSubject } from "rxjs";
import Instruments from "../instruments";
import { setBpm, toggleCell } from "../store/actions";
import { RootState } from "../store/reducers";
import ISoundManager from "../ISoundManager";
import HowlSoundManager from "../HowlSoundManager";
import { CellIdent } from "../store/types";

import Grid from "./Grid";

const css = require("./styles/app.css");

interface DrumMachineProps {
  instruments: Array<Instruments>
  soundManager: ISoundManager
}

const DrumMachine: FC<DrumMachineProps> = ({ instruments, soundManager }) => {
  const bpm = useSelector((state: RootState) => state.bpm);
  const step = useSelector((state: RootState) => state.step);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBpm(bpm));
  }, []);

  useEffect(() => {
    soundManager.trigger(step);
  }, [step]);

  const handleBpmChange = (e: ChangeEvent<{ value: string }>) => {
    e.preventDefault();

    dispatch(setBpm(+e.target.value));
  };

  const handleToggle = (ident: CellIdent) => {
    const [_, instrument, beat] = ident.split("-"); // TODO: move away from CellIdent as string
    soundManager.toggle(instrument as Instruments, +beat);
    dispatch(toggleCell(ident));
  };

  return (
    <div id="grid" className="centre">
      <div className="row bpm-input">
        <p id="name">ts-ts-ts</p>
        <p id="pause">pause</p>
        <div>
          <label htmlFor="bpm" className="label bpm-label">BPM</label>
      <input id="bpm" name="bpm" type="number" min="1" max="200" value={bpm} onChange={handleBpmChange}/>
        </div>
      </div>
      <Grid instruments={instruments} onClick={handleToggle} />
    </div>
  );
}

export default DrumMachine;
