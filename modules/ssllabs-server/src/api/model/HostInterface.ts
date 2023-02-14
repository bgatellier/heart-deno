import { Status } from "../enum/Status.ts";

import { EndpointInterface } from "./EndpointInterface.ts";

/**
 * @see [Documentation]{@link https://github.com/ssllabs/ssllabs-scan/blob/master/ssllabs-api-docs-v3.md#host}
 */
export interface HostInterface {
  host: string;
  port: number;
  protocol: string;
  isPublic: boolean;
  status: Status;
  statusMessage: string;
  startTime: string;
  testTime: string;
  engineVersion: string;
  criteriaVersion: string;
  endpoints: EndpointInterface[];
}
