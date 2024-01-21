import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { CanvasState } from "../store/canvas/canvas.state";
import { AsyncPipe } from "@angular/common";
import { Subject, takeUntil } from "rxjs";
import { CanvasEventService } from "../canvas-event.service";

@Component({
  selector: "app-status",
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: "./status.component.html",
  styleUrl: "./status.component.scss",
})
export class StatusComponent implements OnDestroy, OnInit {
  public status = "";
  public destroy$ = new Subject<void>();

  constructor(
    private store: Store<CanvasState>,
    private canvasEventService: CanvasEventService
  ) {}

  ngOnInit(): void {
    this.canvasEventService.pointerMove$
      .pipe(takeUntil(this.destroy$))
      .subscribe((ev) => {
        this.status = `x:${ev.x.toFixed(4)} / y:${ev.y.toFixed(4)}`;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
