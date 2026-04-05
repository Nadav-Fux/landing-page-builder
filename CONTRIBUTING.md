# Contributing to Landing Page Builder

Thank you for your interest in contributing! This guide will help you get started.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/landing-page-builder.git
   cd landing-page-builder
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## 📋 Development Workflow

### 1. Create an Issue

Before starting work:
- Check if the feature/bug has an existing issue
- Create a new issue describing your proposed changes
- Get feedback from maintainers

### 2. Code Standards

#### TypeScript
- Use TypeScript for all new code
- Define types for all props and returns
- Avoid `any` type when possible
- Use interfaces for object shapes

```tsx
// Good
interface ButtonProps {
  children: React.ReactNode
  variant: 'primary' | 'secondary'
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ children, variant, onClick }) => {
  return <button onClick={onClick}>{children}</button>
}

// Bad
const Button = (props: any) => {
  return <button onClick={props.onClick}>{props.children}</button>
}
```

#### Component Structure
```
components/
└── ComponentName/
    ├── index.ts          # Export barrel
    ├── ComponentName.tsx # Main component
    ├── ComponentName.module.css # Styles
    ├── ComponentName.test.tsx   # Tests
    └── types.ts          # Type definitions
```

#### File Naming
- Use PascalCase for components: `MyComponent.tsx`
- Use camelCase for utilities: `formatDate.ts`
- Use kebab-case for files with multiple words: `user-profile.tsx`

#### Code Style
```tsx
// Use functional components with hooks
import React, { useState, useEffect } from 'react'

export const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue)

  useEffect(() => {
    // Side effects
  }, [dependencies])

  return (
    <div className={styles.container}>
      {/* JSX */}
    </div>
  )
}
```

### 3. Testing Requirements

All new features must include:
- Unit tests for functions
- Component tests for UI
- Integration tests for complex flows

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  test('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })

  test('handles user interaction', async () => {
    const user = userEvent.setup()
    render(<MyComponent />)

    await user.click(screen.getByRole('button'))
    expect(screen.getByText('Clicked!')).toBeInTheDocument()
  })
})
```

### 4. Commit Guidelines

Use conventional commits:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting (no code change)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Build process or dependency changes

Examples:
```
feat(components): add new button component
fix(api): resolve authentication issue
docs(readme): update installation instructions
```

### 5. Pull Request Process

1. Update documentation
2. Run tests:
   ```bash
   npm run test
   npm run lint
   npm run type-check
   ```
3. Update README.md if needed
4. Open a pull request with:
   - Clear title and description
   - Link to related issue
   - Screenshots for UI changes
   - Testing instructions

## 🎯 Types of Contributions

### Bug Reports
- Use the bug report template
- Include steps to reproduce
- Provide environment details
- Add screenshots if applicable

### Feature Requests
- Use the feature request template
- Describe the use case
- Suggest implementation ideas
- Consider API design

### Documentation
- Fix typos and grammar
- Improve explanations
- Add code examples
- Update guides

### Code Contributions
- Review open issues
- Fix bugs
- Implement features
- Improve performance

## 🔍 Code Review Process

### Reviewer Checklist
- [ ] Code follows style guidelines
- [ ] Tests are included and passing
- [ ] Types are properly defined
- [ ] Documentation is updated
- [ ] Performance considerations
- [ ] Security implications
- [ ] Accessibility concerns

### Author Checklist
- [ ] Self-reviewed code
- [ ] Tests pass locally
- [ ] Linter passes
- [ ] Build completes successfully
- [ ] Documentation updated

## 🛠️ Development Tools

### Recommended VS Code Extensions
- TypeScript Importer
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Auto Rename Tag

### Git Hooks
Install husky for pre-commit hooks:
```bash
npm install --save-dev husky
npx husky install
npx husky add .husky/pre-commit "npm run test && npm run lint"
```

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Testing Library](https://testing-library.com/docs)

### Style Guides
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)

### Best Practices
- [React Performance](https://kentcdodds.com/blog/react-performance)
- [TypeScript Best Practices](https://typescript-eslint.io/rules)

## 🤝 Community

### Code of Conduct
Be respectful, inclusive, and constructive. We're here to learn and build together.

### Getting Help
- Open an issue for questions
- Join our discussions
- Check existing documentation

## 📋 Templates

### Bug Report Template
```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- OS: [e.g. Windows 10, macOS 12.0]
- Browser: [e.g. Chrome, Firefox]
- Version: [e.g. 22.0.0]

## Additional Context
Add any other context
```

### Feature Request Template
```markdown
## Feature Description
Brief description of the feature

## Problem Statement
What problem does this solve?

## Proposed Solution
How should this work?

## Alternatives Considered
What other approaches did you consider?

## Additional Context
Add any other context
```

## 🚀 Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create release tag
4. Deploy to production

Thank you for contributing! 🎉