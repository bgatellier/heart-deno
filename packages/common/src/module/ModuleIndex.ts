import type { Module } from "./Module.ts";
import type { ModuleMetadata } from "./ModuleMetadata.ts";

export interface ModuleIndex {
  initialize: (moduleMetadata: ModuleMetadata, verbose: boolean) => Module;
}
