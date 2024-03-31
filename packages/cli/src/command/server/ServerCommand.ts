import {
  type Config,
  type GenericReport,
  InputError,
  type ModuleAnalysisInterface,
  type ModuleListenerInterface,
  type ModuleMetadata,
  type ModuleServerInterface,
  type ParsedServerInput,
  type Result,
  validateServerInput,
} from "@fabernovel/heart-common";
import type { FastifyCorsOptions } from "npm:@fastify/cors";
import { Command, InvalidArgumentError } from "npm:commander";
import { createVerboseOption } from "../CommonOption.ts";
import {
  createCorsOption,
  createPortOption,
  type ServerOptions,
} from "./ServerOption.ts";
import type { PackageJsonModule } from "../../module/PackageJson.ts";
import { checkEnv, initializeModules } from "../../module/ModuleLoader.ts";
import { startServer } from "../../module/ModuleOrchestrator.ts";

type ServerSubcommandCallback = (
  verbose: boolean,
  port: number,
  corsOptions: FastifyCorsOptions | undefined,
) => Promise<void>;

function prepareOptionsForValidation(
  options: ServerOptions,
): ParsedServerInput {
  return {
    cors: options.cors,
    port: options.port,
    verbose: options.verbose,
  };
}

/**
 * Create a command dedicated to the given server module
 */
export const createServerSubcommand = (
  moduleMetadata: ModuleMetadata,
  callback: ServerSubcommandCallback,
): Command => {
  const subcommand = new Command(moduleMetadata.id);

  subcommand
    .description(`Starts the ${moduleMetadata.name} server`)
    .addOption(createVerboseOption())
    .addOption(createPortOption())
    .addOption(createCorsOption())
    .action(async (options: ServerOptions) => {
      try {
        const unvalidatedInputs = prepareOptionsForValidation(options);
        const { cors, port, verbose } = validateServerInput(unvalidatedInputs);

        await callback(verbose, port, cors);
      } catch (error) {
        if (error instanceof InputError) {
          const e = new InvalidArgumentError(error.message);
          return Promise.reject(e);
        } else {
          return Promise.reject(error);
        }
      }
    });

  return subcommand;
};

/**
 * Callback function called once the CLI command has been executed (the user hit "enter").
 * @param config
 * @param threshold
 * @param listenerModulesMetadataMap Filtered map of listener modules metadata and their file path
 */
export function createServerSubcommandCallback(
  packageJsonModule: PackageJsonModule,
  modulePath: string,
  analysisModulesMetadataMap: Map<string, PackageJsonModule>,
  listenerModulesMetadataMap: Map<string, PackageJsonModule>,
): ServerSubcommandCallback {
  return async (
    verbose: boolean,
    port: number,
    cors: FastifyCorsOptions | undefined,
  ) => {
    // load environment variables for the server module
    // load environment variables for the analysis modules:
    // do it once at startup instead at each route call
    await checkEnv([modulePath, ...analysisModulesMetadataMap.keys()]);

    // initialize the server, analysis and listeners modules
    const analysisModules = await initializeModules<
      ModuleAnalysisInterface<Config, GenericReport<Result>>
    >(
      analysisModulesMetadataMap,
      verbose,
    );
    const listenerModules = await initializeModules<ModuleListenerInterface>(
      listenerModulesMetadataMap,
      verbose,
    );
    const serverModules = await initializeModules<ModuleServerInterface>(
      new Map([[modulePath, packageJsonModule]]),
      verbose,
    );

    await startServer(
      serverModules[0],
      analysisModules,
      listenerModules,
      port,
      cors,
    );
  };
}
