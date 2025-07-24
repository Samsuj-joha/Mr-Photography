// src/app/admin/layout.tsx
import { ReactNode } from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'
import SessionProvider from '@/components/admin/SessionProvider'
import { ThemeProvider } from 'next-themes'

// Remove viewport from metadata - move to viewport export
export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession(authOptions)

  // Check if user is authenticated and has admin role
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/admin/login')
  }

  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen bg-background">
          {/* Sidebar */}
          <AdminSidebar />
          
          {/* Main Content */}
          <div className="lg:pl-64">
            {/* Header */}
            <AdminHeader user={session.user} />
            
            {/* Page Content */}
            <main className="p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </div>
        </div>
      </ThemeProvider>
    </SessionProvider>
  )
}