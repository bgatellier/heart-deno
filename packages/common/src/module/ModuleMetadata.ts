import type { Service } from "../service/Service.ts";

export interface ModuleMetadata {
  /**
   * Example: observatory
   */
  id: string;

  /**
   * Example: Heart Observatory
   */
  name: string;

  service: Service;

  type: "analysis" | "listener" | "listener:database" | "server";
}
