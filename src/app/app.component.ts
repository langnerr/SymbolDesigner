import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { EditorComponent } from "./editor/editor.component";
import { GraphicService } from "./service/graphic.service";
import { MainEditorComponent } from "./main-editor/main-editor.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, EditorComponent, MainEditorComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "SymbolDesigner";
}
