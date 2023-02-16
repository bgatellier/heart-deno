import { PuppeteerLifeCycleEvent } from "puppeteer";

export type SizeNames =
  | "desktop"
  | "galaxyS9"
  | "galaxyS20"
  | "iPhone8"
  | "iPhone8Plus"
  | "iPhoneX"
  | "iPad";

export type sizes = {
  [key in SizeNames]: {
    width: number;
    height: number;
    isMobile: boolean;
  };
};

export type Action = {
  type: "click" | "text" | "select" | "scroll";
  element: string;
  content: unknown;
  timeoutBefore: number;
  values: unknown;
};

export type PageInformation = {
  url: string;
  screenshot?: string;
  actions?: Action[] | { screenshot: string };
  waitForSelector?: string;
  waitForXPath?: string;
  waitForNavigation?: PuppeteerLifeCycleEvent | PuppeteerLifeCycleEvent[];
};

export type Options = {
  timeout?: number;
  max_tab?: number;
  retry?: number;
  device?: SizeNames;
  ci?: boolean;
};

export type Proxy = {
  user: string;
  password: string;
};

export type Report = {
  name: string;
  path: string;
};
