import { createDatabaseConfig } from "@fabernovel/heart-common";
import { defineConfig, MySqlDriver } from "npm:@mikro-orm/mysql";
import { env } from "node:process";
import { Migration20230702150637 } from "../migrations/Migration20230702150637.ts";

export default defineConfig(
  createDatabaseConfig<MySqlDriver>({
    clientUrl: env.HEART_MYSQL_DATABASE_URL ?? "",
    migrations: {
      migrationsList: [
        {
          name: "Migration20230702150637",
          class: Migration20230702150637,
        },
      ],
    },
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }),
);
