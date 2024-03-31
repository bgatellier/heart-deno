import type { Config } from "npm:lighthouse";
import type { Config as BaseConfig } from "../Config.ts";

export type LighthouseConfig = BaseConfig & {
  url: string;
  config?: Config;
};
