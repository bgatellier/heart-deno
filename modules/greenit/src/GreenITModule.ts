import {
  Module,
  ModuleAnalysisInterface,
  ModuleInterface,
  Report,
} from "@fabernovel/heart-core";
import { runAnalysis } from "./api/Client.ts";
import { Result } from "./api/model/Result.ts";
import { Config } from "./config/Config.ts";

export class GreenITModule extends Module implements ModuleAnalysisInterface {
  constructor(module: Pick<ModuleInterface, "name" | "service">) {
    super(module);
  }

  public async startAnalysis(conf: Config): Promise<Report> {
    try {
      const result = await runAnalysis(conf);

      if (!result.success) {
        throw new Error("Error during GreenIT analysis");
      } else {
        return this.handleResults(result);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private handleResults(results: Result): Report {
    return new Report({
      analyzedUrl: results.url,
      date: new Date(results.date),
      note: results.ecoIndex.toString(),
      service: this.service,
    });
  }
}
