import { Config as LHConfig } from "lighthouse";

export interface Config {
  url: string;
  config?: LHConfig;
}
