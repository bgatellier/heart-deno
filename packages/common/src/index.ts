import { get, post } from "./http/Request.ts";
import { timeout } from "./time/timeout.js";
import { Module } from "./module/Module.js";
import type { ModuleIndex } from "./module/ModuleIndex.js";
import type { ModuleMetadata } from "./module/ModuleMetadata.js";
import type { Result } from "./report/Result.js";

const Helper = {
  timeout,
};

const Request = {
  get: get,
  post: post,
};

export type { ModuleIndex, ModuleMetadata, Result };
export { Helper, Module, Request };
