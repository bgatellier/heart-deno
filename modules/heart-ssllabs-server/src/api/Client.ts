import { Request } from "@fabernovel/heart-core";
import { stringify } from "querystring";

import { Host } from "./model/Host.ts";
import { Error, isError } from "./model/Error.ts";
import { Status } from "./enum/Status.ts";
import { Config } from "../../../heart-core/src/model/module/ModuleAnalysisInterface.ts";

const API_URL = "https://api.ssllabs.com/api/v3";
const SERVICE_URL = "https://www.ssllabs.com/ssltest/analyze.html?d=";

export class Client {
  private conf!: Config;

  public launchAnalysis(conf: Config): Promise<Host> {
    this.conf = conf;

    return this.requestApi();
  }

  public getProjectUrl(): string {
    return typeof this.conf.host === "string" ? this.conf.host : "";
  }

  public getAnalyzeUrl(): string {
    return SERVICE_URL + this.getProjectUrl();
  }

  public getAnalysisReport(): Promise<Host> {
    // avoid starting a new analysis instead of requesting the results
    if ("string" === typeof this.conf.startNew) {
      delete this.conf.startNew;
    }

    return this.requestApi();
  }

  private generateApiUrl(path: string): string {
    return `${API_URL}${path}?${stringify(this.conf)}`;
  }

  private async requestApi(): Promise<Host> {
    const host = await Request.get<Host | Error>(
      this.generateApiUrl("/analyze"),
    );

    if (isError(host)) {
      return Promise.reject({
        error: host.errors[0].field,
        message: host.errors[0].message,
      });
    }

    if (host.status === Status.ERROR) {
      return Promise.reject({
        error: "error",
        message: host.statusMessage,
      });
    }

    return new Host(host);
  }
}
