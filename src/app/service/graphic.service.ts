import { Signal, Injectable, signal } from "@angular/core";
import { nanoid } from "nanoid";

class Shape {
  x: number = 0;
  y: number = 0;
  id: string = "";

  constructor(id: string, x: number, y: number) {
    this.id = id;
    this.x = x;
    this.y = y;
  }
}

@Injectable({
  providedIn: "root",
})
export class GraphicService {
  elements: Signal<Shape[]> = signal([]);
  name: Signal<string> = signal("hallo Graphic");

  dragStartX = 0;
  dragStartY = 0;

  saveX = 0;
  saveY = 0;

  selectedId = signal("");

  constructor() {
    this.elements = signal([
      new Shape("ele.a", 40, 40),
      new Shape("ele.b", 100, 120),
    ]);
    this.createShapes();
  }

  private createShapes() {
    const list: Shape[] = [];
    for (let i = 1; i < 9000; i++) {
      const x = Math.floor(Math.random() * 600);
      const y = Math.floor(Math.random() * 600);
      const id = `ele.${nanoid()}`;
      list.push(new Shape(id, x, y));
    }
    this.elements = signal(list);
  }

  pointerDown(pointerEvent: PointerEvent) {
    let ev = pointerEvent as Event;
    let ele = ev.target as SVGElement;
    while (ele) {
      let id = ele.id;
      if (id && id.startsWith("ele.")) {
        console.log("select", ele);
        let ex = parseInt(ele.attributes.getNamedItem("x")?.value || "");
        let ey = parseInt(ele.attributes.getNamedItem("y")?.value || "");
        this.selectedId.set(id);
        this.saveX = ex - pointerEvent.clientX;
        this.saveY = ey - pointerEvent.clientY;
        break;
      }
      ele = ele.parentElement as any;
    }
  }

  pointerMove(ev: PointerEvent) {
    if (!this.selectedId) {
      return;
    }
    let shape = this.elements().find((e) => e.id === this.selectedId());
    if (shape) {
      shape.x = this.saveX + ev.clientX;
      shape.y = this.saveX + ev.clientY;
    }
  }

  pointerUp(ev: PointerEvent) {
    this.selectedId.set("");
  }

  // onPointerDown(id: string, ev: PointerEvent) {
  //   console.log("onPointerDown", ev.clientX);

  //   this.dragStartX = ev.clientX;
  //   this.dragStartY = ev.clientY;
  // }

  // onDragStart(id: string, ev: PointerEvent) {}

  // onPointerMove(id: string, ev: PointerEvent) {
  //   console.log("onPointerMove", ev.clientX);
  //   const dx = ev.clientX - this.dragStartX;
  //   const dy = ev.clientY - this.dragStartY;
  // }
}
