import { CellIdent, TOGGLE_CELL, DrumMachineTypes } from "./types";

export function toggleCell(cell: CellIdent): DrumMachineTypes {
  return {
    type: TOGGLE_CELL,
    payload: cell
  }
}
