import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-svg-draw",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./svg-draw.component.html",
  styleUrl: "./svg-draw.component.scss",
})
export class SvgDrawComponent implements AfterViewInit {
  @ViewChild("svg") svg!: ElementRef<SVGElement>;

  ngAfterViewInit(): void {
    console.log(this.svg);
  }
}
