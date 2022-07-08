#!/usr/bin/env node

import {
  isModuleAnalysis,
  isModuleServer,
  ModuleInterface,
} from "@fabernovel/heart-core";
import { Command } from "commander";
import { config } from "dotenv";

import { AnalysisCommand } from "./command/AnalysisCommand.ts";
import { ServerCommand } from "./command/ServerCommand.ts";
import { ModuleLoader } from "./module/ModuleLoader.ts";
import { App } from "./App.ts";

// set environment variables from a .env file
// assume that the root path if the one from where the script has been called
// /!\ this approach does not follow symlink
config({ path: `${Deno.cwd()}/.env` });

const moduleLoader = new ModuleLoader(false);

moduleLoader.load()
  .catch((error) => {
    console.error(error);
    Deno.exit(1);
  })
  .then((modules: ModuleInterface[]) => {
    const app = new App(modules);
    const program = new Command("Heart");

    program.version("3.0.0");

    // create a command for each module
    modules.forEach((module: ModuleInterface) => {
      if (isModuleAnalysis(module)) {
        AnalysisCommand.create(
          program,
          module,
          (conf: object) => app.startAnalysis(module, conf),
        );
      } else if (isModuleServer(module)) {
        ServerCommand.create(
          program,
          module,
          (port: number) => app.startServer(module, modules, port),
        );
      }
    });

    program
      // print error message and --help For invalid commands
      .on("command:*", () => {
        console.error("Invalid command name.\n");
        program.help();
      })
      .parse(Deno.args);
  });
