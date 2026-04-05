import { errorTracker, trackError, trackUserAction } from '../utils/errorTracking'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('Error Tracking', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.clear()
    Object.defineProperty(process.env, 'NODE_ENV', { value: 'test', writable: true })
  })

  describe('trackError', () => {
    it('should track error with context and tags', () => {
      const error = new Error('Test error')
      const context = { userId: '123' }
      const tags = { feature: 'auth' }

      trackError(error, context, tags)

      const errorLogs = errorTracker.getErrorLogs()
      expect(errorLogs).toHaveLength(1)
      expect(errorLogs[0]).toMatchObject({
        message: 'Test error',
        context,
        tags,
        stack: expect.any(String),
      })
      expect(errorLogs[0].timestamp).toBeDefined()
    })

    it('should handle errors without context', () => {
      const error = new Error('Simple error')

      trackError(error)

      const errorLogs = errorTracker.getErrorLogs()
      expect(errorLogs).toHaveLength(1)
      expect(errorLogs[0]).toMatchObject({
        message: 'Simple error',
        stack: expect.any(String),
      })
    })
  })

  describe('trackUserAction', () => {
    it('should track user actions', () => {
      trackUserAction('button_click', { buttonId: 'submit' })

      const actionLogs = errorTracker.getActionLogs()
      expect(actionLogs).toHaveLength(1)
      expect(actionLogs[0]).toMatchObject({
        action: 'button_click',
        context: { buttonId: 'submit' },
        timestamp: expect.any(String),
      })
    })
  })

  describe('clearLogs', () => {
    it('should clear all logs', () => {
      trackError(new Error('Test error'))
      trackUserAction('test action')

      expect(errorTracker.getErrorLogs()).toHaveLength(1)
      expect(errorTracker.getActionLogs()).toHaveLength(1)

      errorTracker.clearLogs()

      expect(errorTracker.getErrorLogs()).toHaveLength(0)
      expect(errorTracker.getActionLogs()).toHaveLength(0)
    })
  })

  describe('exportLogs', () => {
    it('should export logs as JSON', () => {
      trackError(new Error('Test error'))
      trackUserAction('test action')

      const exported = errorTracker.exportLogs()
      const parsed = JSON.parse(exported)

      expect(parsed).toMatchObject({
        errors: expect.arrayContaining([
          expect.objectContaining({
            message: 'Test error',
          }),
        ]),
        actions: expect.arrayContaining([
          expect.objectContaining({
            action: 'test action',
          }),
        ]),
        exportedAt: expect.any(String),
      })
    })
  })
})