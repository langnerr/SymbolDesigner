import { Component, ViewChild } from "@angular/core";
import { ConfigService } from "../config.service";
import { CanvasComponent } from "../canvas/canvas.component";
import { round } from "../util";

@Component({
  selector: "app-main-editor",
  standalone: true,
  imports: [CanvasComponent],
  templateUrl: "./main-editor.component.html",
  styleUrl: "./main-editor.component.scss",
})
export class MainEditorComponent {
  @ViewChild(CanvasComponent) canvas?: CanvasComponent;

  public canvasWidth = 0;
  public canvasHeight = 0;

  constructor(public cfg: ConfigService) {}

  onZoomChange({
    deltaX,
    deltaY,
    ptX,
    ptY,
  }: {
    deltaX: number;
    deltaY: number;
    ptX: number;
    ptY: number;
  }) {
    const MAX_DELTA = 10;
    let delta = Math.min(Math.abs(deltaY), MAX_DELTA);
    const sign = -Math.sign(deltaY);
    delta *= sign;

    const oldZoom = round(this.cfg.zoom);
    const newZoom = oldZoom * (1 + delta / 100);

    // ptXY should stay on the same device-Coord
    // (ptX - oldViewX) * oldZoom ==  (ptX - newViewX) * newZoom
    //
    const newX = ptX - (oldZoom / newZoom) * (ptX - this.cfg.viewPortX);
    const newY = ptY - (oldZoom / newZoom) * (ptY - this.cfg.viewPortY);

    this.cfg.viewPortX = round(newX);
    this.cfg.viewPortY = round(newY);
    this.cfg.zoom = round(newZoom);
    this.recalcViewPort();
  }

  onViewPortChange(pt: { x: number; y: number }) {
    this.cfg.viewPortX = round(pt.x);
    this.cfg.viewPortY = round(pt.y);
  }

  onResize(rect: DOMRect) {
    this.canvasWidth = rect.width;
    this.canvasHeight = rect.height;

    this.recalcViewPort();
  }

  recalcViewPort() {
    this.cfg.viewPortWidth = round(this.canvasWidth / this.cfg.zoom);
    this.cfg.viewPortHeight = round(this.canvasHeight / this.cfg.zoom);
  }

  getViewport() {
    const vp = `${this.cfg.viewPortX} ${this.cfg.viewPortY} ${this.cfg.viewPortWidth} ${this.cfg.viewPortHeight}`;
    return vp;
  }
}
