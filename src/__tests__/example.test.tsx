import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Simple test component
const TestComponent: React.FC = () => {
  return (
    <div data-testid="test-component">
      <h1>Landing Page Builder</h1>
      <p>Building amazing landing pages</p>
    </div>
  )
}

// Test suite
describe('Example Test Suite', () => {
  test('renders test component correctly', () => {
    render(<TestComponent />)

    expect(screen.getByTestId('test-component')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Landing Page Builder')
    expect(screen.getByText('Building amazing landing pages')).toBeInTheDocument()
  })

  test('basic math operations', () => {
    expect(2 + 2).toBe(4)
    expect(5 * 3).toBe(15)
  })

  test('async operations', async () => {
    const asyncFunction = async () => {
      return Promise.resolve('async result')
    }

    const result = await asyncFunction()
    expect(result).toBe('async result')
  })
})