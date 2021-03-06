import { CellIdent, DrumMachineTypes, SET_BPM, STEP, TOGGLE_CELL } from "./types";

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
