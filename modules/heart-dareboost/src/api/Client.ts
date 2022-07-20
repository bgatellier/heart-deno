import { Request } from "@fabernovel/heart-core";
import { Config } from "../../../heart-core/src/model/module/ModuleAnalysisInterface.ts";

import { AnalysisResponseInterface } from "./model/AnalysisResponseInterface.ts";
import { ReportResponseInterface } from "./model/ReportResponseInterface.ts";

type ClientConfig = {
  apiToken: string;
};

export class Client {
  private readonly API_URL = "https://www.dareboost.com/api/0.5/";
  private readonly config: Config;

  constructor(config: ClientConfig) {
    this.config = { token: config.apiToken };
  }

  public launchAnalysis(config: Config): Promise<AnalysisResponseInterface> {
    const options = {
      ...config,
      headers: [{ name: "User-Agent", value: "Dareboost" }],
    };

    return Request.post(`${this.API_URL}analysis/launch`, {
      ...this.config,
      ...options,
    });
  }

  public getAnalysisReport(reportId: string): Promise<ReportResponseInterface> {
    return Request.post(`${this.API_URL}analysis/report`, {
      ...this.config,
      reportId,
    });
  }
}
