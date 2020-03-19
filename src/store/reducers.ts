import { combineReducers } from "redux";
import { DrumMachineState, DrumMachineTypes, TOGGLE_CELL, CellIdent } from "./types";

const initialState: DrumMachineState = {
  activeCells: new Set<CellIdent>()
}

export function cellsReducer(state = initialState, action: DrumMachineTypes): DrumMachineState {
  switch (action.type) {
    case TOGGLE_CELL:
      let newState = new Set(state.activeCells);
      if (newState.has(action.payload)) {
        newState.delete(action.payload);
      } else {
        newState.add(action.payload);
      }
      return { ...state, activeCells: newState };
    default:
      return state
  }
}

const rootReducer = combineReducers({ cells: cellsReducer });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
