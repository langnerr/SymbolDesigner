import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NO_ERRORS_SCHEMA,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { Subject, map } from "rxjs";
import { IElement, LineElement } from "../models/element";
import { CommonModule } from "@angular/common";
import { CanvasEventService } from "../canvas-event.service";
import { Point } from "../point";

@Component({
  selector: "[app-canvas]",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./canvas.component.html",
  styleUrl: "./canvas.component.scss",
  schemas: [],
})
export class CanvasComponent implements AfterViewInit {
  @Input() viewPortX = 0;
  @Input() viewPortY = 0;
  @Input() viewPortWidth = 0;
  @Input() viewPortHeight = 0;
  @Input() zoom = 1.0;

  @Input() elements: IElement[] = [];
  @Input() dynamicElements: Record<string, IElement> = {};

  @Output() canvasWidthChange = new EventEmitter<number>();
  @Output() canvasHeightChange = new EventEmitter<number>();

  @Output() onResize = new EventEmitter<DOMRect>();

  trackByIndex = (idx: number, _: unknown) => idx;

  hoveredId: string = "";

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

  constructor(
    public canvas: ElementRef,
    private canvasMessageService: CanvasEventService
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.refreshCanvasSize();
    });
    window.addEventListener("resize", () => {
      this.refreshCanvasSize();
    });
  }

  @HostListener("wheel", ["$event"]) _onWheel(event: WheelEvent) {
    event.preventDefault();
    const pt = this.eventToLocation(event);
    this.canvasMessageService.handleWheel({
      pt: pt,
      event: event,
    });
  }

  @HostListener("pointerdown", ["$event"]) _onPointerDown(event: PointerEvent) {
    const pt = this.eventToLocation(event);
    this.canvasMessageService.handlePointerDown({
      pt: pt,
      event: event,
    });
  }

  @HostListener("pointerup", ["$event"]) _onPointerUp(event: PointerEvent) {
    const pt = this.eventToLocation(event);
    this.canvasMessageService.handlePointerUp({
      pt: pt,
      event: event,
    });
  }

  @HostListener("pointermove", ["$event"]) _onPointerMove(event: PointerEvent) {
    const pt = this.eventToLocation(event);
    this.canvasMessageService.handlePointerMove({
      event: event,
      pt: pt,
    });
  }

  eventToLocation(event: PointerEvent | WheelEvent | TouchEvent): Point {
    const touch = event instanceof MouseEvent ? event : event.touches[0];
    const x = this.viewPortX + touch.clientX / this.zoom;
    const y = this.viewPortY + touch.clientY / this.zoom;
    return { x, y };
  }

  refreshCanvasSize() {
    const rect = this.canvas.nativeElement.parentNode.getBoundingClientRect();

    this.onResize.emit(rect);
  }

  onMouseEnter(a: any) {
    console.log("mouseenter >>", a);
  }

  getDynamicElements() {
    return Object.values(this.dynamicElements);
  }
}
