import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CanvasState } from "./canvas.state";

export const selectCanvas = createFeatureSelector<CanvasState>("canvas");

export const currentToolName = createSelector(
  selectCanvas,
  (state) => state.currentToolName
);

export const canvasHeight = createSelector(
  selectCanvas,
  (state) => state.canvasHeight
);

export const canvasWidth = createSelector(
  selectCanvas,
  (state) => state.canvasWidth
);

export const viewPortX = createSelector(
  selectCanvas,
  (state) => state.viewportX
);

export const viewPortY = createSelector(
  selectCanvas,
  (state) => state.viewportY
);
export const viewPortZoom = createSelector(
  selectCanvas,
  (state) => state.viewportZoom
);

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

export const selectElements = createSelector(selectCanvas, (state) => {
  if (state.selectedIds.length === 0) {
    return state.elements;
  } else {
    return state.elements.map((ele) => {
      if (state.selectedIds.includes(ele.id)) {
        return { ...ele, selected: true };
      } else {
        return ele;
      }
    });
  }
});
