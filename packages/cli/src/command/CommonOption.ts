import { Option } from "npm:commander";

export interface CommonOptions {
  verbose: boolean;
}

export function createVerboseOption(): Option {
  const option = new Option("-v,--verbose", "Displays debug informations");

  option.defaultValue = false;

  return option;
}
