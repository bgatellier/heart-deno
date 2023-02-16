import {
  ModuleAnalysisInterface,
  ModuleListenerInterface,
  Report,
} from "@fabernovel/heart-core";
import { assertSpyCalls, spy } from "testing/mock.ts";

import { App } from "../src/App.ts";

Deno.test("Register events from Listener modules", () => {
  const module: ModuleListenerInterface = {
    id: "test-listener",
    name: "Heart Test Listener",
    service: {
      name: "Test Listener",
    },
    registerEvents: () => {},
  };

  const registerEventsSpy = spy(module, "registerEvents");

  new App([module]);

  assertSpyCalls(registerEventsSpy, 1);
});

Deno.test("Displays the results of an analysis", async () => {
  const report = new Report({
    analyzedUrl: "https://heart.fabernovel.com",
    date: new Date(),
    note: "50",
  });

  const module: ModuleAnalysisInterface = {
    id: "test-analysis-tool",
    name: "Heart Test Analysis Tool",
    service: {
      name: "Test Analysis Tool",
    },
    startAnalysis: () => new Promise((resolve) => resolve(report)),
  };

  const startAnalysisSpy = spy(module, "startAnalysis");
  const consoleLogSpy = spy(console, "log");

  const app = new App([module]);
  await app.startAnalysis(module, {});

  assertSpyCalls(startAnalysisSpy, 1);
  assertSpyCalls(consoleLogSpy, 1);
});
