import { ModuleServerInterface } from "@fabernovel/heart-core";
import { Command } from "commander";

const REGEX_PORT =
  /^(0|[1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/;

export class ServerCommand {
  /**
   * Create a command dedicated to the given server module
   */
  public static create(
    program: Command,
    module: ModuleServerInterface,
    callback: (port: number) => void,
  ): void {
    program
      .command(module.id)
      .description(`Starts the ${module.name} server`)
      .option(
        "-p, --port [port]",
        "Port that the server is listening to",
        REGEX_PORT,
        3000,
      )
      .action((cmd: Command) => callback(cmd.port));
  }
}
