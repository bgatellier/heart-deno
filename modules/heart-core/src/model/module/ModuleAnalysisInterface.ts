import { Report } from '../report/Report.ts'

import { ModuleInterface } from './ModuleInterface.ts'

/**
 * Define an Analysis module.
 */
export interface ModuleAnalysisInterface extends ModuleInterface {
  startAnalysis: (conf: object) => Promise<Report>
}

/**
 * Constructor interface signature
 * @see {@link https://www.typescriptlang.org/docs/handbook/interfaces.html#difference-between-the-static-and-instance-sides-of-classes}
 */
export type ModuleAnalysis = new () => ModuleAnalysisInterface

/**
 * Checks if a module is an Analysis one.
 * @see {@link https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards | User-Defined Type Guards}
 */
export function isModuleAnalysis(module: ModuleInterface): module is ModuleAnalysisInterface {
  const m = module as ModuleAnalysisInterface

  return m !== undefined && m.startAnalysis !== undefined && 'function' === typeof m.startAnalysis
}
