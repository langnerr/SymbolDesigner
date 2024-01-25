import { Store } from "@ngrx/store";
import { BaseCommand } from "./base.command";
import * as CanvasActions from "../store/canvas/canvas.actions";

export class CreateRandomLineCommand extends BaseCommand {
  constructor(private store: Store) {
    super();
  }

  override start() {
    this.store.dispatch(CanvasActions.createRandomLine({ count: 10 }));
  }

  excecute(para: string) {
    console.log(para);
  }
}
