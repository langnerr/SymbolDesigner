import { createReducer, on } from "@ngrx/store";
import { initialState } from "./canvas.state";
import * as Actions from "./canvas.actions";
import { round } from "../../util";

export const canvasReducer = createReducer(
  initialState,

  on(Actions.zooming, (state, { deltaY, ptX, ptY }) => {
    const MAX_DELTA = 10;
    let delta = Math.min(Math.abs(deltaY), MAX_DELTA);
    const sign = -Math.sign(deltaY);
    delta *= sign;

    const oldZoom = state.viewportZoom;
    const newZoom = oldZoom * (1 + delta / 100);

    // ptXY should stay on the same device-Coord
    // (ptX - oldViewX) * oldZoom ==  (ptX - newViewX) * newZoom
    //
    const newX = ptX - (oldZoom / newZoom) * (ptX - state.viewportX);
    const newY = ptY - (oldZoom / newZoom) * (ptY - state.viewportY);
    return {
      ...state,
      viewportZoom: round(newZoom),
      viewportX: round(newX),
      viewportY: round(newY),
      viewportWidth: round(state.viewportWidth / newZoom),
      viewportHeight: round(state.viewportHeight / newZoom),
    };
  }),

  on(Actions.resize, (state, { width, height }) => ({
    ...state,
    canvasWidth: round(width),
    canvasHeight: round(height),
    viewportWidth: round(width / state.viewportZoom),
    viewportHeight: round(height / state.viewportZoom),
  })),

  on(Actions.panning, (state, { x, y }) => ({
    ...state,
    viewportX: round(x),
    viewportY: round(y),
  })),

  on(Actions.createRandomLine, (state) => {
    return { ...state };
  })
);
