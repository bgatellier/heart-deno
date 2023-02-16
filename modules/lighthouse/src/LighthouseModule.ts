import {
  Module,
  ModuleAnalysisInterface,
  ModuleInterface,
  Report,
} from "@fabernovel/heart-core";
import { runAnalysis } from "./api/Client.ts";
import { Config } from "./config/Config.ts";
import compute from "./scoring/compute.ts";

export default class LighthouseModule extends Module
  implements ModuleAnalysisInterface {
  constructor(module: Pick<ModuleInterface, "name" | "service">) {
    super(module);
  }

  public async startAnalysis(conf: Config): Promise<Report> {
    try {
      const results = await runAnalysis(conf);

      return this.handleResults(results.lhr);
    } catch (error) {
      throw new Error(error);
    }
  }

  private handleResults(lhr: any): Report {
    const score = compute(lhr.categories, 1);

    return new Report({
      analyzedUrl: lhr.requestedUrl,
      date: new Date(lhr.fetchTime),
      service: this.service,
      note: score.toString(),
    });
  }
}
