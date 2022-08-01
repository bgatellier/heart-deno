import { Request } from "@fabernovel/heart-core";

import { AnalysisResponseInterface } from "./model/AnalysisResponseInterface.ts";
import { ReportResponseInterface } from "./model/ReportResponseInterface.ts";

type ClientConfig = {
  apiToken: string;
};

export class Client {
  private readonly API_URL = "https://www.dareboost.com/api/0.5/";
  private readonly config: any;

  constructor(config: ClientConfig) {
    this.config = { token: config.apiToken };
  }

  public launchAnalysis(config: any): Promise<AnalysisResponseInterface> {
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
