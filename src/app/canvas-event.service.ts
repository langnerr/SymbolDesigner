import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Point } from "./point";

export type CanvasEvent<T> = {
  pt: Point;
  event: T;
};

@Injectable({
  providedIn: "root",
})
export class CanvasEventService {
  public pointerDown$ = new Subject<CanvasEvent<PointerEvent>>();
  public pointerUp$ = new Subject<CanvasEvent<PointerEvent>>();
  public pointerMove$ = new Subject<CanvasEvent<PointerEvent>>();
  public wheel$ = new Subject<CanvasEvent<WheelEvent>>();

  constructor() {}

  handlePointerDown(ev: CanvasEvent<PointerEvent>) {
    this.pointerDown$.next(ev);
  }

  handlePointerUp(ev: CanvasEvent<PointerEvent>) {
    this.pointerUp$.next(ev);
  }

  handlePointerMove(ev: CanvasEvent<PointerEvent>) {
    this.pointerMove$.next(ev);
  }

  handleWheel(ev: CanvasEvent<WheelEvent>) {
    this.wheel$.next(ev);
  }
}
