import type { JsonObject, JsonValue } from "npm:type-fest";
import type { ParsedCommonInput, ValidatedCommonInput } from "./CommonInput.ts";

export interface ParsedAnalysisInput extends ParsedCommonInput {
  config: JsonValue;
  threshold?: number;
  except_listeners?: string[];
  only_listeners?: string[];
}

export interface ValidatedAnalysisInput extends ValidatedCommonInput {
  config: JsonObject;
  threshold?: number;
  except_listeners?: string[];
  only_listeners?: string[];
}
