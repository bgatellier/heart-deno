import { get, post } from "./http/Request.ts";
import { timeout } from "./time/timeout.ts";
import { Module } from "./module/Module.ts";
import type { ModuleIndex } from "./module/ModuleIndex.ts";
import type { ModuleMetadata } from "./module/ModuleMetadata.ts";
import type { Result } from "./report/Result.ts";
import {
  getAnalysisValidationSchema,
  validateAnalysisInput,
} from "./validation/input/analysis/AnalysisInputValidation.ts";
import { validateServerInput } from "./validation/input/server/ServerInputValidation.ts";
import { InputError } from "./error/InputError.ts";
import type {
  ParsedAnalysisInput,
  ValidatedAnalysisInput,
} from "./input/AnalysisInput.ts";
import type { ParsedServerInput } from "./input/ServerInput.ts";

const Helper = {
  timeout,
};

const Request = {
  get: get,
  post: post,
};

export type {
  ModuleIndex,
  ModuleMetadata,
  ParsedAnalysisInput,
  ParsedServerInput,
  Result,
  ValidatedAnalysisInput,
};
export {
  getAnalysisValidationSchema,
  Helper,
  InputError,
  Module,
  Request,
  validateAnalysisInput,
  validateServerInput,
};
