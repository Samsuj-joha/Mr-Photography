'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Navigation items configuration
export const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Blog', href: '/blog' },
  { 
    name: 'Pages', 
    href: '/pages',
    hasDropdown: true,
    subItems: [
      { name: 'About', href: '/pages/about' },
      { name: 'Services', href: '/pages/services' },
      { name: 'Pricing', href: '/pages/pricing' },
    ]
  },
  { name: 'Features', href: '/features' },
  { name: 'Contact', href: '/contact' },
  { name: 'Buy', href: '/buy' },
]

interface NavbarProps {
  className?: string
}

export default function Navbar({ className = "" }: NavbarProps) {
  const pathname = usePathname()

  // Check if nav item is active
  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className={`hidden lg:flex items-center space-x-1 xl:space-x-2 ${className}`}>
      {navigationItems.map((item) => (
        <div key={item.name} className="relative">
          {item.hasDropdown ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`nav-link flex items-center space-x-1 text-sm xl:text-base px-2 xl:px-4 ${
                    isActiveRoute(item.href) ? 'text-brand-accent' : ''
                  }`}
                >
                  <span>{item.name}</span>
                  <ChevronDown className="h-3 w-3 xl:h-4 xl:w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start" 
                className="w-44 xl:w-48 bg-background/95 backdrop-blur-md border border-border"
              >
                {item.subItems?.map((subItem) => (
                  <DropdownMenuItem key={subItem.name} asChild>
                    <Link 
                      href={subItem.href}
                      className={`w-full px-3 py-2 text-sm hover:text-brand-accent transition-colors ${
                        isActiveRoute(subItem.href) ? 'text-brand-accent' : ''
                      }`}
                    >
                      {subItem.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={item.href}
                className={`nav-link text-sm xl:text-base px-2 xl:px-4 py-2 ${
                  isActiveRoute(item.href) 
                    ? 'text-brand-accent active' 
                    : 'text-foreground hover:text-brand-accent'
                }`}
              >
                {item.name}
              </Link>
            </motion.div>
          )}
        </div>
      ))}
    </nav>
  )
}