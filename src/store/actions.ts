import { CellIdent, STEP, TOGGLE_CELL, SET_BPM, DrumMachineTypes } from "./types";
import { interval } from "rxjs";
import { take, repeat, switchMap, mapTo } from "rxjs/operators";

export function toggleCell(cell: CellIdent): DrumMachineTypes {
  return {
    type: TOGGLE_CELL,
    payload: cell
  }
}

export function setBpm(bpm: number): DrumMachineTypes {
  return {
    type: SET_BPM,
    payload: bpm
  }
}

export function step(step: number): DrumMachineTypes {
  return {
    type: STEP,
    payload: step
  }
}
