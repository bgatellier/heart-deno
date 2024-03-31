import type { GenericReport } from "../../report/Report.ts";
import type { Result } from "../../report/Result.ts";
import type { Module } from "../Module.ts";

/**
 * Define an Listener module.
 */
export interface ModuleListenerInterface extends Module {
  notifyAnalysisDone(report: GenericReport<Result>): Promise<unknown>;
}

/**
 * Constructor interface signature
 * @see {@link https://www.typescriptlang.org/docs/handbook/interfaces.html#difference-between-the-static-and-instance-sides-of-classes}
 */
export type ModuleListener = new () => ModuleListenerInterface;

/**
 * Checks if a module is a Listener one.
 * @see {@link https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates | User-Defined Type Guards}
 */
export function isModuleListener(
  module: Module,
): module is ModuleListenerInterface {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return (module as ModuleListenerInterface).notifyAnalysisDone !== undefined;
}
