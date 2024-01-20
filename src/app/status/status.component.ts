import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { CanvasState } from "../store/canvas/canvas.state";
import * as Selectors from "../store/canvas/canvas.selectors";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-status",
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: "./status.component.html",
  styleUrl: "./status.component.scss",
})
export class StatusComponent {
  public status = "status";
  public status$ = this.store.select(Selectors.selectStatus);

  constructor(private store: Store<CanvasState>) {}
}
