import { isAbsolute } from "path";

export class AnalysisOptionsValidation {
  /**
   * Validate that the analysis options are correct
   * @returns The list of errors and the analysis configuration
   */
  public static validate(
    configFile: string,
    configInline: string,
  ): [string[], string] {
    let config = "";
    const errors: string[] = [];

    if (undefined === configFile && undefined === configInline) {
      errors.push("You must provide a configuration");
    } else if (undefined !== configFile && undefined !== configInline) {
      errors.push("You must provide only one configuration");
    }

    if (errors.length > 0) {
      return [errors, config];
    }

    if (configInline) {
      config = configInline;
    } else { // file: load file from the given path
      const path = isAbsolute(configFile)
        ? configFile
        : `${Deno.cwd()}/${configFile}`;

      try {
        config = Deno.readTextFileSync(path);
      } catch (error) {
        errors.push(error.message);
      }
    }

    return [errors, config];
  }
}
