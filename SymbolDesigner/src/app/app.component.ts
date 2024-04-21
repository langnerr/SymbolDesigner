import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { EditorComponent } from "./editor/editor.component";
import { MainEditorComponent } from "./main-editor/main-editor.component";
import { CommandLineComponent } from "./command-line/command-line.component";
import { SvgDrawComponent } from "./svg-draw/svg-draw.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, SvgDrawComponent, MainEditorComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "SymbolDesigner";
}
