import React, { useState, useEffect } from 'react'
import { errorTracker } from '../utils/errorTracking'

interface LogEntry {
  timestamp: string
  message: string
  level: string
  context?: any
  error?: string
  action?: string
  url?: string
}

export const DebugPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [logs, setLogs] = useState<{ errors: LogEntry[]; actions: LogEntry[] }>({
    errors: [],
    actions: [],
  })
  const [activeTab, setActiveTab] = useState<'errors' | 'actions'>('errors')

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const updateLogs = () => {
        setLogs({
          errors: errorTracker.getErrorLogs(),
          actions: errorTracker.getActionLogs(),
        })
      }

      updateLogs()
      const interval = setInterval(updateLogs, 1000)

      return () => clearInterval(interval)
    }
    return undefined
  }, [])

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const handleExport = () => {
    const data = errorTracker.exportLogs()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `debug-logs-${new Date().toISOString()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleClear = () => {
    errorTracker.clearLogs()
    setLogs({ errors: [], actions: [] })
  }

  const activeLogs = activeTab === 'errors' ? logs.errors : logs.actions

  return (
    <div style={styles.container}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          ...styles.toggleButton,
          backgroundColor: isOpen ? '#dc3545' : '#28a745',
        }}
      >
        {isOpen ? 'Close' : 'Open'} Debug Panel
      </button>

      {isOpen && (
        <div style={styles.panel}>
          <div style={styles.header}>
            <h3 style={styles.title}>Debug Panel</h3>
            <div style={styles.buttons}>
              <button onClick={handleExport} style={styles.exportButton}>
                Export Logs
              </button>
              <button onClick={handleClear} style={styles.clearButton}>
                Clear Logs
              </button>
            </div>
          </div>

          <div style={styles.tabs}>
            <button
              onClick={() => setActiveTab('errors')}
              style={{
                ...styles.tab,
                ...(activeTab === 'errors' ? styles.activeTab : {}),
              }}
            >
              Errors ({logs.errors.length})
            </button>
            <button
              onClick={() => setActiveTab('actions')}
              style={{
                ...styles.tab,
                ...(activeTab === 'actions' ? styles.activeTab : {}),
              }}
            >
              Actions ({logs.actions.length})
            </button>
          </div>

          <div style={styles.logContainer}>
            {activeLogs.length === 0 ? (
              <p style={styles.noLogs}>No {activeTab} logged yet</p>
            ) : (
              activeLogs.map((log, index) => (
                <div key={index} style={styles.logEntry}>
                  <div style={styles.logHeader}>
                    <span style={styles.timestamp}>
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    <span style={styles.url}>
                      {log.url?.replace(window.location.origin, '')}
                    </span>
                  </div>

                  {activeTab === 'errors' ? (
                    <>
                      <div style={styles.errorMessage}>
                        {log.error || log.message}
                      </div>
                      {log.context && (
                        <details style={styles.details}>
                          <summary style={styles.summary}>Context</summary>
                          <pre style={styles.pre}>
                            {JSON.stringify(log.context, null, 2)}
                          </pre>
                        </details>
                      )}
                    </>
                  ) : (
                    <>
                      <div style={styles.actionName}>
                        Action: {log.action}
                      </div>
                      {log.context && (
                        <pre style={styles.pre}>
                          {JSON.stringify(log.context, null, 2)}
                        </pre>
                      )}
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'fixed' as const,
    bottom: '20px',
    right: '20px',
    zIndex: 9999,
  },
  toggleButton: {
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  },
  panel: {
    position: 'fixed' as const,
    bottom: '60px',
    right: '20px',
    width: '600px',
    height: '400px',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    flexDirection: 'column' as const,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid #ddd',
  },
  title: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 'bold',
  },
  buttons: {
    display: 'flex',
    gap: '8px',
  },
  exportButton: {
    padding: '6px 12px',
    fontSize: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
  clearButton: {
    padding: '6px 12px',
    fontSize: '12px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid #ddd',
  },
  tab: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#f8f9fa',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
  },
  activeTab: {
    backgroundColor: 'white',
    borderBottom: '2px solid #007bff',
  },
  logContainer: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '8px',
  },
  noLogs: {
    textAlign: 'center',
    color: '#6c757d',
    marginTop: '20px',
  },
  logEntry: {
    marginBottom: '12px',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    fontSize: '12px',
  },
  logHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '6px',
    color: '#6c757d',
  },
  timestamp: {
    fontWeight: 'bold',
  },
  url: {
    fontSize: '11px',
  },
  errorMessage: {
    color: '#dc3545',
    fontFamily: 'monospace',
    marginBottom: '6px',
  },
  actionName: {
    color: '#28a745',
    fontFamily: 'monospace',
    marginBottom: '6px',
  },
  details: {
    marginTop: '6px',
  },
  summary: {
    cursor: 'pointer',
    color: '#007bff',
    fontSize: '11px',
  },
  pre: {
    margin: '4px 0 0 0',
    padding: '6px',
    backgroundColor: 'white',
    fontSize: '10px',
    overflow: 'auto',
    maxHeight: '100px',
  },
}

export default DebugPanel