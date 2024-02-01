import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { CanvasEventService } from "../canvas-event.service";
import { BaseTool } from "./base-tool";

@Component({
  selector: "app-create-tool",
  standalone: true,
  imports: [],
  template: "",
})
export class CreateTool extends BaseTool {
  constructor(private canvasEventService: CanvasEventService) {
    super();
  }

  ngOnInit(): void {
    this.canvasEventService.pointerDown$
      .pipe(takeUntil(this.destroy$))
      .subscribe((ev) => {
        console.log("createTool pointerDown", ev);
      });
  }
}
