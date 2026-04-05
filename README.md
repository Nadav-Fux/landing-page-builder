# Landing Page Builder

A modern, high-performance landing page builder built with Next.js 16, React 19, TypeScript, and Framer Motion.

## 🚀 Features

- **Modern Stack**: Built with Next.js 16, React 19, and TypeScript
- **Animations**: Smooth animations powered by Framer Motion
- **Optimized**: Webpack bundle optimization and code splitting
- **Testing**: Comprehensive testing with Jest and React Testing Library
- **Type Safety**: Full TypeScript support
- **Performance**: Optimized for fast loading and great user experience

## 📦 Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **UI**: React 19
- **Animation**: Framer Motion
- **Testing**: Jest + React Testing Library
- **Code Quality**: ESLint + Prettier
- **Bundle Analysis**: @next/bundle-analyzer

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd landing-page-builder
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run build:analyze` - Build and analyze bundle size

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run type-check` - Run TypeScript type checking

### Testing
- `npm test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run test:ci` - Run tests in CI mode

## 🏗️ Project Structure

```
landing-page-builder/
├── src/                    # Source code
│   ├── __tests__/         # Test files
│   └── app/               # Next.js app directory
├── public/                # Static assets
├── docs/                  # Documentation
├── .babelrc              # Babel configuration
├── .eslintrc.json        # ESLint configuration
├── jest.config.js        # Jest configuration
├── jest.setup.js         # Jest setup file
├── next.config.js        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Project metadata
```

## 🧪 Testing

The project uses Jest and React Testing Library for testing. Tests are located in the `src/__tests__` directory.

### Writing Tests

Example test structure:

```tsx
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Component Name', () => {
  test('renders correctly', () => {
    // Your test code here
  })
})
```

### Test Configuration

- Jest configuration: `jest.config.js`
- Test setup: `jest.setup.js`
- Coverage threshold: 70% for all metrics

## 🚀 Build Optimization

The project includes several build optimizations:

### Bundle Splitting
- Vendor chunks for node_modules
- Common chunks for shared code
- Dynamic imports for code splitting

### Image Optimization
- Next.js Image component with WebP/AVIF support
- Image domain whitelisting
- Cache optimization

### Performance Features
- SWC minification
- Tree shaking
- Compression enabled
- ETags disabled for better caching

## 📊 Bundle Analysis

To analyze your bundle size:

```bash
npm run build:analyze
```

This will open an interactive bundle analyzer in your browser.

## 🎨 Styling

The project supports:
- CSS Modules
- Styled JSX (built-in with Next.js)
- Global CSS
- CSS-in-JS libraries (can be added as needed)

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
ANALYZE=false
```

### TypeScript

TypeScript configuration is in `tsconfig.json` with:
- Strict mode enabled
- Path aliases configured (`@/` maps to `src/`)
- Next.js type support

## 📚 API Documentation

[API documentation will be added here]

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow ESLint rules
- Write tests for new features
- Keep documentation up to date

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Build fails with TypeScript errors**
   - Run `npm run type-check` to identify issues
   - Ensure all imports have proper type definitions

2. **Tests not passing**
   - Check Jest configuration in `jest.config.js`
   - Verify test setup in `jest.setup.js`

3. **Bundle size too large**
   - Run `npm run build:analyze` to identify large chunks
   - Check for unused dependencies

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

## 🗺️ Roadmap

- [ ] Add component library
- [ ] Implement visual builder
- [ ] Add template system
- [ ] Integrate CMS
- [ ] Add deployment pipeline
- [ ] Implement user authentication
- [ ] Add analytics integration