import { Vector } from "./Vector";

export type NodeType = "HANDLE" | "LINE" | "RECT";

export abstract class BaseNode {
  id: string = "";
  color: string = "red";
  abstract type: NodeType;

  constructor() {
    this.id = Math.random().toString(36).substring(7);
  }

  abstract getPosition(): Vector;
  abstract setPosition(pos: Vector): void;
}
export class LineNode extends BaseNode {
  type: NodeType = "LINE";
  x1: number = 0;
  y1: number = 0;
  x2: number = 100;
  y2: number = 100;

  constructor() {
    super();
  }

  getPosition(): Vector {
    return new Vector(this.x1, this.y1);
  }

  setPosition(pos: Vector) {
    const dx = this.x2 - this.x1;
    const dy = this.y2 - this.y1;

    this.x1 = pos.x;
    this.y1 = pos.y;
    this.x2 = pos.x + dx;
    this.y2 = pos.y + dy;
  }
}
export class RectangleNode extends BaseNode {
  type: NodeType = "RECT";
  x: number = 0;
  y: number = 0;
  width: number = 100;
  height: number = 100;
  fillColor: string = "blue";

  constructor() {
    super();
  }

  getPosition(): Vector {
    return new Vector(this.x, this.y);
  }
  setPosition(pos: Vector): void {
    this.x = pos.x;
    this.y = pos.y;
  }
}

export class HandleNode extends BaseNode {
  type: NodeType = "HANDLE";
  index: number = 0;
  x: number = 0;
  y: number = 0;
  size: number = 6;
  color: string = "#eeeeeed0";

  constructor(index: number, x: number, y: number) {
    super();
    this.index = index;
    this.x = x;
    this.y = y;
  }

  getPosition(): Vector {
    return new Vector(this.x, this.y);
  }

  setPosition(pos: Vector): void {
    this.x = pos.x;
    this.y = pos.y;
  }
}
