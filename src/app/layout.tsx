import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/components/language-provider'
import { SessionProvider } from '@/components/providers/SessionProvider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Landing Page Builder | AI-Powered Page Creation',
    template: '%s | Landing Page Builder'
  },
  description: 'Create stunning landing pages with AI-powered generation, intuitive visual editor, and professional templates. Build, customize, and deploy beautiful pages in minutes.',
  keywords: [
    'landing page builder',
    'AI website builder',
    'visual editor',
    'page templates',
    'website creator',
    'no-code builder',
    'responsive design',
    'landing page generator'
  ],
  authors: [{ name: 'Landing Page Builder Team' }],
  creator: 'Landing Page Builder',
  publisher: 'Landing Page Builder',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'he-IL': '/he',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'he_IL',
    url: '/',
    title: 'Landing Page Builder | AI-Powered Page Creation',
    description: 'Create stunning landing pages with AI-powered generation and intuitive visual editor.',
    siteName: 'Landing Page Builder',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Landing Page Builder - Create beautiful pages with AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Landing Page Builder | AI-Powered Page Creation',
    description: 'Create stunning landing pages with AI-powered generation and intuitive visual editor.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LanguageProvider>
              <div className="relative flex min-h-screen flex-col bg-background">
                <div className="flex-1">
                  {children}
                </div>
              </div>
              <Toaster />
            </LanguageProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}