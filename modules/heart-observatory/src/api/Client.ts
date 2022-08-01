import { Request } from "@fabernovel/heart-core";
import {
  HEADER_CONTENT_TYPE,
  HEADER_CONTENT_TYPE_X_WWW_FORM_URLENCODED,
} from "../../../heart-core/src/http/Request.ts";
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

  public async launchAnalysis(config: any): Promise<Scan> {
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
        [HEADER_CONTENT_TYPE]: HEADER_CONTENT_TYPE_X_WWW_FORM_URLENCODED,
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

  public getAnalyzeUrl(config: any): string {
    return this.analyzeUrl + (config ? config["host"] as string : "");
  }

  public getAnalysisReport(config: any): Promise<Scan> {
    return Request.get(this.generateApiUrl(config));
  }

  private generateApiUrl(config: any): string {
    return `${this.apiUrl}analyze?host=${
      config ? config["host"] as string : ""
    }`;
  }
}
