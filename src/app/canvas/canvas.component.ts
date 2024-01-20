import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from "@angular/core";
import { Subject, map } from "rxjs";

@Component({
  selector: "[app-canvas]",
  standalone: true,
  imports: [],
  templateUrl: "./canvas.component.html",
  styleUrl: "./canvas.component.scss",
})
export class CanvasComponent implements AfterViewInit {
  @Input() viewPortX = 0;
  @Input() viewPortY = 0;
  @Input() viewPortWidth = 0;
  @Input() viewPortHeight = 0;
  @Input() zoom = 1.0;

  @Output() canvasWidthChange = new EventEmitter<number>();
  @Output() canvasHeightChange = new EventEmitter<number>();

  @Output() resize = new EventEmitter<DOMRect>();
  @Output() viewPortChange = new EventEmitter<{ x: number; y: number }>();
  @Output() zoomChange = new EventEmitter<{
    deltaX: number;
    deltaY: number;
    ptX: number;
    ptY: number;
  }>();

  @Output() viewPort = new EventEmitter<{
    x: number;
    y: number;
    w: number;
    h: number;
  }>();

  // canvasWidth
  _canvasWidth = 0;
  get canvasWidth(): number {
    return this._canvasWidth;
  }
  set canvasWidth(canvasWidth: number) {
    this._canvasWidth = canvasWidth;
    this.canvasWidthChange.emit(this._canvasWidth);
  }

  // canvasHeight
  _canvasHeight = 0;
  get canvasHeight(): number {
    return this._canvasHeight;
  }
  set canvasHeight(canvasHeight: number) {
    this._canvasHeight = canvasHeight;
    this.canvasHeightChange.emit(this._canvasHeight);
  }

  wheel$ = new Subject<WheelEvent>();

  constructor(public canvas: ElementRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.refreshCanvasSize();
    });
    window.addEventListener("resize", () => {
      this.refreshCanvasSize();
    });
  }

  @HostListener("wheel", ["$event"]) onWheel(event: WheelEvent) {
    event.preventDefault();
    this.wheel$.next(event);
  }

  @HostListener("pointerdown", ["$event"]) onPointerDown(event: PointerEvent) {
    const pt = this.eventToLocation(event);
    console.log("pointer down", event, pt);
  }

  zooming(event: WheelEvent) {
    const pt = this.eventToLocation(event);
    this.zoomChange.emit({
      deltaX: event.deltaX,
      deltaY: event.deltaY,
      ptX: pt.x,
      ptY: pt.y,
    });
  }

  panning(event: WheelEvent) {
    this.viewPortChange.emit({
      x: this.viewPortX + event.deltaX / this.zoom,
      y: this.viewPortY + event.deltaY / this.zoom,
    });
  }

  ngOnInit(): void {
    this.wheel$.subscribe((event) => {
      if (event.metaKey || event.ctrlKey) {
        this.zooming(event);
      } else {
        this.panning(event);
      }
    });
  }

  eventToLocation(event: PointerEvent | WheelEvent | TouchEvent) {
    const touch = event instanceof MouseEvent ? event : event.touches[0];
    const x = this.viewPortX + touch.clientX / this.zoom;
    const y = this.viewPortY + touch.clientY / this.zoom;
    return { x, y };
  }

  // zoomViewPort(scale: number, pt?: { x: number; y: number }) {
  //   if (!pt) {
  //     pt = {
  //       x: this.viewPortX + 0.5 * this.viewPortWidth,
  //       y: this.viewPortY + 0.5 * this.viewPortHeight,
  //     };
  //   }
  //   const w = scale * this.viewPortWidth;
  //   const h = scale * this.viewPortHeight;
  //   const x =
  //     this.viewPortX +
  //     (pt.x - this.viewPortX - scale * (pt.x - this.viewPortX));
  //   const y =
  //     this.viewPortY +
  //     (pt.y - this.viewPortY - scale * (pt.y - this.viewPortY));

  //   // this.viewPort.emit({ x, y, w, h });
  // }

  refreshCanvasSize() {
    const rect = this.canvas.nativeElement.parentNode.getBoundingClientRect();
    this.resize.emit(rect);
  }
}
