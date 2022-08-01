import { Report } from "@fabernovel/heart-core";
import { assertEquals, assertObjectMatch } from "testing/asserts.ts";

import { DareboostModule } from "../src/DareboostModule.ts";

import { ApiReportResponse } from "./data/ApiReportResponse.ts";
import { ApiAnalysisResponse } from "./data/ApiAnalysisResponse.ts";
import { Conf } from "./data/Conf.ts";
import { assertSpyCalls, returnsNext, Stub, stub } from "testing/mock.ts";
import { Client } from "../src/api/Client.ts";
import { AnalysisResponseInterface } from "../src/api/model/AnalysisResponseInterface.ts";
import { ReportResponseInterface } from "../src/api/model/ReportResponseInterface.ts";

const createModuleAndClientStubs = (): [
  DareboostModule,
  Stub<Client, [config: any], Promise<AnalysisResponseInterface>>,
  Stub<Client, [reportId: string], Promise<ReportResponseInterface>>,
] => {
  const module = new DareboostModule({
    name: "Heart Dareboost Test",
    service: {
      name: "Dareboost Test",
    },
  });
  const launchAnalysisStubbed = stub(
    module.getApiClient(),
    "launchAnalysis",
    returnsNext([Promise.resolve(ApiAnalysisResponse)]),
  );
  const getAnalysisReportStubbed = stub(
    module.getApiClient(),
    "getAnalysisReport",
    returnsNext([Promise.resolve(ApiReportResponse)]),
  );

  return [module, launchAnalysisStubbed, getAnalysisReportStubbed];
};

Deno.test("should starts an analysis with a valid configuration", async () => {
  const [module, launchAnalysisStubbed, getAnalysisReportStubbed] =
    createModuleAndClientStubs();

  const REPORT = new Report({
    analyzedUrl: Conf.url,
    date: new Date(ApiReportResponse.report.date),
    note: ApiReportResponse.report.summary.score.toString(),
    resultUrl: ApiReportResponse.report.publicReportUrl,
    service: {
      name: "Dareboost Test",
    },
  });

  try {
    const report = await module.startAnalysis(Conf);

    assertEquals<Report>(report, REPORT);
  } finally {
    launchAnalysisStubbed.restore();
    getAnalysisReportStubbed.restore();
  }

  assertSpyCalls(launchAnalysisStubbed, 1);
  assertSpyCalls(getAnalysisReportStubbed, 1);
});

Deno.test("should starts an analysis with an invalid configuration", async () => {
  const [module, launchAnalysisStubbed, getAnalysisReportStubbed] =
    createModuleAndClientStubs();

  const REPORT = {};

  try {
    await module.startAnalysis(REPORT);
  } catch (e) {
    assertObjectMatch(e, { "error": "" });
  } finally {
    launchAnalysisStubbed.restore();
    getAnalysisReportStubbed.restore();
  }

  assertSpyCalls(launchAnalysisStubbed, 1);
  assertSpyCalls(getAnalysisReportStubbed, 1);
});
