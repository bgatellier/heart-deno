import type { FastifyCorsOptions } from "npm:@fastify/cors";
import type { JsonValue } from "npm:type-fest";
import type { ParsedCommonInput, ValidatedCommonInput } from "./CommonInput.ts";

export interface ParsedServerInput extends ParsedCommonInput {
  cors?: JsonValue;
  port: number;
  verbose: boolean;
}

export interface ValidatedServerInput extends ValidatedCommonInput {
  cors?: FastifyCorsOptions;
  port: number;
  verbose: boolean;
}
