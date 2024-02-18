import { createReducer, on } from "@ngrx/store";
import { initialState } from "./canvas.state";
import * as Actions from "./canvas.actions";
import { round } from "../../util";
import { LineElement } from "../../models/element";
import { dynamicElements } from "./canvas.selectors";

export const canvasReducer = createReducer(
  initialState,

  on(Actions.setTool, (state, { tool }) => {
    return { ...state, currentToolName: tool };
  }),

  on(Actions.zooming, (state, { deltaY, pt }) => {
    const MAX_DELTA = 10;
    let delta = Math.min(Math.abs(deltaY), MAX_DELTA);
    const sign = -Math.sign(deltaY);
    delta *= sign;

    const oldZoom = state.viewportZoom;
    const newZoom = oldZoom * (1 + delta / 100);

    // ptXY should stay on the same device-Coord
    // (ptX - oldViewX) * oldZoom ==  (ptX - newViewX) * newZoom
    //
    const newX = pt.x - (oldZoom / newZoom) * (pt.x - state.viewportX);
    const newY = pt.y - (oldZoom / newZoom) * (pt.y - state.viewportY);
    return {
      ...state,
      viewportZoom: round(newZoom),
      viewportX: round(newX),
      viewportY: round(newY),
      viewportWidth: round(state.canvasWidth / newZoom),
      viewportHeight: round(state.canvasHeight / newZoom),
    };
  }),

  on(Actions.resize, (state, { width, height }) => ({
    ...state,
    canvasWidth: round(width),
    canvasHeight: round(height),
    viewportWidth: round(width / state.viewportZoom),
    viewportHeight: round(height / state.viewportZoom),
  })),

  on(Actions.panning, (state, { deltaX, deltaY }) => ({
    ...state,
    viewportX: round(state.viewportX + deltaX / state.viewportZoom),
    viewportY: round(state.viewportY + deltaY / state.viewportZoom),
  })),

  on(Actions.replaceDynamic, (state, { elements }) => {
    const newDynamicElements = { ...state.dynamicElements };
    for (let ele of elements) {
      newDynamicElements[ele.id] = { ...ele };
    }
    return {
      ...state,
      dynamicElements: newDynamicElements,
    };
  }),

  on(Actions.removeDynamic, (state, { ids }) => {
    const newDynamicElements = { ...state.dynamicElements };
    for (let id of ids) {
      delete newDynamicElements[id];
    }
    return {
      ...state,
      dynamicElements: newDynamicElements,
    };
  }),

  on(Actions.createRandomLine, (state, { count }) => {
    const x0 = state.viewportX;
    const dx = state.viewportWidth - state.viewportX;
    const y0 = state.viewportY;
    const dy = state.viewportHeight - state.viewportY;

    let newLines = [];
    for (let i = 0; i < count; i++) {
      const x1 = Math.floor(x0 + Math.random() * dx);
      const y1 = Math.floor(y0 + Math.random() * dy);
      const x2 = Math.floor(x0 + Math.random() * dx);
      const y2 = Math.floor(y0 + Math.random() * dy);
      const line = new LineElement(x1, y1, x2, y2);
      newLines.push(line);
    }
    const ele = state.elements.concat(newLines);
    return { ...state, elements: ele };
  }),

  on(Actions.setSelectedIds, (state, { ids }) => ({
    ...state,
    selectedIds: ids,
  }))
);
