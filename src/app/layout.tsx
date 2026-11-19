import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/auth-context'
import { Toaster } from '@/components/ui/toaster'
import { AuthCookieProvider } from '@/components/providers/auth-cookie-provider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Professor Mohammed Dauda | FNSE, FNIMechE',
    template: '%s | Prof. Mohammed Dauda',
  },
  description:
    'Official website of Professor Mohammed Dauda, FNSE, FNIMechE — Professor of Mechanical Engineering (Materials) at the University of Maiduguri, Director of ASR-ICiE, and Coordinator of the UNDP-supported UniPod.',
  keywords: [
    'Professor Mohammed Dauda', 'mechanical engineering', 'FNSE', 'FNIMechE',
    'ASR-ICiE', 'UniPod', 'UNDP', 'NASENI', 'AMTDI', 'CEED',
    'University of Maiduguri', 'engineering Nigeria',
    'manufacturing technology', 'entrepreneurship', 'green composites',
  ],
  authors: [{ name: 'Professor Mohammed Dauda' }],
  creator: 'Prof. Mohammed Dauda',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Professor Mohammed Dauda',
    title: 'Professor Mohammed Dauda | FNSE, FNIMechE',
    description:
      'Professor of Mechanical Engineering (Materials) at the University of Maiduguri — researcher, innovation leader and mentor.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professor Mohammed Dauda | FNSE, FNIMechE',
    description:
      'Professor of Mechanical Engineering (Materials) at the University of Maiduguri — researcher, innovation leader and mentor.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <AuthProvider>
          <AuthCookieProvider>
            {children}
          </AuthCookieProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
