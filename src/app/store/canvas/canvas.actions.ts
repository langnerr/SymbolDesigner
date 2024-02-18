import { createAction, props } from "@ngrx/store";
import { Point } from "../../point";
import { IElement } from "../../models/element";

export const zooming = createAction(
  "[Canvas] zoom",
  props<{ deltaY: number; pt: Point }>()
);

export const resize = createAction(
  "[Canvas] resize",
  props<{ width: number; height: number }>()
);

export const panning = createAction(
  "[Canvas] panning",
  props<{ deltaX: number; deltaY: number }>()
);

export const createRandomLine = createAction(
  "[Canvas] createRandomLine",
  props<{ count: number }>()
);

export const setSelectedIds = createAction(
  "[Canvas] setSelectedIds",
  props<{ ids: string[] }>()
);

export const setTool = createAction(
  "[Canvas] setTool",
  props<{ tool: string }>()
);

export const replaceDynamic = createAction(
  "[Canvas] replaceDynamic",
  props<{ elements: IElement[] }>()
);

export const removeDynamic = createAction(
  "[Canvas] removeDynamic",
  props<{ ids: string[] }>()
);
