import { Scan } from "./Scan.ts";

export type Error = {
  error: unknown;
  text: string;
};

export const isError = (object: Scan | Error): object is Error =>
  "error" in object;
