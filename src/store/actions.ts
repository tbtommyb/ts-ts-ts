import { CellIdent, STEP, TOGGLE_CELL, DrumMachineTypes } from "./types";
import { interval } from "rxjs";
import { take, repeat, switchMap, mapTo } from "rxjs/operators";

export function toggleCell(cell: CellIdent): DrumMachineTypes {
  return {
    type: TOGGLE_CELL,
    payload: cell
  }
}

export function step(step: number): DrumMachineTypes {
  return {
    type: STEP,
    step
  }
}
