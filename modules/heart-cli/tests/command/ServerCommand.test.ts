import { ModuleServerInterface } from "@fabernovel/heart-core";
import { Command } from "commander";
import { Server } from "http";
import { assertStrictEquals } from "testing/asserts.ts";

import { ServerCommand } from "../../src/command/ServerCommand.ts";

Deno.test("Create a server command", () => {
  const program = new Command();
  const module: ModuleServerInterface = {
    id: "test-server",
    name: "Heart Test Server",
    service: {
      name: "Test Server",
    },
    startServer: () => new Server({ handler: () => new Response()}),
  };

  ServerCommand.create(program, module, () => {});

  assertStrictEquals(program.commands[0]._name, module.id);
  assertStrictEquals(program.commands[0].options.length, 1);
  assertStrictEquals(program.commands[0].options[0].short, "-p");
  assertStrictEquals(program.commands[0].options[0].long, "--port");
});
