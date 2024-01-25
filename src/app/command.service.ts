import { Injectable, inject } from "@angular/core";

import * as Command from "./commands";
import { CreateRandomLineCommand } from "./commands/create-random-line.command";
import { Store } from "@ngrx/store";
import * as CanvasActions from "./store/canvas/canvas.actions";

import { CanvasEventService } from "./canvas-event.service";
import { ToolService } from "./tool.service";

@Injectable({
  providedIn: "root",
})
export class CommandService {
  constructor(
    private store: Store,
    private canvasEventService: CanvasEventService,
    private toolService: ToolService
  ) {
    this.registerAll();
  }

  execute(cmdString: string) {
    const [cmd, para] = cmdString.split(" ");
    switch (cmd.toLowerCase()) {
      case "tool":
        this.store.dispatch(CanvasActions.setTool({ tool: para }));

        return true;
      case "createrandomline":
        const cmd = new CreateRandomLineCommand(this.store);
        cmd.start();
        return true;

      default:
        return false;
    }
  }

  private registerAll() {
    console.log("registerAll", Command);
  }
}
