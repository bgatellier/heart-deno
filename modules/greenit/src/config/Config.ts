import type { Options } from "../@types/greenit-cli.d.ts";

export interface PageInfos {
  url: string;
}

export interface Config extends PageInfos, Options {}
