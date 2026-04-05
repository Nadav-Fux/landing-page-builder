import React from 'react'

function isClientSide(): boolean {
  return typeof window !== 'undefined'
}

type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface ErrorContext {
  [key: string]: any
}

interface ErrorInfo {
  error: Error
  context?: ErrorContext
  tags?: { [key: string]: string }
}

class ErrorTracker {
  private static instance: ErrorTracker
  private isDevelopment: boolean

  private constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development'
  }

  static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker()
    }
    return ErrorTracker.instance
  }

  private isClientSide(): boolean {
    return typeof window !== 'undefined'
  }

  /**
   * Track an error with optional context
   */
  trackError(errorInfo: ErrorInfo): void {
    const { error, context, tags } = errorInfo

    if (this.isDevelopment) {
      console.group('🔴 Error Tracked')
      console.error('Error:', error)
      if (context) console.log('Context:', context)
      if (tags) console.log('Tags:', tags)
      console.groupEnd()
      return
    }

    // In production, send to error tracking service
    // Example implementation with Sentry
    // if (window.Sentry) {
    //   window.Sentry.captureException(error, {
    //     contexts: { custom: context },
    //     tags,
    //   })
    // }

    // Fallback: Store in localStorage for debugging
    try {
      if (!this.isClientSide()) return

      const errorLog = JSON.parse(localStorage.getItem('errorLog') || '[]')
      errorLog.push({
        message: error.message,
        stack: error.stack,
        context,
        tags,
        timestamp: new Date().toISOString(),
        url: this.isClientSide() ? window.location.href : 'SSR',
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'SSR',
      })

      // Keep only last 50 errors
      if (errorLog.length > 50) errorLog.shift()

      localStorage.setItem('errorLog', JSON.stringify(errorLog))
    } catch (e) {
      console.warn('Failed to store error in localStorage:', e)
    }
  }

  /**
   * Log a message with a specific level
   */
  log(message: string, level: LogLevel = 'info', context?: ErrorContext): void {
    if (this.isDevelopment) {
      const logMethod = {
        info: console.info,
        warn: console.warn,
        error: console.error,
        debug: console.debug,
      }[level]

      logMethod(`[${level.toUpperCase()}] ${message}`, context || '')
    }

    // In production, send to logging service
    // Example: Send to LogRocket, Datadog, etc.
  }

  /**
   * Track user interactions for debugging
   */
  trackUserAction(action: string, context?: ErrorContext): void {
    if (this.isDevelopment) {
      console.log(`👤 User Action: ${action}`, context || '')
    }

    // Store user actions for debugging
    try {
      if (!this.isClientSide()) return

      const actionLog = JSON.parse(localStorage.getItem('actionLog') || '[]')
      actionLog.push({
        action,
        context,
        timestamp: new Date().toISOString(),
        url: this.isClientSide() ? window.location.href : 'SSR',
      })

      // Keep only last 100 actions
      if (actionLog.length > 100) actionLog.shift()

      localStorage.setItem('actionLog', JSON.stringify(actionLog))
    } catch (e) {
      console.warn('Failed to store action in localStorage:', e)
    }
  }

  /**
   * Get stored error logs
   */
  getErrorLogs(): any[] {
    if (!this.isClientSide()) return []

    try {
      return JSON.parse(localStorage.getItem('errorLog') || '[]')
    } catch {
      return []
    }
  }

  getActionLogs(): any[] {
    if (!this.isClientSide()) return []

    try {
      return JSON.parse(localStorage.getItem('actionLog') || '[]')
    } catch {
      return []
    }
  }

  clearLogs(): void {
    if (!this.isClientSide()) return

    localStorage.removeItem('errorLog')
    localStorage.removeItem('actionLog')
  }

  /**
   * Export logs for debugging
   */
  exportLogs(): string {
    const logs = {
      errors: this.getErrorLogs(),
      actions: this.getActionLogs(),
      exportedAt: new Date().toISOString(),
    }
    return JSON.stringify(logs, null, 2)
  }

  /**
   * Set user context for all future error reports
   */
  setUser(user: { id: string; email?: string; [key: string]: any }): void {
    // In production, set user in error tracking service
    // if (window.Sentry) {
    //   window.Sentry.setUser(user)
    // }

    this.log('User context set', 'info', user)
  }

  /**
   * Clear user context
   */
  clearUser(): void {
    // if (window.Sentry) {
    //   window.Sentry.setUser(null)
    // }

    this.log('User context cleared', 'info')
  }

  /**
   * Create a breadcrumb for debugging
   */
  addBreadcrumb(message: string, category: string = 'user'): void {
    // In production, add breadcrumb to error tracking service
    // if (window.Sentry) {
    //   window.Sentry.addBreadcrumb({
    //     message,
    //     category,
    //     level,
    //   })
    // }

    if (this.isDevelopment) {
      console.log(`🍞 Breadcrumb [${category}]: ${message}`)
    }
  }
}

// Export singleton instance
export const errorTracker = ErrorTracker.getInstance()

// Export convenience functions
export const trackError = (error: Error, context?: ErrorContext, tags?: { [key: string]: string }) => {
  const errorInfo: any = { error }
  if (context) errorInfo.context = context
  if (tags) errorInfo.tags = tags
  errorTracker.trackError(errorInfo)
}

export const logInfo = (message: string, context?: ErrorContext) => {
  errorTracker.log(message, 'info', context)
}

export const logError = (message: string, context?: ErrorContext) => {
  errorTracker.log(message, 'error', context)
}

export const logWarning = (message: string, context?: ErrorContext) => {
  errorTracker.log(message, 'warn', context)
}

export const trackUserAction = (action: string, context?: ErrorContext) => {
  errorTracker.trackUserAction(action, context)
}

// React hook for error tracking
export const useErrorTracking = () => {
  React.useEffect(() => {
    if (!isClientSide()) return

    trackUserAction('page_view', {
      path: window.location.pathname,
      search: window.location.search,
    })

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      trackError(new Error(event.reason), {
        type: 'unhandledPromiseRejection',
      })
    }

    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  return {
    trackError,
    logInfo,
    logError,
    logWarning,
    trackUserAction,
  }
}

export default errorTracker
export { ErrorTracker }