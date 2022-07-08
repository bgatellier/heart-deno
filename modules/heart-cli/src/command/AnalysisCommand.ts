import { ModuleAnalysisInterface } from "@fabernovel/heart-core";
import { Command } from "commander";

import { AnalysisOptionsValidation } from "../validation/AnalysisOptionsValidation.ts";

export class AnalysisCommand {
  /**
   * Create a command dedicated to the given analysis module
   */
  public static create(
    program: Command,
    module: ModuleAnalysisInterface,
    callback: (config: object) => void,
  ): void {
    program
      .command(module.id)
      .description(`Analyzes an url with ${module.service.name}`)
      .option("-f, --file [file]", "Path to the JSON configuration file")
      .option("-i, --inline [inline]", "Inlined JSON configuration")
      .action((cmd: Command) => {
        const [errors, config] = AnalysisOptionsValidation.validate(
          cmd.file,
          cmd.inline,
        );

        if (errors.length > 0) {
          errors.forEach((error) => console.error(error));
          cmd.help();
        }

        try {
          callback(JSON.parse(config));
        } catch (_error) {
          console.error(
            "Cannot parse the configuration. Please check the JSON syntax.",
          );
          Deno.exit(1);
        }
      });
  }
}
