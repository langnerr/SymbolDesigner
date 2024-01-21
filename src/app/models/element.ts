import { nanoid } from "nanoid";

export interface IElement {
  type: string;
  id: string;
  x1: number;
  y1: number;
  color: string;
}

export abstract class Element implements IElement {
  type = "base";
  id = nanoid();
  x1: number = 0;
  y1: number = 0;
  color = "red";

  constructor(x1: number, y1: number) {
    this.x1 = x1;
    this.y1 = y1;
  }
}

export class LineElement extends Element {
  override type = "line";
  x2: number = 50;
  y2: number = 50;

  constructor(x1: number, y1: number, x2: number, y2: number) {
    super(x1, y1);
    this.x2 = x2;
    this.y2 = y2;
  }
}

export class EllipseElement extends Element {
  override type = "ellipse";
  rx: number = 50;
  ry: number = 50;

  constructor(x1: number, y1: number, rx: number, ry: number) {
    super(x1, y1);
    this.rx = rx;
    this.ry = ry;
  }
}

export class PathElement extends Element {
  override type = "path";
  path: string = "";

  constructor(path: string) {
    super(0, 0);
    this.path = path;
  }
}
