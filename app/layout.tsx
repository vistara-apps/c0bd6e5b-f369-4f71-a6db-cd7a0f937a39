import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TuneSphere - Discover, Share, and Monetize Music',
  description: 'A community-driven music platform on Base enabling enthusiasts and creators to discover, share, and monetize music through dynamic pricing and social interaction.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} gradient-bg min-h-screen`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
