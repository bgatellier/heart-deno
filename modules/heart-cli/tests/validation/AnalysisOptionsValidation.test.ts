import { AnalysisOptionsValidation } from "../../src/validation/AnalysisOptionsValidation.ts";
import { assertStrictEquals } from "testing/asserts.ts";
import { stub,returnsNext } from "testing/mock.ts";

const MOCK_FILE_INFO = {
  "existingConfig.json": '{"url": "www.my-test.website"}',
};

Deno.test("Provide no configurations", () => {
  const [errors] = AnalysisOptionsValidation.validate();

  assertStrictEquals(errors.length, 1);
});

Deno.test("Provide two configurations", () => {
  const [errors] = AnalysisOptionsValidation.validate();

  assertStrictEquals(errors.length, 1);
});

Deno.test("Provide an inline configuration", () => {
  const [errors, config] = AnalysisOptionsValidation.validate(
    undefined,
    '{"inline": "configuration"}',
  );

  assertStrictEquals(errors.length, 0);
  assertStrictEquals(config, '{"inline": "configuration"}');
});

Deno.test("Provide missing file configuration", () => {
  stub(Deno, "readTextFileSync", returnsNext(MOCK_FILE_INFO["existingConfig.json"]));

  const [errors, config] = AnalysisOptionsValidation.validate(
    "missingConfig.json"
  );

  assertStrictEquals(errors.length, 1);
  assertStrictEquals(config, "");
});

Deno.test("Provide existing file configuration", () => {
  stub(Deno, "readTextFileSync", returnsNext(MOCK_FILE_INFO["existingConfig.json"]));

  const [errors, config] = AnalysisOptionsValidation.validate(
    "existingConfig.json"
  );

  assertStrictEquals(errors.length, 0);
  assertStrictEquals(config, MOCK_FILE_INFO["existingConfig.json"]);
});
