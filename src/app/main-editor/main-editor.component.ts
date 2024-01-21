import {
  Component,
  HostListener,
  NO_ERRORS_SCHEMA,
  ViewChild,
} from "@angular/core";
import { Store } from "@ngrx/store";
import { ConfigService } from "../config.service";
import { CanvasComponent } from "../canvas/canvas.component";
import { round } from "../util";
import * as Actions from "../store/canvas/canvas.actions";
import * as GuiActions from "../store/gui/gui.actions";

import * as Selectors from "../store/canvas/canvas.selectors";
import * as GuiSelectors from "../store/gui/gui.selectors";
import { AsyncPipe, CommonModule } from "@angular/common";
import { StatusComponent } from "../status/status.component";
import { CommandLineComponent } from "../command-line/command-line.component";

@Component({
  selector: "app-main-editor",
  standalone: true,
  imports: [
    StatusComponent,
    CommandLineComponent,
    CommonModule,
    AsyncPipe,
    CanvasComponent,
  ],
  templateUrl: "./main-editor.component.html",
  styleUrl: "./main-editor.component.scss",
  schemas: [],
})
export class MainEditorComponent {
  @ViewChild(CanvasComponent) canvas?: CanvasComponent;

  viewport$ = this.store.select(Selectors.selectViewport);
  elements$ = this.store.select(Selectors.selectElements);
  showCommandLine$ = this.store.select(GuiSelectors.showCommandLine);

  public canvasWidth = 0;
  public canvasHeight = 0;

  constructor(
    public cfg: ConfigService,

    private store: Store
  ) {}

  onPointerMove(pt: { x: number; y: number }) {
    const status = `${pt.x.toFixed(4)} / ${pt.y.toFixed(4)}`;
    this.store.dispatch(Actions.setStatus({ text: status }));
  }

  onZooming({
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
    this.store.dispatch(Actions.zooming({ deltaY, ptX, ptY }));

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

  public onPanning(pt: { x: number; y: number }) {
    this.store.dispatch(Actions.panning({ x: pt.x, y: pt.y }));

    this.cfg.viewPortX = round(pt.x);
    this.cfg.viewPortY = round(pt.y);
  }

  onResize(rect: DOMRect) {
    this.store.dispatch(
      Actions.resize({ width: rect.width, height: rect.height })
    );

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

  onClick({
    x,
    y,
    ele,
  }: {
    x: number;
    y: number;
    ele: SVGElement | undefined;
  }) {
    console.log(">>", ele);
  }

  @HostListener("window:keydown", ["$event"])
  handleKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case "/":
          console.log("keydown >", event);
          this.store.dispatch(GuiActions.showCommandLine({ show: true }));
          return true;
          break;
      }
    }
    return true;
  }
}
