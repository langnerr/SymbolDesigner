import { ApplicationConfig, isDevMode } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideState, provideStore } from "@ngrx/store";
import { routes } from "./app.routes";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { canvasReducer } from "./store/canvas/canvas.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(),
    provideState({ name: "canvas", reducer: canvasReducer }),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode,
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
