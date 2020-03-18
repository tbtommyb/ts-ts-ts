import { Cell, TOGGLE_CELL, DrumMachineTypes } from "./types";

export function toggleCell(cell: Cell): DrumMachineTypes {
  return {
    type: TOGGLE_CELL,
    payload: cell
  }
}
