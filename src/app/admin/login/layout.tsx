import type { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import SessionProvider from '@/components/admin/SessionProvider'

export default function AdminLoginLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}