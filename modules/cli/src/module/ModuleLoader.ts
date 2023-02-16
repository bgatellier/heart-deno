import {
  isModuleAnalysis,
  isModuleListener,
  isModuleServer,
  ModuleInterface,
} from "@fabernovel/heart-core";
import { config, parse } from "dotenv";
import { JSONValue, parse as parsec } from "jsonc";
import { MissingEnvironmentVariables } from "../error/MissingEnvironmentVariables.ts";

export class ModuleLoader {
  // file that contains the list of required environment variables
  private readonly ENVIRONMENT_VARIABLE_MODEL = ".env.sample";
  private readonly PACKAGE_PREFIX = "@fabernovel/heart-";
  // assume that the root path is the one from where the script has been called
  // /!\ this approach does not follow symlink
  private readonly ROOT_PATH = Deno.cwd();
  private readonly debug: boolean;

  constructor(debug = false) {
    this.debug = debug;
  }

  /**
   * Load the installed Heart modules:
   * 1. get the absolute paths of the installed Heart modules
   * 2. checks that no environment variables is missing
   * 3. loads the modules
   */
  public async load(): Promise<ModuleInterface[]> {
    try {
      // retrieve the paths of @fabernovel/heart-* modules, except heart-cli and heart-core.
      // (Heart Core must not be installed as an npm package, but who knows ¯\_(ツ)_/¯)
      // paths are guessed according to the content of the package.json
      const denoJson = parsec(
        Deno.readTextFileSync(`${this.ROOT_PATH}/deno.jsonc`),
      );
      const modulesNamesAndPaths = await this.getNamesAndPaths(
        new RegExp(`^${this.PACKAGE_PREFIX}(?!cli|core)`),
        denoJson,
      );

      if (modulesNamesAndPaths.length > 0) {
        if (this.debug) {
          console.log("Checking missing environment variables...");
        }

        const modulesPaths = modulesNamesAndPaths.map(([_, modulePath]) =>
          modulePath
        );

        // load environment variables according to the .env.sample of the loaded modules
        const missingEnvironmentVariables = this.loadEnvironmentVariables(
          modulesPaths,
        );

        if (missingEnvironmentVariables.length > 0) {
          throw new MissingEnvironmentVariables(missingEnvironmentVariables);
        }
      }

      const modulesNames = modulesNamesAndPaths.map(([moduleName]) =>
        moduleName
      );
      return this.loadModules(modulesNames);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Load the environment variables of the given modules.
   * If they are not found, set them with the default values if they exist.
   * Otherwise send them back as missing environment variables.
   */
  private loadEnvironmentVariables(modulesPaths: string[]): string[] {
    const missingEnvironmentVariables: string[] = [];

    // load environment variables from a .env file
    // assume that the root path if the one from where the script has been called
    // /!\ this approach does not follow symlink
    config({ path: `${this.ROOT_PATH}/.env`, export: true });

    modulesPaths.forEach((modulePath: string) => {
      try {
        // load the .env.sample file from the module
        const requiredModuleEnvironmentVariables = Object.entries(
          parse(
            Deno.readTextFileSync(
              this.ROOT_PATH +
                modulePath.substring(0, modulePath.lastIndexOf("src/")) +
                this.ENVIRONMENT_VARIABLE_MODEL,
            ),
          ).env,
        );

        // set default variables
        requiredModuleEnvironmentVariables.filter((
          [variableName, defaultValue],
        ) =>
          undefined === Deno.env.get(variableName) &&
          defaultValue.length !== 0
        ).forEach(
          ([variableName, defaultValue]) => {
            Deno.env.set(variableName, defaultValue);
          },
        );

        // get the dotenv variables that are not yet registered in process.env
        const missingModuleDotEnvVariables = requiredModuleEnvironmentVariables
          .filter(([variableName]) => undefined === Deno.env.get(variableName));

        // add the missing module dotenv variables to the missing list
        missingEnvironmentVariables.push(
          ...missingModuleDotEnvVariables.map(([variableName]) => variableName),
        );
        // deno-lint-ignore no-empty
      } catch (_error) {}
    });

    return missingEnvironmentVariables;
  }

  /**
   * List the Heart modules root path, according to the modules defined in package.json that follows the given pattern.
   */
  private getNamesAndPaths(
    pattern: RegExp,
    denoJson: JSONValue,
  ): Promise<[string, string][]> {
    try {
      // add the module name to the list if it matches the pattern
      const modulesNameAndPath = Object.entries<string>(denoJson.imports ?? {})
        .filter(([moduleName]) => pattern.test(moduleName));

      return Promise.resolve(modulesNameAndPath);
    } catch (error) {
      if (this.debug) {
        console.error(`package.json not found in ${this.ROOT_PATH}`);
      }

      return Promise.reject(error);
    }
  }

  /**
   * Load a list of modules according to their path.
   */
  private async loadModules(
    modulesNames: string[],
  ): Promise<ModuleInterface[]> {
    const promises = [];

    // do not use the .forEach() method here instead of the for() loop,
    // because the 'await' keyword will not be available.
    for (let i = 0; i < modulesNames.length; i++) {
      const moduleName = modulesNames[i];

      try {
        if (this.debug) {
          console.log("Loading module %s...", moduleName);
        }

        const pkg = await import(moduleName);
        const module = pkg.default;

        // only keep the modules that are compatible
        if (
          isModuleAnalysis(module) || isModuleListener(module) ||
          isModuleServer(module)
        ) {
          // guess the module id from the package name: take the string after the characters "@fabernovel/heart-"
          const matches = (new RegExp(`^${this.PACKAGE_PREFIX}(.+)$`)).exec(
            moduleName,
          );

          if (null === matches) {
            console.error(
              `${moduleName} module not loaded because the name does not start with ${this.PACKAGE_PREFIX}.`,
            );
          } else {
            module.id = matches[1];
            promises.push(module);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

    return Promise.all(promises);
  }
}
