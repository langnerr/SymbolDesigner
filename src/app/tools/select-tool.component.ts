import { Component, OnDestroy, OnInit } from "@angular/core";
import { CanvasEventService } from "../canvas-event.service";
import { Subject, takeUntil } from "rxjs";
import { Store } from "@ngrx/store";
import * as CanvasActions from "../store/canvas/canvas.actions";

@Component({
  selector: "app-select-tool",
  standalone: true,
  imports: [],
  template: "",
})
export class SelectToolComponent implements OnInit, OnDestroy {
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
    this.canvasEventService.pointerDown$
      .pipe(takeUntil(this.destroy$))
      .subscribe((ev) => {
        console.log("selectTool pointerDown", ev);
        const ele = ev.event.target as SVGElement;
        const id = ele.id;

        if (id && id.startsWith("ele.")) {
          this.store.dispatch(CanvasActions.setSelectedIds({ ids: [id] }));
        }
      });
  }
}
