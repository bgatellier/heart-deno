import type { ModuleIndex, ModuleMetadata } from "@fabernovel/heart-common";
import { MySQLModule } from "./MySQLModule.ts";

export const initialize: ModuleIndex["initialize"] = (
  moduleMetadata: ModuleMetadata,
  verbose: boolean,
) => {
  return new MySQLModule(moduleMetadata, verbose);
};
