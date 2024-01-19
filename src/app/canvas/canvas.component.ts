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
  @Output() viewPortOrigin = new EventEmitter<{ x: number; y: number }>();
  @Output() zoomChange = new EventEmitter<{ deltaX: number; deltaY: number }>();

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
      this.refreshCanvasSize(true);
    });
    window.addEventListener("resize", () => {
      this.refreshCanvasSize(true);
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
    this.zoomChange.emit({ deltaX: event.deltaX, deltaY: event.deltaY });
    // this.zoomViewPort(scale, pt);
  }

  panning(event: WheelEvent) {
    this.viewPortOrigin.emit({
      x: this.viewPortX + event.deltaX / this.zoom,
      y: this.viewPortY + event.deltaY / this.zoom,
    });
    // this.zoomViewPort(scale, pt);
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

  eventToLocation(
    event: PointerEvent | TouchEvent,
    idx = 0
  ): { x: number; y: number } {
    const strokeWidth = 1.0;

    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const touch = event instanceof MouseEvent ? event : event.touches[idx];
    // let x = this.viewPortX + (touch.clientX - rect.left) * strokeWidth;
    // let y = this.viewPortY + (touch.clientY - rect.top) * strokeWidth;

    let x = touch.clientX;
    let y = touch.clientY;

    x = this.viewPortX + x / this.zoom;
    y = this.viewPortY + y / this.zoom;

    return { x, y };
  }

  zoomViewPort(scale: number, pt?: { x: number; y: number }) {
    if (!pt) {
      pt = {
        x: this.viewPortX + 0.5 * this.viewPortWidth,
        y: this.viewPortY + 0.5 * this.viewPortHeight,
      };
    }
    const w = scale * this.viewPortWidth;
    const h = scale * this.viewPortHeight;
    const x =
      this.viewPortX +
      (pt.x - this.viewPortX - scale * (pt.x - this.viewPortX));
    const y =
      this.viewPortY +
      (pt.y - this.viewPortY - scale * (pt.y - this.viewPortY));

    // this.viewPort.emit({ x, y, w, h });
  }

  refreshCanvasSize(emitEmptyCanvas = false) {
    const rect = this.canvas.nativeElement.parentNode.getBoundingClientRect();

    this.resize.emit(rect);

    // this.canvasWidth = rect.width;
    // this.canvasHeight = rect.height;

    // this.viewPort.emit({
    //   x: this.viewPortX,
    //   y: this.viewPortY,
    //   w: this.viewPortWidth,
    //   h: null,
    // });
  }
}
