import type { Block, KnownBlock, WebAPICallResult } from "npm:@slack/web-api";
import { LogLevel, WebClient } from "npm:@slack/web-api";
import { env } from "node:process";

/**
 * Simple Slack client:
 * Initialize a Slack client using:
 * - the HEART_SLACK_ACCESS_TOKEN process.env property
 * - the HEART_SLACK_CHANNEL_ID process.env property
 */
export class Client {
  #channel: string;
  #client: WebClient;

  constructor(verbose: boolean) {
    this.#channel = env.HEART_SLACK_CHANNEL_ID ?? "";
    this.#client = new WebClient(env.HEART_SLACK_ACCESS_TOKEN, {
      logLevel: verbose ? LogLevel.INFO : undefined,
    });
  }

  public postMessage(options: {
    blocks: (KnownBlock | Block)[];
    text: string;
    icon_url?: string;
    username?: string;
  }): Promise<WebAPICallResult> {
    return this.#client.chat.postMessage({
      channel: this.#channel,
      ...options,
    });
  }
}
