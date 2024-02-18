import { Component, OnDestroy, OnInit } from "@angular/core";
import { CanvasEvent, CanvasEventService } from "../canvas-event.service";
import { takeUntil } from "rxjs";
import { Store } from "@ngrx/store";
import * as CanvasActions from "../store/canvas/canvas.actions";
import { BaseTool } from "./base-tool";
import { Point } from "../point";
import { SelectionBox } from "../models/element";
import { newId } from "../util";

@Component({
  selector: "app-select-tool",
  standalone: true,
  imports: [],
  template: "",
})
export class SelectTool extends BaseTool implements OnInit {
  firstPoint: Point | undefined;
  boxId: string = "";

  constructor(
    private canvasEventService: CanvasEventService,
    private store: Store
  ) {
    super();
  }

  ngOnInit(): void {
    this.canvasEventService.pointerDown$
      .pipe(takeUntil(this.destroy$))
      .subscribe((ev) => this.onPointerDown(ev));

    this.canvasEventService.pointerUp$
      .pipe(takeUntil(this.destroy$))
      .subscribe((ev) => this.onPointerUp(ev));

    this.canvasEventService.pointerMove$
      .pipe(takeUntil(this.destroy$))
      .subscribe((ev) => this.onPointerMove(ev));
  }

  onPointerDown(ev: CanvasEvent<PointerEvent>) {
    console.log("selectTool pointerDown", ev);
    const ele = ev.event.target as SVGElement;
    const id = ele.id;

    if (id && id.startsWith("ele.")) {
      this.store.dispatch(CanvasActions.setSelectedIds({ ids: [id] }));
    } else {
      this.firstPoint = ev.pt;
      this.boxId = newId();

      this.store.dispatch(CanvasActions.setSelectedIds({ ids: [] }));
    }
  }

  onPointerUp(ev: CanvasEvent<PointerEvent>): void {
    this.firstPoint = undefined;
    this.store.dispatch(CanvasActions.removeDynamic({ ids: [this.boxId] }));
    this.boxId = "";
  }

  onPointerMove(ev: CanvasEvent<PointerEvent>) {
    if (this.firstPoint) {
      const { x, y, w, h } = this.calcRect(this.firstPoint, ev.pt);
      const box = new SelectionBox(x, y, w, h);
      box.id = this.boxId;

      this.store.dispatch(CanvasActions.replaceDynamic({ elements: [box] }));
    }
  }

  calcRect(p1: Point, p2: Point) {
    const x = Math.min(p1.x, p2.x);
    const y = Math.min(p1.y, p2.y);
    const w = Math.abs(p1.x - p2.x);
    const h = Math.abs(p1.y - p2.y);
    return { x, y, w, h };
  }
}
