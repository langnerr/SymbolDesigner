import { Injectable } from "@angular/core";

function save() {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (target: Object, propertyKey: string) {
    const localStorageKey = `SymbolEditor.${target.constructor.name}.${propertyKey}`;
    const storedValue = localStorage.getItem(localStorageKey);
    let value = JSON.parse(storedValue ?? "null");
    const wasStored = storedValue !== null;
    let isInitialized = false;

    const setter = (newVal: unknown) => {
      if (!wasStored || isInitialized) {
        value = newVal;
        if (isInitialized) {
          localStorage.setItem(localStorageKey, JSON.stringify(value));
        }
      }
      isInitialized = true;
    };

    Object.defineProperty(target, propertyKey, {
      get: () => value,
      set: setter,
    });
  };
}

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  @save() viewPortX = 0;
  @save() viewPortY = 0;
  @save() viewPortWidth = 300;
  @save() viewPortHeight = 200;
  constructor() {}
}
