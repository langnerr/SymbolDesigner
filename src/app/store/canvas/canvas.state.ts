import {
  Element,
  EllipseElement,
  IElement,
  LineElement,
  PathElement,
} from "../../models/element";

export interface CanvasState {
  viewportX: number;
  viewportY: number;
  viewportWidth: number;
  viewportHeight: number;
  viewportZoom: number;
  canvasWidth: number;
  canvasHeight: number;
  elements: IElement[];
  status: string;
}

export const initialState: CanvasState = {
  viewportX: 0,
  viewportY: 0,
  viewportWidth: 200,
  viewportHeight: 100,
  viewportZoom: 1.0,
  canvasWidth: 200,
  canvasHeight: 100,
  elements: [
    new LineElement(50, 50, 150, 50),
    new LineElement(50, 50, 50, 150),
    new LineElement(50, 50, 150, 150),
    new EllipseElement(200, 0, 20, 30),
    new PathElement(
      "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
    ),
  ],

  status: "",
};
