
import { ModuleAnalysisInterface, ModuleListenerInterface, Report } from '@fabernovel/heart-core'

import { App } from '../src/App.ts'


test('Register events from Listener modules', () => {
  const module: ModuleListenerInterface = {
    id: 'test-listener',
    name: 'Heart Test Listener',
    service: {
      name: 'Test Listener'
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    registerEvents: () => {}
  }

  const registerEventsMock = jest.spyOn(module, 'registerEvents')

  new App([module])

  expect(registerEventsMock).toHaveBeenCalled()

  registerEventsMock.mockRestore()
})

test('Displays the results of an analysis', async () => {
  const report = new Report({
    analyzedUrl: 'www.my-awesome-website',
    note: '50',
    normalizedNote: 50,
  })

  const module: ModuleAnalysisInterface = {
    id: 'test-analysis-tool',
    name: 'Heart Test Analysis Tool',
    service: {
      name: 'Test Analysis Tool'
    },
    startAnalysis: () => new Promise((resolve) => resolve(report))
  }

  const startAnalysisMock = jest.spyOn(module, 'startAnalysis')
  const consoleLogMock = jest.spyOn(global.console, 'log')

  const app = new App([module])
  await app.startAnalysis(module, {})

  expect(startAnalysisMock).toHaveBeenCalled()
  expect(consoleLogMock).toHaveBeenCalled()

  consoleLogMock.mockRestore()
  startAnalysisMock.mockRestore()
})
