import {
  Cascade,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from "npm:@mikro-orm/core";
import type Report from "../report/Report.ts";
import type { GenericReport } from "../report/Report.ts";
import { ServiceEntity } from "./ServiceEntity.ts";

@Entity({ tableName: "report" })
export class ReportEntity<Result> {
  @PrimaryKey()
  id!: number;

  @Property()
  analyzedUrl!: Report["analyzedUrl"];

  @Property()
  date!: Report["date"];

  @Property()
  grade!: Report["grade"];

  @Property()
  normalizedGrade!: Report["normalizedGrade"];

  @Property({ type: "json" })
  result!: Result;

  @Property()
  resultUrl?: Report["resultUrl"];

  @ManyToOne({ cascade: [Cascade.PERSIST] })
  service!: ServiceEntity;

  constructor(report: GenericReport<Result>) {
    this.analyzedUrl = report.analyzedUrl;
    this.date = report.date;
    this.grade = report.grade;
    this.normalizedGrade = report.normalizedGrade;
    this.result = report.result;
    this.resultUrl = report.resultUrl;
  }
}
