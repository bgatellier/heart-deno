import type { ModuleIndex, ModuleMetadata } from "@fabernovel/heart-common";
import { ObservatoryModule } from "./ObservatoryModule.ts";

export const initialize: ModuleIndex["initialize"] = (
  moduleMetadata: ModuleMetadata,
  verbose: boolean,
) => {
  return new ObservatoryModule(moduleMetadata, verbose);
};
