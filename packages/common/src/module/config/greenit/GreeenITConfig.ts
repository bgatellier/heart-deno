import type { Config } from "../Config.ts";

type SizeNames =
  | "desktop"
  | "galaxyS9"
  | "galaxyS20"
  | "iPhone8"
  | "iPhone8Plus"
  | "iPhoneX"
  | "iPad";

interface Options {
  timeout?: number;
  max_tab?: number;
  retry?: number;
  device?: SizeNames;
  ci?: boolean;
}

export type GreenITConfig =
  & Config
  & Options
  & {
    url: string;
  };
