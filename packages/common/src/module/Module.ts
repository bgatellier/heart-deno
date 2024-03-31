import type { ModuleMetadata } from "./ModuleMetadata.ts";

export abstract class Module {
  readonly id: ModuleMetadata["id"];
  readonly name: ModuleMetadata["name"];
  readonly service: ModuleMetadata["service"];
  readonly verbose: boolean;

  constructor(moduleMetadata: ModuleMetadata, verbose: boolean) {
    this.id = moduleMetadata.id;
    this.name = moduleMetadata.name;
    this.service = moduleMetadata.service;
    this.verbose = verbose;
  }
}
