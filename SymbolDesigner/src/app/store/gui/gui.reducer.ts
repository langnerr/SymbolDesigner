import { createReducer, on } from "@ngrx/store";
import { initialState } from "./gui.state";
import * as Actions from "./gui.actions";

export const guiReducer = createReducer(
  initialState,

  on(Actions.showCommandLine, (state, { show }) => ({
    ...state,
    showCommandLine: show,
  }))
);
