import type { ModuleIndex, ModuleMetadata } from "@fabernovel/heart-common";
import { SlackModule } from "./SlackModule.ts";

export const initialize: ModuleIndex["initialize"] = (
  moduleMetadata: ModuleMetadata,
  verbose: boolean,
) => {
  return new SlackModule(moduleMetadata, verbose);
};
