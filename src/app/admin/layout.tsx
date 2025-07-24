// src/app/admin/layout.tsx
'use client'

import { usePathname } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Don't apply admin layout to login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Mock user for development (replace with real session later)
  const mockUser = {
    id: 'dev-user',
    name: 'Admin User',
    email: 'admin@mrphotography.com',
    image: null,
    role: 'ADMIN'
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            <AdminSidebar />
          </div>
        </aside>

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <AdminHeader user={mockUser} />
          
          {/* Page content */}
          <main className="flex-1 overflow-y-auto bg-muted/30 p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}