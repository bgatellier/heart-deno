import type { Result } from "npm:lighthouse";
import type { Result as R } from "../Result.ts";

export type LighthouseResult = R & Result;
