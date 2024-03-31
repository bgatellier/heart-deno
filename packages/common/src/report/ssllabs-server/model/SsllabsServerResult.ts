import type { Result } from "../../Result.ts";
import type { SsllabsServerStatus } from "../enum/SsllabsServerStatus.ts";
import type { SsllabsServerEndpoint } from "./SsllabsServerEndpoint.ts";

/**
 * @see [Documentation]{@link https://github.com/ssllabs/ssllabs-scan/blob/master/ssllabs-api-docs-v3.md#host}
 */
export type SsllabsServerResult = Result & {
  host: string;
  port: number;
  protocol: string;
  isPublic: boolean;
  status: SsllabsServerStatus;
  statusMessage: string;
  startTime: string;
  testTime: string;
  engineVersion: string;
  criteriaVersion: string;
  endpoints: SsllabsServerEndpoint[];
};
