import { WebClient } from "@slack/web-api";

type ClientConfig = {
  channel: string;
  apiToken: string;
};

export class Client {
  private channel: string;
  private client;

  constructor(config: ClientConfig) {
    this.channel = config.channel;
    this.client = new WebClient(config.apiToken);
  }

  public postMessage(options: {
    text: string;
    icon_url?: string;
    username?: string;
  }): Promise<unknown> {
    return this.client.chat.postMessage({
      channel: this.channel,
      ...options,
    });
  }
}
