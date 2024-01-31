import { Component, HostListener, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { ConfigService } from "../config.service";
import { CanvasComponent } from "../canvas/canvas.component";
import { round } from "../util";
import * as CanvasActions from "../store/canvas/canvas.actions";
import * as GuiActions from "../store/gui/gui.actions";

import * as Selectors from "../store/canvas/canvas.selectors";
import * as GuiSelectors from "../store/gui/gui.selectors";
import { AsyncPipe, CommonModule } from "@angular/common";
import { StatusComponent } from "../status/status.component";
import { CommandLineComponent } from "../command-line/command-line.component";
import { SelectControlValueAccessor } from "@angular/forms";
import { SelectToolComponent } from "../tools/select-tool.component";
import { ToolService } from "../tool.service";
import { ZoomPanningToolComponent } from "../tools/zoom-panning-tool.component";
import { map } from "rxjs";

@Component({
  selector: "app-main-editor",
  standalone: true,
  imports: [
    StatusComponent,
    CommandLineComponent,
    CommonModule,
    AsyncPipe,
    CanvasComponent,
    SelectToolComponent,
    ZoomPanningToolComponent,
  ],
  templateUrl: "./main-editor.component.html",
  styleUrl: "./main-editor.component.scss",
  schemas: [],
})
export class MainEditorComponent {
  @ViewChild(CanvasComponent) canvas?: CanvasComponent;

  elements$ = this.store.select(Selectors.selectElements);
  showCommandLine$ = this.store.select(GuiSelectors.showCommandLine);

  canvasWidth$ = this.store.select(Selectors.canvasWidth);
  canvasHeight$ = this.store.select(Selectors.canvasHeight);
  viewPortX$ = this.store.select(Selectors.viewPortX);
  viewPortY$ = this.store.select(Selectors.viewPortY);
  viewPortZoom$ = this.store.select(Selectors.viewPortZoom);

  svgViewport$ = this.store.select(Selectors.selectCanvas).pipe(
    map((state) => {
      const vp = `${state.viewportX} ${state.viewportY} ${state.viewportWidth} ${state.viewportHeight}`;
      return vp;
    })
  );

  public currentToolName = "select";

  constructor(private store: Store, private toolService: ToolService) {
    this.store.select(Selectors.currentToolName).subscribe((name) => {
      this.currentToolName = name;
    });
  }

  get currentTool() {
    return this.toolService.get(this.currentToolName);
  }

  onResize(rect: DOMRect) {
    this.store.dispatch(
      CanvasActions.resize({ width: rect.width, height: rect.height })
    );
  }

  @HostListener("window:keydown", ["$event"])
  handleKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case "/":
          this.store.dispatch(GuiActions.showCommandLine({ show: true }));
          return true;
      }
    }
    return true;
  }
}
