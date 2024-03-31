import { logger } from "@fabernovel/heart-common";
import dotenv from "npm:dotenv";
import { cwd, exit } from "node:process";
import { start } from "./command/cli/CliCommand.ts";

// assume that the root path is the one from where the script has been called
// /!\ this approach does not follow symlink
const CWD = cwd();

/**
 * Loads `.env` file contents into process.env.
 * Assume that the root path is the one from where the script has been called.
 * /!\ this approach does not follow symlink.
 */
dotenv.config({ path: `${CWD}/.env` });

void (async () => {
  try {
    await start(CWD);
  } catch (error) {
    logger.error(error);

    exit(1);
  }
})();
