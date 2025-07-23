'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Check if we're on admin routes
  const isAdminRoute = pathname.startsWith('/admin')
  
  // If admin route, don't show header/footer
  if (isAdminRoute) {
    return <>{children}</>
  }
  
  // Regular layout with header/footer for main website
  return (
    <>
      <Header />
      <main className="pt-14 sm:pt-16 lg:pt-20">
        {children}
      </main>
      <Footer />
    </>
  )
}