import { Request } from "@fabernovel/heart-core";

import { AnalysisResponseInterface } from "./model/AnalysisResponseInterface.ts";
import { ReportResponseInterface } from "./model/ReportResponseInterface.ts";

export class Client {
  private readonly API_URL = "https://www.dareboost.com/api/0.5/";
  private readonly conf: object;

  constructor() {
    this.conf = { token: Deno.env.get("DAREBOOST_API_TOKEN") };
  }

  public launchAnalysis(conf: object): Promise<AnalysisResponseInterface> {
    const options = {
      ...conf,
      headers: [{ name: "User-Agent", value: "Dareboost" }],
    };

    return Request.post(`${this.API_URL}analysis/launch`, {
      ...this.conf,
      ...options,
    });
  }

  public getAnalysisReport(reportId: string): Promise<ReportResponseInterface> {
    return Request.post(`${this.API_URL}analysis/report`, {
      ...this.conf,
      reportId,
    });
  }
}
