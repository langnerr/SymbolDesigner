import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { CanvasEventService } from "../canvas-event.service";

@Component({
  selector: "app-create-tool",
  standalone: true,
  imports: [],
  template: "",
})
export class CreateToolComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  constructor(private canvasEventService: CanvasEventService) {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit(): void {
    this.canvasEventService.pointerDown$
      .pipe(takeUntil(this.destroy$))
      .subscribe((ev) => {
        console.log("createTool pointerDown", ev);
      });
  }
}
