import type { ModuleIndex, ModuleMetadata } from "@fabernovel/heart-common";
import { ApiModule } from "./ApiModule.ts";

export const initialize: ModuleIndex["initialize"] = (
  moduleMetadata: ModuleMetadata,
  verbose: boolean,
) => {
  return new ApiModule(moduleMetadata, verbose);
};
