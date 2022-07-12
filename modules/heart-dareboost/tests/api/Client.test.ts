import { assertEquals } from "testing/asserts.ts";
import { AnalysisResponseInterface } from "../../src/api/model/AnalysisResponseInterface.ts";
import { ReportResponseInterface } from "../../src/api/model/ReportResponseInterface.ts";
import { Client } from "../../src/api/Client.ts";
import { assertSpyCalls, returnsNext, stub } from "testing/mock.ts";
import { ApiAnalysisResponse } from "../data/ApiAnalysisResponse.ts";
import { ApiReportResponse } from "../data/ApiReportResponse.ts";

Deno.test("should launch an analysis", async () => {
  const ANALYSIS: AnalysisResponseInterface = {
    status: "",
    message: "",
    reportId: "",
  };
  const CONF = { url: "www.website.test" };

  const client = new Client();
  const launchAnalysisStubbed = stub(
    client,
    "launchAnalysis",
    returnsNext([Promise.resolve(ApiAnalysisResponse)]),
  );

  try {
    const analysisResponse = await client.launchAnalysis(CONF);

    assertEquals<AnalysisResponseInterface>(analysisResponse, ANALYSIS);
  } finally {
    launchAnalysisStubbed.restore();
  }

  assertSpyCalls(launchAnalysisStubbed, 1);
});

Deno.test("should retrieve the analysis report", async () => {
  const REPORT: ReportResponseInterface = {
    status: 200,
    message: "",
    missing: [],
    report: {
      publicReportUrl: "",
      harFileUrl: "",
      date: 1584540399,
      url: "",
      lang: "",
      config: {
        location: "",
        browser: {
          name: "",
          version: "",
        },
        isMobile: true,
        bandwidth: {
          upstream: 0,
          downstream: 0,
        },
        latency: 0,
        isPrivate: true,
        screen: {
          height: 0,
          width: 0,
        },
        basicAuth: {
          user: "",
          password: "",
        },
        postData: [
          {
            key: "",
            value: "",
          },
        ],
        header: [
          {
            key: "",
            value: "",
          },
        ],
        blacklist: [],
        whiteList: [],
        dnsMapping: [
          {
            origin: "",
            destination: "",
          },
        ],
      },
      summary: {
        loadTime: 0,
        score: 0,
        requestsCount: 0,
        weight: 0,
      },
      categories: [
        {
          name: "",
        },
      ],
      tips: [
        {
          advice: "",
          category: "",
          score: 0,
          name: "",
          priority: 0,
        },
      ],
      timings: {
        firstByte: 0,
        firstPaint: 0,
        domInteractive: 0,
        loadEvent: 0,
        startRender: 0,
        speedIndex: 0,
        visuallyComplete: 0,
        oldVisuallyComplete: 0,
      },
      resourceByType: [
        {
          type: "",
          bodyWeight: 0,
          headerWeight: 0,
          requestCount: 0,
        },
      ],
      technos: [
        {
          name: "",
          version: "",
        },
      ],
    },
  };

  const client = new Client();
  const getAnalysisReportStubbed = stub(
    client,
    "getAnalysisReport",
    returnsNext([Promise.resolve(ApiReportResponse)]),
  );

  try {
    const report = await client.getAnalysisReport("");

    assertEquals<ReportResponseInterface>(report, REPORT);
  } finally {
    getAnalysisReportStubbed.restore();
  }

  assertSpyCalls(getAnalysisReportStubbed, 1);
});
