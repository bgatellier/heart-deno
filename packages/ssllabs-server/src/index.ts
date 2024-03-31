import type { ModuleIndex, ModuleMetadata } from "@fabernovel/heart-common";
import { SsllabsServerModule } from "./SsllabsServerModule.ts";

export const initialize: ModuleIndex["initialize"] = (
  moduleMetadata: ModuleMetadata,
  verbose: boolean,
) => {
  return new SsllabsServerModule(moduleMetadata, verbose);
};
