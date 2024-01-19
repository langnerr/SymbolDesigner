import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
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

  @Input() strokeWidth = 1;

  _canvasWidth = 0;
  @Output() canvasWidthChange = new EventEmitter<number>();

  _canvasHeight = 0;
  @Output() canvasHeightChange = new EventEmitter<number>();

  @Output() viewPort = new EventEmitter<{
    x: number;
    y: number;
    w: number;
    h: number | null;
    force?: boolean;
  }>();

  get canvasWidth(): number {
    return this._canvasWidth;
  }
  set canvasWidth(canvasWidth: number) {
    this._canvasWidth = canvasWidth;
    this.canvasWidthChange.emit(this._canvasWidth);
  }
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

  mousewheel(event: { event: WheelEvent; deltaY: number }) {
    const scale = Math.pow(1.005, event.deltaY);
    const pt = this.eventToLocation(event.event);

    this.zoomViewPort(scale, pt);
  }

  ngOnInit(): void {
    // const cap = (val:number, max:number) => val > max ? max : val < -max ? -max : val;
    // const throttler = throttleTime(20, undefined, {leading: false, trailing: true});
    this.wheel$
      // .pipe( buffer(this.wheel$.pipe(throttler)) )
      // .pipe( map(ev => ({
      //     event: ev[0],
      //     deltaY: ev.reduce((acc, cur) => acc + cap(cur.deltaY, 50), 0)
      // })))

      .pipe(
        map((ev) => {
          return {
            event: ev,
            deltaY: 5,
          };
        })
      )
      .subscribe(this.mousewheel.bind(this));
  }

  eventToLocation(
    event: MouseEvent | TouchEvent,
    idx = 0
  ): { x: number; y: number } {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const touch = event instanceof MouseEvent ? event : event.touches[idx];
    const x = this.viewPortX + (touch.clientX - rect.left) * this.strokeWidth;
    const y = this.viewPortY + (touch.clientY - rect.top) * this.strokeWidth;
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

    this.viewPort.emit({ x, y, w, h });
  }

  refreshCanvasSize(emitEmptyCanvas = false) {
    const rect = this.canvas.nativeElement.parentNode.getBoundingClientRect();
    if (rect.width === 0 && emitEmptyCanvas) {
      // this.emptyCanvas.emit();
    }
    this.canvasWidth = rect.width;
    this.canvasHeight = rect.height;

    this.viewPort.emit({
      x: this.viewPortX,
      y: this.viewPortY,
      w: this.viewPortWidth,
      h: null,
      force: true,
    });
  }
}
