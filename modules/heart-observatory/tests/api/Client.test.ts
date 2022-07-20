import { Scan } from "../../src/api/model/Scan.ts";
import { Client } from "../../src/api/Client.ts";
import { assertEquals, assertObjectMatch } from "testing/asserts.ts";
import { assertSpyCalls, returnsNext, stub } from "testing/mock.ts";

const ANALYZE_URL = "www.observatory.mozilla-test/results";
const API_URL = "www.observatory.mozilla-test/api";
const SCAN: Scan = {
  end_time: "",
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

Deno.test("should analyze with a valid configuration", async () => {
  const CONF = { host: "www.website.test" };

  const client = new Client({ analyzeUrl: ANALYZE_URL, apiUrl: API_URL });

  const launchAnalysisStubbed = stub(
    client,
    "launchAnalysis",
    returnsNext([Promise.resolve(SCAN)]),
  );

  try {
    const scan = await client.launchAnalysis(CONF);

    assertEquals<Scan>(scan, SCAN);
  } finally {
    launchAnalysisStubbed.restore();
  }

  assertSpyCalls(launchAnalysisStubbed, 1);
});

Deno.test("should trigger an error with an invalid configuration", async () => {
  const CONF = {};

  const client = new Client({ analyzeUrl: ANALYZE_URL, apiUrl: API_URL });
  const launchAnalysisStubbed = stub(
    client,
    "launchAnalysis",
    returnsNext([Promise.resolve(SCAN)]),
  );

  try {
    await client.launchAnalysis(CONF);
  } catch (e) {
    assertObjectMatch(e, { "error": "mandatory-parameter" });
  } finally {
    launchAnalysisStubbed.restore();
  }

  assertSpyCalls(launchAnalysisStubbed, 1);
});

// describe("Client", () => {

//   beforeEach(() => {
//     process.env.OBSERVATORY_ANALYZE_URL = ANALYZE_URL;
//     process.env.OBSERVATORY_API_URL = API_URL;
//     // eslint-disable-next-line @typescript-eslint/no-var-requires
//     require("@fabernovel/heart-core").__setMockScan(SCAN);
//   });
// });
