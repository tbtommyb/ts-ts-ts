export type CellIdent = string;

export interface DrumMachineState {
  activeCells: Set<CellIdent>
  step: number
  bpm: number
}

export const TOGGLE_CELL = "TOGGLE_CELL";

interface ToggleCellAction {
  type: typeof TOGGLE_CELL
  payload: CellIdent
}

export const STEP = "STEP";

interface StepAction {
  type: typeof STEP
  payload: number
}

export const SET_BPM = "SET_BPM";

export interface SetBpmAction {
  type: typeof SET_BPM
  payload: number
}

export type DrumMachineTypes = ToggleCellAction | StepAction | SetBpmAction;
