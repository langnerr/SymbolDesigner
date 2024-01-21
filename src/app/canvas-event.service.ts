import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export type CanvasPointerEvent = {
  x: number;
  y: number;
  event: PointerEvent;
};

@Injectable({
  providedIn: "root",
})
export class CanvasEventService {
  public pointerDown$ = new Subject<CanvasPointerEvent>();
  public pointerMove$ = new Subject<CanvasPointerEvent>();

  constructor() {}

  handlePointerDown(ev: CanvasPointerEvent) {
    this.pointerDown$.next(ev);
  }

  handlePointerMove(ev: CanvasPointerEvent) {
    this.pointerMove$.next(ev);
  }
}
