import { Report } from "@fabernovel/heart-core";
import { assertObjectMatch, assertStrictEquals } from "testing/asserts.ts";

import { DareboostModule } from "../src/DareboostModule.ts";

import { ApiReportResponse } from "./data/ApiReportResponse.ts";
import { Conf } from "./data/Conf.ts";

Deno.test("should starts an analysis with a valid configuration", async () => {
  const module = new DareboostModule({
    name: "Heart Dareboost Test",
    service: {
      name: "Dareboost Test",
    },
  });
  const REPORT = new Report({
    analyzedUrl: Conf.url,
    date: new Date(ApiReportResponse.report.date),
    note: ApiReportResponse.report.summary.score.toString(),
    resultUrl: ApiReportResponse.report.publicReportUrl,
    service: {
      name: "Dareboost Test",
    },
  });

  const report = await module.startAnalysis(Conf);

  assertStrictEquals(report, REPORT);
});

Deno.test("should starts an analysis with an invalid configuration", async () => {
  const module = new DareboostModule({
    name: "Heart Dareboost Test",
    service: {
      name: "Dareboost Test",
    },
  });

  try {
    await module.startAnalysis({});
  } catch (e) {
    assertObjectMatch(e, {"error": ""});
  }
});