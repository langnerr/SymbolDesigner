export interface IElement {
  x1: number;
  y1: number;
  color: string;
}

export class Element implements IElement {
  x1: number = 0;
  y1: number = 0;
  color = "red";
}

export class LineElement extends Element {
  x2: number = 50;
  y2: number = 50;
}
