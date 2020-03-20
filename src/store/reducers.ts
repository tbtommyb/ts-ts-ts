import { DrumMachineState, DrumMachineTypes, TOGGLE_CELL, TICK, CellIdent } from "./types";

const initialState: DrumMachineState = {
  activeCells: new Set<CellIdent>(),
  step: 0
}

export function rootReducer(state = initialState, action: DrumMachineTypes): DrumMachineState {
  switch (action.type) {
    case TOGGLE_CELL:
      let newState = new Set(state.activeCells);
      if (newState.has(action.payload)) {
        newState.delete(action.payload);
      } else {
        newState.add(action.payload);
      }
      return { ...state, activeCells: newState };
    case TICK:
      return { ...state, step: action.step };
    default:
      return state
  }
}

export type RootState = ReturnType<typeof rootReducer>;
