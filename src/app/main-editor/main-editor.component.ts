import { Component, ViewChild } from "@angular/core";
import { ConfigService } from "../config.service";
import { CanvasComponent } from "../canvas/canvas.component";

@Component({
  selector: "app-main-editor",
  standalone: true,
  imports: [CanvasComponent],
  templateUrl: "./main-editor.component.html",
  styleUrl: "./main-editor.component.scss",
})
export class MainEditorComponent {
  @ViewChild(CanvasComponent) canvas?: CanvasComponent;
  canvasWidth = 100;
  canvasHeight = 100;
  strokeWidth = 1;

  constructor(public cfg: ConfigService) {}

  updateViewPort(
    x: number,
    y: number,
    w: number | null,
    h: number | null,
    force = false
  ) {
    if (!force && this.cfg.viewPortLocked) {
      return;
    }
    if (w === null && h !== null) {
      w = (this.canvasWidth * h) / this.canvasHeight;
    }
    if (h === null && w !== null) {
      h = (this.canvasHeight * w) / this.canvasWidth;
    }
    if (!w || !h) {
      return;
    }

    this.cfg.viewPortX = parseFloat((1 * x).toPrecision(6));
    this.cfg.viewPortY = parseFloat((1 * y).toPrecision(6));
    this.cfg.viewPortWidth = parseFloat((1 * w).toPrecision(4));
    this.cfg.viewPortHeight = parseFloat((1 * h).toPrecision(4));
    this.strokeWidth = this.cfg.viewPortWidth / this.canvasWidth;
  }
}
