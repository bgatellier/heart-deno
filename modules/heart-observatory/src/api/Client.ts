import { Request } from "@fabernovel/heart-core";
import { Config } from "../../../heart-core/src/model/module/ModuleAnalysisInterface.ts";
import { Error, isError } from "./model/Error.ts";

import { Scan } from "./model/Scan.ts";

type ClientConfig = {
  analyzeUrl: string;
  apiUrl: string;
};

export class Client {
  private analyzeUrl?: string;
  private apiUrl?: string;

  constructor(config: ClientConfig) {
    this.analyzeUrl = config.analyzeUrl;
    this.apiUrl = config.apiUrl;
  }

  public async launchAnalysis(config: Config): Promise<Scan> {
    if (undefined === config["host"]) {
      return Promise.reject({
        error: "mandatory-parameter",
        message: '"host" is a mandatory parameter',
      });
    }

    const scan = await Request.post<Scan | Error>(
      this.generateApiUrl(config),
      config,
      {
        [Request.HEADER_CONTENT_TYPE]:
          Request.HEADER_CONTENT_TYPE_X_WWW_FORM_URLENCODED,
      },
    );

    // Observatory API is unconventional, and does not take advantage of http verbs :/
    if (isError(scan)) {
      return Promise.reject({
        error: scan.error,
        message: scan.text,
      });
    }

    if ("FAILED" === scan.state || "ABORTED" === scan.state) {
      return Promise.reject({
        error: "error",
        message: scan.state,
      });
    }

    return scan;
  }

  public getAnalyzeUrl(config: Config): string {
    return this.analyzeUrl + (config ? config["host"] as string : "");
  }

  public getAnalysisReport(config: Config): Promise<Scan> {
    return Request.get(this.generateApiUrl(config));
  }

  private generateApiUrl(config: Config): string {
    return `${this.apiUrl}analyze?host=${
      config ? config["host"] as string : ""
    }`;
  }
}
