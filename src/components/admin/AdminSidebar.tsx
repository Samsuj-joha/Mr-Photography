'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Image, 
  FileText, 
  Settings, 
  Users, 
  BarChart3,
  LogOut,
  Menu,
  X,
  Camera
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import Logo from '@/components/layout/Logo'

const sidebarItems = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
    description: 'Overview & Stats'
  },
  {
    name: 'Gallery',
    href: '/admin/gallery',
    icon: Image,
    description: 'Manage Photos'
  },
  {
    name: 'Blog',
    href: '/admin/blog',
    icon: FileText,
    description: 'Posts & Articles'
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    description: 'Website Stats'
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: Users,
    description: 'User Management'
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    description: 'Site Configuration'
  },
]

export default function AdminSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-background border-r border-border">
      {/* Logo Section */}
      <div className="flex items-center gap-3 p-6 border-b border-border">
        <Logo size="small" />
        <div className="flex flex-col">
          <h2 className="font-photography text-lg font-bold text-foreground">
            MR-PHOTOGRAPHY
          </h2>
          <p className="text-xs text-muted-foreground">Admin Panel</p>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-brand-accent text-brand-dark'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-brand-dark' : ''}`} />
                  <div className="flex flex-col">
                    <span className={`font-medium text-sm ${isActive ? 'text-brand-dark' : ''}`}>
                      {item.name}
                    </span>
                    <span className={`text-xs ${
                      isActive ? 'text-brand-dark/70' : 'text-muted-foreground'
                    }`}>
                      {item.description}
                    </span>
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Bottom Section - Logout */}
      <div className="p-4 border-t border-border">
        <Button
          onClick={handleSignOut}
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50 bg-background border border-border"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 z-40">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileOpen(false)}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed left-0 top-0 h-full w-64 z-50"
          >
            <SidebarContent />
          </motion.div>
        </>
      )}
    </>
  )
}