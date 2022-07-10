import { ServiceInterface } from "../service/ServiceInterface.ts";

import { ModuleInterface } from "./ModuleInterface.ts";

export abstract class Module implements ModuleInterface {
  id!: string;
  name: string;
  service: ServiceInterface;

  protected constructor({ name, service}: Pick<ModuleInterface, 'name' | 'service'>) {
    this.name = name
    this.service = service
  }
}
