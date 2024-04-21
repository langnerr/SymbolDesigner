import { Component, Injectable } from "@angular/core";
import { CanvasEventService } from "./canvas-event.service";
import { SelectTool } from "./tools/select-tool";
import { CreateTool } from "./tools/create-tool";

@Injectable({
  providedIn: "root",
})
export class ToolService {
  tools: Record<string, { component: any }> = {
    select: {
      component: SelectTool,
    },
    create: {
      component: CreateTool,
    },
  };

  get(name: string) {
    return this.tools[name];
  }
  currentTool = undefined;

  start(name: "select") {}
}
