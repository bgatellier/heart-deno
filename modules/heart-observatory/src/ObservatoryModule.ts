import {
  Helper,
  Module,
  ModuleAnalysisInterface,
  ModuleInterface,
  Report,
} from "@fabernovel/heart-core";

import { Scan } from "./api/model/Scan.ts";
import { Client } from "./api/Client.ts";

const TIME_BETWEEN_TRIES = 10000;

export class ObservatoryModule extends Module
  implements ModuleAnalysisInterface {
  private config: any;
  private readonly apiClient: Client;

  constructor(module: Pick<ModuleInterface, "name" | "service">) {
    super(module);

    this.apiClient = new Client({
      analyzeUrl: Deno.env.get("OBSERVATORY_ANALYZE_URL") as string,
      apiUrl: Deno.env.get("OBSERVATORY_API_URL") as string,
    });
  }

  /**
   * Allow tests stubbing
   */
  public getApiClient(): Client {
    return this.apiClient;
  }

  public async startAnalysis(config: any): Promise<Report> {
    this.config = config;

    await this.apiClient.launchAnalysis(config);

    return this.requestScan();
  }

  private async requestScan(): Promise<Report> {
    let scan: Scan;

    try {
      scan = await this.apiClient.getAnalysisReport(this.config);
    } catch (error) {
      return Promise.reject({
        error: "error",
        message: error.message,
      });
    }

    return this.handleRequestScan(scan);
  }

  private async handleRequestScan(scan: Scan): Promise<Report> {
    switch (scan.state) {
      case "FAILED":
        throw new Error(scan.state);

      case "FINISHED":
        return new Report({
          analyzedUrl: this.config["host"] as string,
          note: scan.grade,
          resultUrl: this.apiClient.getAnalyzeUrl(this.config),
          service: this.service,
          date: new Date(parseInt(scan.end_time, 10)),
          normalizedNote: scan.score > 100 ? 100 : scan.score,
        });

      default:
        await Helper.wait(TIME_BETWEEN_TRIES);
        return this.requestScan();
    }
  }
}
