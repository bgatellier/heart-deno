import puppeteer from "puppeteer";
import { createRequire } from "https://deno.land/std@0.177.0/node/module.ts";
import { Options, Report } from "../@types/greenit-cli.d.ts";
import { Config, PageInfos } from "../config/Config.ts";
import { Result } from "./model/Result.ts";
const require = createRequire(import.meta.url);
const { createJsonReports } = require(
  "https://raw.githubusercontent.com/cnumr/GreenIT-Analysis-cli/a4363a9bcf7630e4a5a4cd264a7da9ec6f34b571/cli-core/analysis.js",
);

export async function runAnalysis(conf: Config): Promise<Result> {
  const DEFAULT_OPTIONS: Options = {
    max_tab: 3,
    timeout: 3000,
    retry: 2,
  };

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox", // can't run inside docker without
      "--disable-setuid-sandbox", // but security issues
    ],
    // Keep gpu horsepower in headless
    ignoreDefaultArgs: ["--disable-gpu"],
  });

  const page: PageInfos = {
    ...(conf.url && { url: conf.url }),
  };

  const options: Partial<Options> = {
    ...(conf.timeout && { timeout: conf.timeout }),
    ...(conf.retry && { retry: conf.retry }),
    ...(conf.device && { device: conf.device }),
  };

  try {
    const results: Report[] = await createJsonReports(browser, [page], {
      ...DEFAULT_OPTIONS,
      ...options,
    });

    const firstResult: Result = await import(results[0].path);
    return firstResult;
  } catch (error) {
    return Promise.reject(error);
  } finally {
    const pages = await browser.pages();
    await Promise.all(pages.map((_) => _.close()));
    await browser.close();
  }
}
