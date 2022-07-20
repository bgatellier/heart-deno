import {
  AnalysisEvents,
  Module,
  ModuleInterface,
  ModuleListenerInterface,
  Report,
} from "@fabernovel/heart-core";
import { EventEmitter } from "events";

import { Client } from "./api/Client.ts";

export class SlackModule extends Module implements ModuleListenerInterface {
  private client: Client;

  constructor(module: Pick<ModuleInterface, "name" | "service">) {
    super(module);

    this.client = new Client({
      channel: Deno.env.get("SLACK_CHANNEL_ID") as string,
      apiToken: Deno.env.get("SLACK_API_TOKEN") as string,
    });
  }

  /**
   * Register the events:
   * 1. take the events and their handlers from the mapping table
   * 2. register each event on the event emitter
   */
  public registerEvents(eventEmitter: EventEmitter): void {
    eventEmitter.on(AnalysisEvents.DONE, this.sendReport.bind(this));
  }

  private sendReport(report: Report): void {
    let message = `${report.analyzedUrl}: ${report.note}`;
    if (report.resultUrl) {
      message += `. <${report.resultUrl}|view full report>`;
    }
    this.client.postMessage({
      text: message,
      icon_url: report.service ? report.service.logo : undefined,
      username: report.service ? report.service.name : undefined,
    });
  }
}
