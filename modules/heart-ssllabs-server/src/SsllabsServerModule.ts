import {
  Helper,
  Module,
  ModuleAnalysisInterface,
  ModuleInterface,
  Report,
} from "@fabernovel/heart-core";

import { Status } from "./api/enum/Status.ts";
import { Host } from "./api/model/Host.ts";
import { Client } from "./api/Client.ts";
import { Config } from "../../heart-core/src/model/module/ModuleAnalysisInterface.ts";

const MAX_TRIES = 100;
const TIME_BETWEEN_TRIES = 10000; // 10 seconds

export default class SsllabsServerModule extends Module
  implements ModuleAnalysisInterface {
  private apiClient: Client;

  constructor(module: Pick<ModuleInterface, "name" | "service">) {
    super(module);

    this.apiClient = new Client();
  }

  public async startAnalysis(conf: Config): Promise<Report> {
    await this.apiClient.launchAnalysis(conf);

    return this.requestReport();
  }

  private async requestReport(triesQty = 1): Promise<Report> {
    if (triesQty > MAX_TRIES) {
      throw new Error(
        `The maximum number of tries (${MAX_TRIES}) to retrieve the report has been reached.`,
      );
    }

    try {
      const host = await this.apiClient.getAnalysisReport();

      return this.handleRequestScan(host, triesQty);
    } catch (error) {
      return Promise.reject({
        error: "error",
        message: error.message,
      });
    }
  }

  private async handleRequestScan(
    host: Host,
    triesQty: number,
  ): Promise<Report> {
    switch (host.status) {
      case Status.ERROR:
        throw new Error(`${host.status}: ${host.statusMessage}`);

      case Status.DNS:
      case Status.IN_PROGRESS:
        await Helper.wait(TIME_BETWEEN_TRIES);
        return this.requestReport(++triesQty);

      case Status.READY:
        return new Report({
          analyzedUrl: this.apiClient.getProjectUrl(),
          note: host.getAveragePercentage().toString(),
          normalizedNote: host.getAveragePercentage(),
          resultUrl: this.apiClient.getAnalyzeUrl(),
          date: new Date(host.startTime),
          service: this.service,
        });

      default:
        throw new Error(host.statusMessage);
    }
  }
}
