export type CellIdent = string;

export interface DrumMachineState {
  activeCells: Set<CellIdent>
}

export const TOGGLE_CELL = "TOGGLE_CELL";

interface ToggleCellAction {
  type: typeof TOGGLE_CELL
  payload: CellIdent
}

export type DrumMachineTypes = ToggleCellAction
