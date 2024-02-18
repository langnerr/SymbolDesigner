import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, take, takeUntil } from "rxjs";
import { CanvasEventService } from "../canvas-event.service";
import { round } from "../util";
import { Store } from "@ngrx/store";
import * as CanvasSelectors from "../store/canvas/canvas.selectors";
import * as CanvasActions from "../store/canvas/canvas.actions";
import { BaseTool } from "./base-tool";

@Component({
  selector: "app-zoompanning-tool",
  standalone: true,
  imports: [],
  template: "",
})
export class ZoomPanningTool extends BaseTool implements OnInit {
  constructor(
    private canvasEventService: CanvasEventService,
    private store: Store
  ) {
    super();
  }

  ngOnInit(): void {
    this.canvasEventService.wheel$
      .pipe(takeUntil(this.destroy$))
      .subscribe((ev) => {
        if (ev.event.metaKey || ev.event.ctrlKey) {
          this.store.dispatch(
            CanvasActions.zooming({
              deltaY: ev.event.deltaY,
              pt: ev.pt,
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
      });
  }
}
