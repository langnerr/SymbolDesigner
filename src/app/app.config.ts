import { ApplicationConfig, isDevMode } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideState, provideStore } from "@ngrx/store";
import { routes } from "./app.routes";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { canvasReducer } from "./store/canvas/canvas.reducer";
import { guiReducer } from "./store/gui/gui.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideState({ name: "canvas", reducer: canvasReducer }),
    provideState({ name: "gui", reducer: guiReducer }),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode,
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
