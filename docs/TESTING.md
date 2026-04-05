# Testing Guide

This guide covers testing practices and conventions used in the Landing Page Builder project.

## 🧪 Test Framework

We use:
- **Jest** - Test runner
- **React Testing Library** - Component testing utilities
- **Jest DOM** - Custom DOM matchers
- **MSW** - API mocking (if needed)

## 📁 Test Structure

```
src/
├── __tests__/           # Global test files
│   ├── setup.ts        # Global test setup
│   └── utils.tsx       # Test utilities
└── components/         # Component files
    └── Component/
        ├── index.tsx
        └── Component.test.tsx  # Co-located tests
```

## 📝 Writing Tests

### Component Testing

```tsx
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  const user = userEvent.setup()

  test('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })

  test('handles user interaction', async () => {
    render(<MyComponent />)
    const button = screen.getByRole('button')

    await user.click(button)
    expect(screen.getByText('Clicked!')).toBeInTheDocument()
  })
})
```

### Hook Testing

```tsx
import { renderHook, act } from '@testing-library/react'
import { useCounter } from './useCounter'

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter())

  act(() => {
    result.current.increment()
  })

  expect(result.current.count).toBe(1)
})
```

### Async Testing

```tsx
test('loads data asynchronously', async () => {
  render(<DataComponent />)

  expect(screen.getByText('Loading...')).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument()
  })
})
```

## 🔧 Test Configuration

### jest.config.js

Main Jest configuration file:
- Test environment: jsdom
- Module path mapping: `@/` → `src/`
- Coverage collection from `src/**/*.{js,jsx,ts,tsx}`
- Coverage threshold: 70%

### jest.setup.js

Global test setup:
- Imports @testing-library/jest-dom
- Sets up Next.js mocks
- Configures IntersectionObserver and ResizeObserver mocks

## 📊 Coverage Reports

Generate coverage report:

```bash
npm run test:coverage
```

Coverage reports are generated in the `coverage/` directory.

### Coverage Thresholds

- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

## 🎯 Testing Best Practices

### 1. Test User Behavior, Not Implementation

```tsx
// Good
test('submits form when user clicks submit', async () => {
  render(<ContactForm />)
  await user.type(screen.getByLabelText('Name'), 'John')
  await user.click(screen.getByRole('button', { name: 'Submit' }))
  expect(screen.getByText('Success!')).toBeInTheDocument()
})

// Bad
test('calls handleSubmit with form data', () => {
  const handleSubmit = jest.fn()
  render(<ContactForm onSubmit={handleSubmit} />)
  // Testing internal implementation
})
```

### 2. Use Accessible Queries

```tsx
// Good
screen.getByRole('button', { name: 'Submit' })
screen.getByLabelText('Email address')
screen.getByPlaceholderText('Enter your name')

// Avoid if possible
screen.getByClassName('submit-button')
screen.getByTestId('submit-button')
```

### 3. Mock External Dependencies

```tsx
// Mock API calls
jest.mock('../api', () => ({
  fetchUser: jest.fn().mockResolvedValue({ id: 1, name: 'John' })
}))

// Mock components
jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn() })
}))
```

### 4. Clean Up After Tests

```tsx
afterEach(() => {
  jest.clearAllMocks()
  localStorage.clear()
})
```

## 🚨 Test Naming Conventions

### Test Descriptions
- Should be user-centric
- Describe the behavior, not the implementation
- Use "should" or "when" format

```tsx
// Good
test('should display error message when form is submitted with invalid data')

// OK
test('displays error message for invalid form submission')

// Avoid
test('submitHandler sets error state when validation fails')
```

### File Names
- Use `.test.tsx` or `.spec.tsx` extension
- Keep test files co-located with components
- Use same name as component file

## 🛠️ Debugging Tests

### 1. Using screen.debug()

```tsx
test('debugging example', () => {
  render(<MyComponent />)
  screen.debug() // Prints current DOM
})
```

### 2. Using logRoles

```tsx
import { logRoles } from '@testing-library/dom'

test('accessibility example', () => {
  const { container } = render(<MyComponent />)
  logRoles(container)
})
```

### 3. Running tests in debug mode

```bash
# Run with Node inspector
node --inspect-brk node_modules/.bin/jest --runInBand
```

## 📱 Testing Responsive Design

```tsx
import { render } from '@testing-library/react'

const resizeWindow = (width: number, height: number) => {
  window.innerWidth = width
  window.innerHeight = height
  window.dispatchEvent(new Event('resize'))
}

test('adapts layout on mobile', () => {
  render(<ResponsiveComponent />)

  // Desktop
  expect(screen.getByTestId('desktop-menu')).toBeInTheDocument()

  // Mobile
  resizeWindow(375, 667)
  expect(screen.getByTestId('mobile-menu')).toBeInTheDocument()
})
```

## 🔒 Testing Authentication

```tsx
const mockUser = { id: 1, email: 'test@example.com' }

jest.mock('../auth', () => ({
  useAuth: () => ({ user: mockUser, login: jest.fn(), logout: jest.fn() })
}))

test('displays user information when authenticated', () => {
  render(<ProfilePage />)
  expect(screen.getByText(mockUser.email)).toBeInTheDocument()
})
```

## 📝 Mocking Strategies

### 1. API Mocking with MSW

```bash
npm install --save-dev msw
```

```tsx
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json({ users: [] }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

### 2. Component Mocking

```tsx
// Mock entire component
jest.mock('../components/HeavyComponent', () => {
  return {
    HeavyComponent: () => <div>Mocked HeavyComponent</div>
  }
})
```

## 📋 Test Checklist

Before submitting a PR, ensure:

- [ ] All new components have tests
- [ ] Tests cover happy path and error cases
- [ ] Coverage thresholds are met
- [ ] Tests use accessible queries
- [ ] External dependencies are mocked
- [ ] Tests are deterministic (no randomness)
- [ ] Tests run independently

## 🚀 Performance Testing

```tsx
import { performance } from 'perf_hooks'

test('component renders within performance budget', () => {
  const start = performance.now()

  render(<ExpensiveComponent />)

  const end = performance.now()
  expect(end - start).toBeLessThan(100) // 100ms budget
})
```

## 🔗 Additional Resources

- [Testing Library Docs](https://testing-library.com/docs)
- [Jest Docs](https://jestjs.io/docs/getting-started)
- [React Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-testing-mistakes)