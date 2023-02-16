import { Report } from "@fabernovel/heart-core";
import { assertSpyCalls, returnsNext, Stub, stub } from "testing/mock.ts";
import { assertEquals, assertObjectMatch } from "testing/asserts.ts";

import { Scan } from "../src/api/model/Scan.ts";
import { ObservatoryModule } from "../src/ObservatoryModule.ts";
import { Client } from "../src/api/Client.ts";

const ANALYZE_URL = "www.observatory.mozilla-test/results";
const API_URL = "www.observatory.mozilla-test/api";

Deno.env.set("OBSERVATORY_ANALYZE_URL", ANALYZE_URL);
Deno.env.set("OBSERVATORY_API_URL", API_URL);

const SCAN: Scan = {
  end_time: "1658341082099",
  grade: "B",
  hidden: true,
  response_headers: {},
  scan_id: 1,
  score: 95,
  likelihood_indicator: "",
  start_time: "",
  state: "FINISHED",
  tests_failed: 3,
  tests_passed: 4,
  tests_quantity: 12,
};

const createModuleAndClientStubs = (): [
  ObservatoryModule,
  Stub<Client, [config: any], Promise<Scan>>,
  Stub<Client, [config: any], Promise<Scan>>,
] => {
  const module = new ObservatoryModule({
    name: "Heart Observatory Test",
    service: {
      name: "Observatory Test",
    },
  });
  const launchAnalysisStubbed = stub(
    module.getApiClient(),
    "launchAnalysis",
    returnsNext([Promise.resolve(SCAN)]),
  );
  const getAnalysisReportStubbed = stub(
    module.getApiClient(),
    "getAnalysisReport",
    returnsNext([Promise.resolve(SCAN)]),
  );

  return [module, launchAnalysisStubbed, getAnalysisReportStubbed];
};

Deno.test("should analyze with a valid configuration", async () => {
  const [module, launchAnalysisStubbed, getAnalysisReportStubbed] =
    createModuleAndClientStubs();

  const REPORT = new Report({
    analyzedUrl: "www.website.test",
    date: new Date(parseInt(SCAN.end_time, 10)),
    note: SCAN.grade,
    resultUrl: ANALYZE_URL + "www.website.test",
    service: {
      name: "Observatory Test",
    },
    normalizedNote: SCAN.score > 100 ? 100 : SCAN.score,
  });

  try {
    const report = await module.startAnalysis({ host: "www.website.test" });

    assertEquals<Report>(report, REPORT);
  } finally {
    launchAnalysisStubbed.restore();
    getAnalysisReportStubbed.restore();
  }

  assertSpyCalls(launchAnalysisStubbed, 1);
  assertSpyCalls(getAnalysisReportStubbed, 1);
});

Deno.test("should trigger an error with an invalid configuration", async () => {
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
});

// Deno.test("Starts an analysis", () => {

//   beforeEach(() => {
//     process.env.OBSERVATORY_ANALYZE_URL = ANALYZE_URL;
//     process.env.OBSERVATORY_API_URL = API_URL;
//     // eslint-disable-next-line @typescript-eslint/no-var-requires
//     require("@fabernovel/heart-core").__setMockScan(SCAN);
//   });
// });
