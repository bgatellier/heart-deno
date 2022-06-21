import { ModuleServerInterface } from '@fabernovel/heart-core'
import { Command } from 'commander'
import { serve } from 'http'

import { ServerCommand } from '../../src/command/ServerCommand.ts'

test('Create a server command', () => {
  const program = new Command()
  const module: ModuleServerInterface = {
    id: 'test-server',
    name: 'Heart Test Server',
    service: {
      name: 'Test Server'
    },
    startServer: () => serve((_) => new Response())
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ServerCommand.create(program, module, () => {})

  expect(program.commands[0]._name).toBe(module.id)
  expect(program.commands[0].options.length).toBe(1)
  expect(program.commands[0].options[0].short).toBe('-p')
  expect(program.commands[0].options[0].long).toBe('--port')
})
