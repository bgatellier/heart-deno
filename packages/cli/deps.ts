// dependencies
export {
  type AnySchema,
  default as ajv,
  type ErrorObject,
} from "npm:ajv@^8.12.0";
export { default as AjvErrors } from "npm:ajv-errors@^3.0.0";
export { default as addFormats } from "npm:ajv-formats@^2.1.1";
export { default as dotenv } from "npm:dotenv@^16.3.1";
export { default as ora } from "npm:ora@^8.0.1";
export { InvalidArgumentError, Option } from "npm:commander@^11.1.0";
// dev dependencies
export { type FastifyCorsOptions } from "npm:@fastify/cors@^8.5.0";
export {
  type JsonObject,
  type JsonValue,
  type PackageJson,
} from "npm:type-fest@^4.9.0";
