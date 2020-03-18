export interface Cell {
  ident: string
  selected: boolean
  active: boolean
}

export interface DrumMachineState {
  activeCells: Set<Cell>
}

export const TOGGLE_CELL = "TOGGLE_CELL";

interface ToggleCellAction {
  type: typeof TOGGLE_CELL
  payload: Cell
}

export type DrumMachineTypes = ToggleCellAction
