import { CellIdent, TICK, TOGGLE_CELL, DrumMachineTypes } from "./types";
import { interval } from "rxjs";
import { take, repeat, switchMap, mapTo } from "rxjs/operators";
import { ofType } from "redux-observable";

export function toggleCell(cell: CellIdent): DrumMachineTypes {
  return {
    type: TOGGLE_CELL,
    payload: cell
  }
}

export function tick(step: number): DrumMachineTypes {
  return {
    type: TICK,
    step
  }
}
