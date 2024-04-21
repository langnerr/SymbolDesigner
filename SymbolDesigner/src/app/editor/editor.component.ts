import { Component } from "@angular/core";
import { SvgBoxComponent } from "../svg-box/svg-box.component";
import { CommonModule } from "@angular/common";
import { GraphicService } from "../service/graphic.service";

@Component({
  selector: "app-editor",
  standalone: true,
  imports: [SvgBoxComponent, CommonModule],
  templateUrl: "./editor.component.html",
  styleUrl: "./editor.component.scss",
})
export class EditorComponent {
  public positions = [10, 20, 130, 180];

  elements = this.store.elements;
  name = this.store.name;

  selectedIds = ["ele-b"];

  constructor(private store: GraphicService) {}

  onCanvasPointerDown(ev: PointerEvent) {
    this.store.pointerDown(ev);
    // console.log("Canvas onPointerDown", ev.target);
  }

  onCanvasPointerMove(ev: PointerEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    this.store.pointerMove(ev);
  }

  onCanvasPointerUp(ev: PointerEvent) {
    this.store.pointerUp(ev);
  }
}
