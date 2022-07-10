import { ModuleAnalysisInterface, Report } from "@fabernovel/heart-core";
import { Command } from "commander";
import { assertStrictEquals } from "testing/asserts.ts";

import { AnalysisCommand } from "../../src/command/AnalysisCommand.ts";

Deno.test("Create an analysis command", () => {
  const program = new Command();
  const report = new Report({
    analyzedUrl: "https://heart.fabernovel.com",
    date: new Date(),
    note: "50"
  });

  const module: ModuleAnalysisInterface = {
    id: "test-analysis-tool",
    name: "Heart Test Analysis Tool",
    service: {
      name: "Test Analysis Tool",
    },
    startAnalysis: () => new Promise((resolve) => resolve(report)),
  };

  AnalysisCommand.create(program, module, () => {});

  assertStrictEquals(program.commands[0]._name, module.id);
  assertStrictEquals(program.commands[0].options.length, 2);
  assertStrictEquals(program.commands[0].options[0].short, "-f");
  assertStrictEquals(program.commands[0].options[0].long, "--file");
  assertStrictEquals(program.commands[0].options[1].short, "-i");
  assertStrictEquals(program.commands[0].options[1].long, "--inline");
});
