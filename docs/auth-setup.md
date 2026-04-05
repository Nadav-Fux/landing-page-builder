# NextAuth.js Authentication Setup

This document explains the authentication system setup for the Landing Page Builder.

## Overview

The authentication system is built using NextAuth.js with support for:
- Email/Password authentication
- Google OAuth
- GitHub OAuth
- JWT session strategy
- Protected routes via middleware

## File Structure

```
src/
├── lib/
│   ├── nextauth.ts          # NextAuth configuration
│   └── prisma.ts            # Prisma client (when using database)
├── app/
│   ├── api/auth/[...nextauth]/route.ts  # NextAuth API route
│   └── (auth)/
│       ├── layout.tsx       # Auth layout wrapper
│       ├── login/page.tsx   # Login page
│       └── register/page.tsx # Registration page
├── components/
│   └── providers/
│       └── SessionProvider.tsx  # Session context provider
├── types/
│   └── next-auth.d.ts       # NextAuth TypeScript definitions
└── middleware.ts            # Route protection middleware
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
# Required
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Database (Optional - for Prisma adapter)
DATABASE_URL=your-database-url
```

### Setting up OAuth Providers

#### Google
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

#### GitHub
1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

## Usage

### Session Provider

Wrap your app with the SessionProvider in your root layout:

```tsx
import { SessionProvider } from '@/components/providers/SessionProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
```

### Using Session in Components

```tsx
"use client"

import { useSession, signOut } from 'next-auth/react'

export function UserMenu() {
  const { data: session } = useSession()

  if (!session) {
    return <a href="/login">Sign In</a>
  }

  return (
    <div>
      Welcome, {session.user?.name}
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}
```

### Server-Side Session

```tsx
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/nextauth'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return <div>Dashboard</div>
}
```

### Protected API Routes

```tsx
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/nextauth'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({ data: 'Protected data' })
}
```

## Features

### Authentication Pages
- **Login**: `/login` - Email/password and OAuth sign-in
- **Register**: `/register` - User registration with validation
- **Error Handling**: Clear error messages for invalid credentials

### Protected Routes
All routes except `/`, `/login`, `/register`, and static files are protected by the middleware.

### Form Validation
- Zod schemas for form validation
- Client-side and server-side validation
- Password confirmation for registration

### Internationalization Ready
The auth pages are structured to support multiple languages (English/Hebrew).

## Security

- JWT secrets for session encryption
- CSRF protection via NextAuth
- Secure password hashing (bcrypt)
- OAuth provider validation
- Route protection middleware

## Production Considerations

1. Set `NEXTAUTH_URL` to your production domain
2. Use a secure `NEXTAUTH_SECRET` (generate with: `openssl rand -base64 32`)
3. Configure proper OAuth callback URLs
4. Set up database for user persistence
5. Enable HTTPS
6. Configure CORS if needed
7. Set up monitoring and logging

## Database Setup (Optional)

If using Prisma for user persistence:

1. Install Prisma: `npm install prisma @prisma/client`
2. Initialize Prisma: `npx prisma init`
3. Add the NextAuth schema to your `schema.prisma`
4. Run migrations: `npx prisma migrate dev`
5. Generate client: `npx prisma generate`

## Testing

Run the development server:

```bash
npm run dev
```

Visit `http://localhost:3000/login` to test authentication.

## Troubleshooting

### Common Issues

1. **"Invalid nextauth secret"**
   - Ensure `NEXTAUTH_SECRET` is set in `.env.local`

2. **OAuth redirects not working**
   - Check callback URLs in OAuth provider settings
   - Verify `NEXTAUTH_URL` matches your domain

3. **Middleware not protecting routes**
   - Ensure middleware is in project root
   - Check matcher configuration

4. **Session not persisting**
   - Clear browser cookies
   - Check browser console for errors