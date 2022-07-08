import { ServiceInterface } from "../service/ServiceInterface.ts";

import { ReportInterface } from "./ReportInterface.ts";

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
  service: ServiceInterface;

  constructor(report: Partial<ReportInterface>) {
    Object.assign(this, report);

    this.normalizedNote = this.normalizedNote || parseInt(report.note, 10) || 0;
  }
}
