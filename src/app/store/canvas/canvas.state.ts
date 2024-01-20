import { Element, IElement } from "../../models/element";

export interface CanvasState {
  viewportX: number;
  viewportY: number;
  viewportWidth: number;
  viewportHeight: number;
  viewportZoom: number;
  canvasWidth: number;
  canvasHeight: number;
  elements: IElement[];
}

export const initialState: CanvasState = {
  viewportX: 0,
  viewportY: 0,
  viewportWidth: 200,
  viewportHeight: 100,
  viewportZoom: 1.0,
  canvasWidth: 200,
  canvasHeight: 100,
  elements: [],
};
