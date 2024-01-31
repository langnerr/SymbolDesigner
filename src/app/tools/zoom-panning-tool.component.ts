import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, take, takeUntil } from "rxjs";
import { CanvasEventService } from "../canvas-event.service";
import { round } from "../util";
import { Store } from "@ngrx/store";
import * as CanvasSelectors from "../store/canvas/canvas.selectors";
import * as CanvasActions from "../store/canvas/canvas.actions";

@Component({
  selector: "app-zoompanning-tool",
  standalone: true,
  imports: [],
  template: "",
})
export class ZoomPanningToolComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  constructor(
    private canvasEventService: CanvasEventService,
    private store: Store
  ) {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit(): void {
    this.canvasEventService.wheel$
      .pipe(takeUntil(this.destroy$))
      .subscribe((ev) => {
        if (ev.event.metaKey || ev.event.ctrlKey) {
          this.store.dispatch(
            CanvasActions.zooming({
              deltaY: ev.event.deltaY,
              ptX: ev.x,
              ptY: ev.y,
            })
          );
        } else {
          this.store.dispatch(
            CanvasActions.panning({
              deltaX: ev.event.deltaX,
              deltaY: ev.event.deltaY,
            })
          );
        }

        console.log("createTool pointerDown", ev);
      });
  }
}
