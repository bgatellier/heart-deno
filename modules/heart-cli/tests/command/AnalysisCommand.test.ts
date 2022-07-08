import { ModuleAnalysisInterface, Report } from "@fabernovel/heart-core";
import { Command } from "commander";

import { AnalysisCommand } from "../../src/command/AnalysisCommand.ts";

test("Create an analysis command", () => {
  const program = new Command();
  const report = new Report({
    note: "50",
    normalizedNote: 50,
  });

  const module: ModuleAnalysisInterface = {
    id: "test-analysis-tool",
    name: "Heart Test Analysis Tool",
    service: {
      name: "Test Analysis Tool",
    },
    startAnalysis: () => new Promise((resolve) => resolve(report)),
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  AnalysisCommand.create(program, module, () => {});

  expect(program.commands[0]._name).toBe(module.id);
  expect(program.commands[0].options.length).toBe(2);
  expect(program.commands[0].options[0].short).toBe("-f");
  expect(program.commands[0].options[0].long).toBe("--file");
  expect(program.commands[0].options[1].short).toBe("-i");
  expect(program.commands[0].options[1].long).toBe("--inline");
});
