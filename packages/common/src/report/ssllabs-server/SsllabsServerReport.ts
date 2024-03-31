import type { ValidatedAnalysisInput } from "../../index.ts";
import type { Service } from "../../service/Service.ts";
import type { GenericReport, ReportArguments } from "../Report.ts";
import type { SsllabsServerGrade } from "./enum/SsllabsServerGrade.ts";
import type { SsllabsServerEndpoint } from "./model/SsllabsServerEndpoint.ts";
import type { SsllabsServerResult } from "./model/SsllabsServerResult.ts";

/**
 * @see [Documentation ('grade' property)]{@link https://github.com/ssllabs/ssllabs-scan/blob/master/ssllabs-api-docs-v3.md#endpoint}
 */
const TRANSFORM_TABLE: { [key in SsllabsServerGrade]: number } = {
  "A+": 95, // equal repartition of the A grades (A+, A, A-) between 80 and 100
  A: 90,
  "A-": 85,
  B: 72.5, // average between 65 and 80
  C: 57.5, // average between 50 and 65
  D: 42.5, // average between 35 and 50
  E: 27.5, // average between 20 and 35
  F: 10, // average between 0 and 20
  T: 0,
  M: 0,
};

/**
 * Transform a grade (A+, A, A-, B, C...) into a percentage (number between 0 and 100)
 * @see [Methodology]{@link https://github.com/ssllabs/research/wiki/SSL-Server-Rating-Guide#methodology-overview}
 */
const transformGradeIntoPercentage = (
  grade: keyof typeof SsllabsServerGrade,
): number => {
  return TRANSFORM_TABLE[grade];
};

const computeEndpoints = (endpoints: SsllabsServerEndpoint[]): number => {
  const grades = endpoints.map((endpoint: SsllabsServerEndpoint) =>
    transformGradeIntoPercentage(endpoint.grade)
  );

  if (0 === grades.length) {
    return 0;
  }

  const sumGrades = grades.reduce(
    (previousValue: number, currentValue: number) =>
      previousValue + currentValue,
  );

  return sumGrades / grades.length;
};

export class SsllabsServerReport implements GenericReport<SsllabsServerResult> {
  #analyzedUrl: string;
  #date: Date;
  #grade: string;
  #normalizedGrade: number;
  #result: SsllabsServerResult;
  #resultUrl: string | undefined;
  #service: Service;
  #inputs: Pick<ValidatedAnalysisInput, "config" | "threshold">;

  constructor({
    analyzedUrl,
    date,
    result,
    resultUrl,
    service,
    inputs,
  }: ReportArguments<SsllabsServerResult>) {
    this.#analyzedUrl = analyzedUrl;
    this.#date = date;
    this.#result = result;
    this.#resultUrl = resultUrl;
    this.#service = service;
    this.#inputs = inputs;

    this.#normalizedGrade = computeEndpoints(this.#result.endpoints);
    this.#grade = this.#normalizedGrade.toString();
  }

  get analyzedUrl(): string {
    return this.#analyzedUrl;
  }

  get date(): Date {
    return this.#date;
  }

  get grade(): string {
    return this.#grade;
  }

  get normalizedGrade(): number {
    return this.#normalizedGrade;
  }

  get result(): SsllabsServerResult {
    return this.#result;
  }

  get resultUrl(): string | undefined {
    return this.#resultUrl;
  }

  get service(): Service {
    return this.#service;
  }

  get inputs(): Pick<ValidatedAnalysisInput, "config" | "threshold"> {
    return this.#inputs;
  }

  displayGrade(): string {
    return this.normalizedGrade.toString() === this.grade
      ? `${this.grade}/100`
      : `${this.grade} (${this.normalizedGrade}/100)`;
  }

  isThresholdReached(): boolean | undefined {
    return this.inputs.threshold !== undefined
      ? this.normalizedGrade >= this.inputs.threshold
      : undefined;
  }
}
