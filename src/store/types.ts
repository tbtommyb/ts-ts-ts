export type CellIdent = string;

export interface DrumMachineState {
  activeCells: Set<CellIdent>
  step: number
}

export const TOGGLE_CELL = "TOGGLE_CELL";

interface ToggleCellAction {
  type: typeof TOGGLE_CELL
  payload: CellIdent
}

export const STEP = "STEP";

interface StepAction {
  type: typeof STEP
  step: number
}

export type DrumMachineTypes = ToggleCellAction | StepAction;
