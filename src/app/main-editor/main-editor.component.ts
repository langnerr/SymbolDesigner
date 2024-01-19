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

  public canvasWidth = 0;
  public canvasHeight = 0;

  constructor(public cfg: ConfigService) {}

  onViewPortOrigin(pt: { x: number; y: number }) {
    this.cfg.viewPortX = pt.x;
    this.cfg.viewPortY = pt.y;
  }

  onResize(rect: DOMRect) {
    // this.cfg.viewPortX = 0;
    // this.cfg.viewPortY = 0;
    this.cfg.viewPortWidth = rect.width;
    this.cfg.viewPortHeight = rect.height;

    this.canvasWidth = rect.width;
    this.canvasHeight = rect.height;
  }

  getViewport() {
    const vp = `${this.cfg.viewPortX} ${this.cfg.viewPortY} ${this.cfg.viewPortWidth} ${this.cfg.viewPortHeight}`;
    return vp;
  }
}
