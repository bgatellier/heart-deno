import { ServiceInterface } from '../service/ServiceInterface.ts'

export interface ModuleInterface {
  /**
   * Examples: dareboost, observatory...
   * The id is automatically guessed from the package name, so do not set it explicitly
   */
  id: string

  /**
   * Example: Heart Observatory, Heart BigQuery
   */
  name: string

  service: ServiceInterface
}
