// dependencies
export {
  type AnySchema,
  default as ajv,
  type ErrorObject,
  type SchemaObject,
} from "npm:ajv@^8.12.0";
export { default as AjvErrors } from "npm:ajv-errors@^3.0.0";
export { pino } from "npm:pino@^8.17.2";
export {} from "npm:pino-pretty@^10.3.1";
export {
  Cascade,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from "npm:@mikro-orm/core@^5.9.7";
export {} from "npm:@mikro-orm/reflection@^5.9.7";
// dev dependencies
export { type Entry } from "npm:@types/har-format@^1.2.15";
export { type JsonObject, type JsonValue } from "npm:type-fest@^4.9.0";
export { type FastifyInstance } from "npm:fastify@^4.25.2";
export { type FastifyCorsOptions } from "npm:@fastify/cors@^8.5.0";
export { type Config, type Result } from "npm:lighthouse@^11.4.0";
