import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";

import * as GuiActions from "../store/gui/gui.actions";
import { FormsModule } from "@angular/forms";
import { CommandService } from "../command.service";

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

  constructor(private store: Store, private commandService: CommandService) {}

  ngAfterViewInit(): void {
    this.cmdInput.nativeElement?.focus();
  }

  onEnter(event: Event) {
    if (this.commandService.execute(this.cmd)) {
      this.store.dispatch(GuiActions.showCommandLine({ show: false }));
    }
  }

  onEscape() {
    this.store.dispatch(GuiActions.showCommandLine({ show: false }));
  }
}
