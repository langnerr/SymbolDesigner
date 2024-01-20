import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CanvasState } from "./canvas.state";

export const selectCanvas = createFeatureSelector<CanvasState>("canvas");

export const selectSize = createSelector(selectCanvas, (state) => ({
  width: state.canvasWidth,
  height: state.canvasHeight,
}));

export const selectViewport = createSelector(selectCanvas, (state) => ({
  x: state.viewportX,
  y: state.viewportY,
  width: state.viewportWidth,
  height: state.viewportHeight,
  zoom: state.viewportZoom,
}));

export const selectElements = createSelector(
  selectCanvas,
  (state) => state.elements
);

export const selectStatus = createSelector(
  selectCanvas,
  (state) => state.status
);
