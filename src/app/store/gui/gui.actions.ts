import { createAction, props } from "@ngrx/store";

export const showCommandLine = createAction(
  "[Gui] showCommendLine",
  props<{ show: boolean }>()
);

export const executeCommand = createAction(
  "[Gui] executeCommand",
  props<{ cmd: string }>()
);
