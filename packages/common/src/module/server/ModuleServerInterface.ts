import type { FastifyCorsOptions } from "npm:@fastify/cors";
import type { FastifyInstance } from "npm:fastify";
import type {
  Config,
  GenericReport,
  Module,
  ModuleListenerInterface,
  Result,
} from "../../index.ts";
import type { ModuleAnalysisInterface } from "../analysis/ModuleAnalysisInterface.ts";

/**
 * Define a Server module.
 */
export interface ModuleServerInterface extends Module {
  createServer: (
    analysisModules: ModuleAnalysisInterface<Config, GenericReport<Result>>[],
    listenerModules: ModuleListenerInterface[],
    cors?: FastifyCorsOptions,
  ) => Promise<FastifyInstance>;
}

/**
 * Constructor interface signature
 * @see {@link https://www.typescriptlang.org/docs/handbook/interfaces.html#difference-between-the-static-and-instance-sides-of-classes}
 */
export type ModuleServer = new () => ModuleServerInterface;

/**
 * Checks if a module is a Server one.
 * @see {@link https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates | User-Defined Type Guards}
 */
export function isModuleServer(
  module: Module,
): module is ModuleServerInterface {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return (module as ModuleServerInterface).createServer !== undefined;
}
