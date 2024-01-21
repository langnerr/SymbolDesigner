import { createFeatureSelector, createSelector } from "@ngrx/store";
import { GuiState } from "./gui.state";

export const selectGui = createFeatureSelector<GuiState>("gui");

export const showCommandLine = createSelector(
  selectGui,
  (state) => state.showCommandLine
);
