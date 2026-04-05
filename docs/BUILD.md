# Build & Deployment Guide

This guide covers the build process, optimization strategies, and deployment options for the Landing Page Builder.

## 🏗️ Build Process

### Development Build

```bash
npm run dev
```

Features:
- Fast refresh enabled
- Source maps included
- No minification
- Verbose error messages

### Production Build

```bash
npm run build
```

Optimizations:
- Code minification
- Tree shaking
- Bundle splitting
- Image optimization
- CSS optimization
- Compression

## 📊 Bundle Analysis

Analyze your bundle size:

```bash
npm run build:analyze
```

This opens an interactive bundle analyzer showing:
- Bundle size by module
- Dependencies
- Duplicate modules
- Largest chunks

## ⚡ Build Optimizations

### 1. Code Splitting

Automatic code splitting:
- Page-based splitting
- Dynamic imports
- Vendor chunks
- Common chunks

Example dynamic import:

```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(
  () => import('../components/HeavyComponent'),
  {
    loading: () => <p>Loading...</p>,
    ssr: false
  }
)
```

### 2. Image Optimization

```tsx
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={800}
  height={400}
  priority // Load immediately
  placeholder="blur" // Add blur placeholder
/>
```

### 3. Font Optimization

```tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
```

### 4. Bundle Size Optimization

#### Tree Shaking
- Use ES6 imports/exports
- Avoid importing entire libraries
- Use specific imports:

```tsx
// Good
import { Button } from 'antd'

// Avoid
import * as antd from 'antd'
```

#### Dynamic Imports
Load components/modules when needed:

```tsx
const loadModule = async () => {
  const { heavyFunction } = await import('../utils/heavy')
  heavyFunction()
}
```

## 🔧 Next.js Configuration

### next.config.js

Key optimizations enabled:

```javascript
const nextConfig = {
  // Experimental features
  experimental: {
    appDir: true,
    optimizeCss: true,
    optimizePackageImports: ['framer-motion'],
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400,
  },

  // Performance
  compress: true,
  poweredByHeader: false,
  swcMinify: true,

  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Bundle splitting
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    }
    return config
  },
}
```

## 🚀 Performance Budgets

### Recommended Limits

- JavaScript: < 250KB gzipped
- CSS: < 50KB gzipped
- Images: Optimized with WebP/AVIF
- Fonts: < 100KB gzipped

### Monitoring Performance

```bash
# Lighthouse CI integration
npm install -g @lhci/cli@0.12.x
lhci autorun
```

## 🌍 Environment Configuration

### Environment Variables

Create `.env.local` for local development:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
ANALYZE=false
NODE_ENV=production
```

### Production Variables

Set in your hosting platform:
- `NEXT_PUBLIC_API_URL` - API endpoint
- `NEXT_PUBLIC_ANALYTICS_ID` - Analytics tracking
- `NODE_ENV` - Set to 'production'

## 📦 Deployment Options

### 1. Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Vercel Configuration (vercel.json)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "functions": {
    "pages/api/**/*.js": {
      "runtime": "nodejs18.x"
    }
  }
}
```

### 2. Netlify

```bash
# Build command
npm run build

# Publish directory
.out
```

#### Netlify Configuration (netlify.toml)

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### 3. Docker

#### Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Build the application
FROM base AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### 4. Static Export

For static hosting (GitHub Pages, S3):

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}
```

```bash
npm run build
# Output in /out directory
```

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:ci

      - name: Run type check
        run: npm run type-check

      - name: Build application
        run: npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 📈 Performance Monitoring

### 1. Core Web Vitals

Track in your application:

```tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric) {
  // Send to your analytics service
  gtag('event', metric.name, {
    event_category: 'Web Vitals',
    event_label: metric.id,
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    non_interaction: true,
  })
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

### 2. Bundle Analysis in CI

```yaml
- name: Analyze bundle
  run: |
    npm run build:analyze
    npx bundlesize
```

#### bundlesize Configuration

```json
{
  "bundlesize": [
    {
      "path": ".next/static/chunks/pages/*.js",
      "maxSize": "250kb"
    },
    {
      "path": ".next/static/css/*.css",
      "maxSize": "50kb"
    }
  ]
}
```

## 🔒 Security Headers

Add security headers in `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
      ],
    },
  ]
}
```

## 🐛 Troubleshooting

### Common Build Issues

1. **Memory Error**
   ```bash
   export NODE_OPTIONS="--max-old-space-size=4096"
   ```

2. **Timeout in CI**
   ```yaml
   - name: Build
     run: npm run build
     timeout-minutes: 10
   ```

3. **Image Optimization Error**
   ```javascript
   // next.config.js
   images: {
     domains: ['example.com'],
     loader: 'custom',
     loaderFile: './my-image-loader.js',
   }
   ```

### Debug Mode

```bash
# Build with debug output
DEBUG=* npm run build

# Webpack bundle analyzer
npx webpack-bundle-analyzer .next/static/chunks/*.js
```

## 📚 Additional Resources

- [Next.js Production Checklist](https://nextjs.org/docs/going-to-production)
- [Web.dev Performance](https://web.dev/performance/)
- [Lighthouse Performance Audits](https://developer.chrome.com/docs/lighthouse/performance/)