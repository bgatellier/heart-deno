import {
  AnalysisEvents,
  isModuleListener,
  ModuleAnalysisInterface,
  ModuleInterface,
  ModuleListenerInterface,
  ModuleServerInterface,
} from "@fabernovel/heart-core";
import { EventEmitter } from "events";

export class App {
  private eventEmitter: EventEmitter;
  private modules: ModuleInterface[];

  constructor(modules: ModuleInterface[]) {
    this.eventEmitter = new EventEmitter();
    this.modules = modules;
    this.registerEventsListeners();
  }

  public async startAnalysis(
    module: ModuleAnalysisInterface,
    conf: object,
  ): Promise<void> {
    try {
      const report = await module.startAnalysis(conf);

      // print analyse result
      const reportName = report.service ? `[${report.service.name}] ` : "";
      let message = `${reportName}${report.analyzedUrl}: ${report.note}`;

      if (report.resultUrl) {
        message += `, view full report: ${report.resultUrl}`;
      }

      console.log(message);

      this.eventEmitter.emit(AnalysisEvents.DONE, report);

      // /!\ do not exit the process at this point,
      //     because it could stop the execution of the event handlers
    } catch (error) {
      console.error(error);
      Deno.exit(1);
    }
  }

  public startServer(
    module: ModuleServerInterface,
    modules: ModuleInterface[],
    port: number,
  ): void {
    module
      .startServer(modules, port)
      .on("listening", () => console.log(`Server listening on port ${port}`))
      .on("error", (error: Error) => {
        console.error(error.message);
        Deno.exit(1);
      });
  }

  /**
   * Register events listeners for listening modules
   */
  private registerEventsListeners(): void {
    this.modules
      .filter((module: ModuleInterface): module is ModuleListenerInterface =>
        isModuleListener(module)
      )
      .forEach((module: ModuleListenerInterface) =>
        module.registerEvents(this.eventEmitter)
      );
  }
}
