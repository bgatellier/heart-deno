import type { SchemaObject } from "npm:ajv";
import type { ValidatedServerInput } from "../../../input/ServerInput.ts";
import { validateInput } from "../InputValidation.ts";
import corsSchema from "./schema/cors.json" with { type: "json" };
import portSchema from "./schema/port.json" with { type: "json" };
import verboseSchema from "../schema/verbose.json" with { type: "json" };

function getValidationSchema(): SchemaObject {
  return {
    type: "object",
    properties: {
      cors: corsSchema,
      port: portSchema,
      verbose: verboseSchema,
    },
    additionalProperties: false,
  };
}

/**
 * Validate that the server options are correct.
 * Throws InputError if not.
 *
 * @throws {InputError}
 */
export function validateServerInput(data: unknown): ValidatedServerInput {
  const schema = getValidationSchema();

  return validateInput<ValidatedServerInput>(data, schema);
}
