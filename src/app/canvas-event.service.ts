import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export type CanvasPointerEvent = {
  x: number;
  y: number;
  event: PointerEvent;
};

export type CanvasEvent<T> = {
  x: number;
  y: number;
  event: T;
};

@Injectable({
  providedIn: "root",
})
export class CanvasEventService {
  public pointerDown$ = new Subject<CanvasPointerEvent>();
  public pointerMove$ = new Subject<CanvasPointerEvent>();
  public wheel$ = new Subject<CanvasEvent<WheelEvent>>();

  constructor() {}

  handlePointerDown(ev: CanvasPointerEvent) {
    this.pointerDown$.next(ev);
  }

  handlePointerMove(ev: CanvasPointerEvent) {
    this.pointerMove$.next(ev);
  }

  handleWheel(ev: { x: number; y: number; event: WheelEvent }) {
    this.wheel$.next(ev);
  }
}
