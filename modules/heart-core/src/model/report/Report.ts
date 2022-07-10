import { ServiceInterface } from "../service/ServiceInterface.ts";

import { ReportInterface } from "./ReportInterface.ts";

type ReportArgs = Omit<ReportInterface, 'normalizedNote'> & Partial<Pick<ReportInterface, 'normalizedNote'>>

/**
 * Define an analysis report that is shared between every Heart module.
 *
 * /!\ WARNING /!\
 * Be very careful if you change the Report class structure, as it could have an impact on every Heart module.
 */
export class Report implements ReportInterface {
  analyzedUrl: string;
  date: Date;
  note: string;
  normalizedNote: number;
  resultUrl?: string;
  service?: ServiceInterface;

  constructor(report: ReportArgs) {
    this.analyzedUrl = report.analyzedUrl;
    this.date = report.date;
    this.note = report.note;
    this.normalizedNote = report.normalizedNote || parseInt(report.note, 10) || 0;
    this.resultUrl = report.resultUrl;
    this.service = report.service;
  }
}
