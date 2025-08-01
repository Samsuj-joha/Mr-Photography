import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import SessionProvider from '@/components/admin/SessionProvider'
import ConditionalLayout from '@/components/layout/ConditionalLayout'
import './globals.css'

export const metadata: Metadata = {
  title: 'MR-PHOTOGRAPHY | Professional Photography Portfolio',
  description: 'Professional Photography Portfolio - Capturing moments with artistic excellence',
  keywords: 'photography, portfolio, professional photographer, wedding photography, portrait photography',
  authors: [{ name: 'MR-PHOTOGRAPHY' }],
  openGraph: {
    title: 'MR-PHOTOGRAPHY',
    description: 'Professional Photography Portfolio',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-modern antialiased">
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}