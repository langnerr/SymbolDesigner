import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";

import * as CanvasActions from "../store/canvas/canvas.actions";
import * as GuiActions from "../store/gui/gui.actions";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-command-line",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./command-line.component.html",
  styleUrl: "./command-line.component.scss",
})
export class CommandLineComponent implements AfterViewInit {
  @ViewChild("cmdInput", { static: false })
  cmdInput!: ElementRef<HTMLInputElement>;

  cmd: string = "";

  constructor(private store: Store) {}

  ngAfterViewInit(): void {
    this.cmdInput.nativeElement?.focus();
  }

  onEnter(event: Event) {
    switch (this.cmd.toLowerCase()) {
      case "createrandomline":
        this.store.dispatch(CanvasActions.createRandomLine({ count: 10 }));
        break;
      default:
        return;
    }

    this.store.dispatch(GuiActions.showCommandLine({ show: false }));
  }

  onEscape() {
    this.store.dispatch(GuiActions.showCommandLine({ show: false }));
  }
}
