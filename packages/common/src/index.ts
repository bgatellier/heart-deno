import { ReportEntity } from "./entities/ReportEntity.ts";
import { ServiceEntity } from "./entities/ServiceEntity.ts";
import { InputError } from "./error/InputError.ts";
import { get, post } from "./http/Request.ts";
import type {
  ParsedAnalysisInput,
  ValidatedAnalysisInput,
} from "./input/AnalysisInput.ts";
import type { ParsedServerInput } from "./input/ServerInput.ts";
import { logger } from "./logger/logger.ts";
import { Module } from "./module/Module.ts";
import type { ModuleIndex } from "./module/ModuleIndex.ts";
import type { ModuleMetadata } from "./module/ModuleMetadata.ts";
import {
  isModuleAnalysis,
  type ModuleAnalysisInterface,
} from "./module/analysis/ModuleAnalysisInterface.ts";
import type { Config } from "./module/config/Config.ts";
import type { GreenITConfig } from "./module/config/greenit/GreeenITConfig.ts";
import type { LighthouseConfig } from "./module/config/lighthouse/LighthouseConfig.ts";
import type { ObservatoryConfig } from "./module/config/observatory/ObservatoryConfig.ts";
import type { SsllabsServerConfig } from "./module/config/ssllabs-server/SsllabsServerConfig.ts";
import { createDatabaseConfig } from "./module/listener/ModuleListenerDatabaseConfig.ts";
import {
  isModuleListenerDatabase,
  type ModuleListenerDatabaseInterface,
} from "./module/listener/ModuleListenerDatabaseInterface.ts";
import {
  isModuleListener,
  type ModuleListenerInterface,
} from "./module/listener/ModuleListenerInterface.ts";
import {
  isModuleServer,
  type ModuleServerInterface,
} from "./module/server/ModuleServerInterface.ts";
import type { GenericReport } from "./report/Report.ts";
import type { Result } from "./report/Result.ts";
import { GreenITReport } from "./report/greenit/GreenITReport.ts";
import { LighthouseReport } from "./report/lighthouse/LighthouseReport.ts";
import { ObservatoryReport } from "./report/observatory/ObservatoryReport.ts";
import { ObservatoryScanState } from "./report/observatory/enum/ObservatoryScanState.ts";
import { SsllabsServerReport } from "./report/ssllabs-server/SsllabsServerReport.ts";
import { SsllabsServerStatus } from "./report/ssllabs-server/enum/SsllabsServerStatus.ts";
import { timeout } from "./time/timeout.ts";
import {
  getAnalysisValidationSchema,
  validateAnalysisInput,
} from "./validation/input/analysis/AnalysisInputValidation.ts";
import { validateServerInput } from "./validation/input/server/ServerInputValidation.ts";

const Helper = {
  timeout,
};

const Request = {
  get: get,
  post: post,
};

export {
  createDatabaseConfig,
  getAnalysisValidationSchema,
  GreenITReport,
  Helper,
  InputError,
  isModuleAnalysis,
  isModuleListener,
  isModuleListenerDatabase,
  isModuleServer,
  LighthouseReport,
  logger,
  Module,
  ObservatoryReport,
  ObservatoryScanState,
  ReportEntity,
  Request,
  ServiceEntity,
  SsllabsServerReport,
  SsllabsServerStatus,
  validateAnalysisInput,
  validateServerInput,
};
export type {
  Config,
  GenericReport,
  GreenITConfig,
  LighthouseConfig,
  ModuleAnalysisInterface,
  ModuleIndex,
  ModuleListenerDatabaseInterface,
  ModuleListenerInterface,
  ModuleMetadata,
  ModuleServerInterface,
  ObservatoryConfig,
  ParsedAnalysisInput,
  ParsedServerInput,
  Result,
  SsllabsServerConfig,
  ValidatedAnalysisInput,
};
