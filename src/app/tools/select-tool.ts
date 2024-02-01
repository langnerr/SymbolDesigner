import { Component, OnInit } from "@angular/core";
import { CanvasEventService } from "../canvas-event.service";
import { takeUntil } from "rxjs";
import { Store } from "@ngrx/store";
import * as CanvasActions from "../store/canvas/canvas.actions";
import { BaseTool } from "./base-tool";

@Component({
  selector: "app-select-tool",
  standalone: true,
  imports: [],
  template: "",
})
export class SelectTool extends BaseTool implements OnInit {
  constructor(
    private canvasEventService: CanvasEventService,
    private store: Store
  ) {
    super();
  }

  ngOnInit(): void {
    this.canvasEventService.pointerDown$
      .pipe(takeUntil(this.destroy$))
      .subscribe((ev) => {
        console.log("selectTool pointerDown", ev);
        const ele = ev.event.target as SVGElement;
        const id = ele.id;

        if (id && id.startsWith("ele.")) {
          this.store.dispatch(CanvasActions.setSelectedIds({ ids: [id] }));
        } else {
          this.store.dispatch(CanvasActions.setSelectedIds({ ids: [] }));
        }
      });
  }
}
