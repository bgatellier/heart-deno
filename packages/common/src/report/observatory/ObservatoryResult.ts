import type { Result } from "../Result.ts";
import type { ObservatoryScan } from "./model/ObservatoryScan.ts";
import type { ObservatoryTests } from "./model/ObservatoryTests.ts";

export type ObservatoryResult = Result & {
  scan: ObservatoryScan;
  tests: ObservatoryTests;
};
