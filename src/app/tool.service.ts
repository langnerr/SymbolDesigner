import { Component, Injectable } from "@angular/core";
import { CanvasEventService } from "./canvas-event.service";
import { SelectToolComponent } from "./tools/select-tool.component";
import { CreateToolComponent } from "./tools/create-tool.component";

@Injectable({
  providedIn: "root",
})
export class ToolService {
  tools: Record<string, { component: any }> = {
    select: {
      component: SelectToolComponent,
    },
    create: {
      component: CreateToolComponent,
    },
  };

  get(name: string) {
    return this.tools[name];
  }
  currentTool = undefined;

  start(name: "select") {}
}
