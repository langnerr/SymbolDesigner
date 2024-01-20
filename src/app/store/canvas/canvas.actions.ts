import { createAction, props } from "@ngrx/store";

export const zooming = createAction(
  "[Canvas] zoom",
  props<{ deltaY: number; ptX: number; ptY: number }>()
);

export const resize = createAction(
  "[Canvas] resize",
  props<{ width: number; height: number }>()
);

export const panning = createAction(
  "[Canvas] panning",
  props<{ x: number; y: number }>()
);

export const createRandomLine = createAction(
  "[Canvas] createRandomLine",
  props<{ count: number }>()
);

export const setStatus = createAction(
  "[Canvas] setStatus",
  props<{ text: string }>()
);
