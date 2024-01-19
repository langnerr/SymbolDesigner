import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  signal,
} from "@angular/core";

type DragDropState = "idle" | "down" | "dragging";

@Component({
  selector: "[app-svg-box]",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./svg-box.component.html",
  styleUrl: "./svg-box.component.scss",
})
export class SvgBoxComponent {
  @Input() x: number = 0;
  @Input() y: number = 0;
  @Input() id: string = "";
  @Input() class = "selected";

  state = signal<DragDropState>("idle");

  onClick() {
    console.log("on click");
  }

  onPointerDown(ev: PointerEvent) {
    switch (this.state()) {
      case "idle":
      // this.pointerDown.emit(ev);
      // this.state.set("down");
      // this.x = ev.clientX;
      // this.y = ev.clientY;
    }
  }
  onPointerUp(ev: PointerEvent) {
    switch (this.state()) {
      case "down":
      case "dragging":
      // this.state.set("idle");
      // console.log("onPointerUp", ev.clientX);
    }
  }
  onPointerMove(ev: PointerEvent) {
    switch (this.state()) {
      case "down":
      // this.state.set("dragging");
      // console.log("first drag", ev.clientX);
      // this.x = ev.clientX;
      // this.y = ev.clientY;
      // break;
      case "dragging":
      // console.log("dragging", ev.clientX);
      // this.x = ev.clientX;
      // this.y = ev.clientY;
    }
  }
}
