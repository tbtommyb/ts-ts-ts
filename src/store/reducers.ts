import { DrumMachineState, DrumMachineTypes, TOGGLE_CELL, STEP, SET_BPM, CellIdent } from "./types";

const initialState: DrumMachineState = {
  activeCells: new Set<CellIdent>(),
  step: 0,
  bpm: 120
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
    case STEP:
      return { ...state, step: action.payload };
    case SET_BPM:
      return { ...state, bpm: action.payload };
    default:
      return state
  }
}

export type RootState = ReturnType<typeof rootReducer>;
