'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { 
  Search, 
  Menu, 
  Sun, 
  Moon, 
  X,
  ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { navigationItems } from './Navbar'

interface MobileMenuProps {
  className?: string
}

export default function MobileMenu({ className = "" }: MobileMenuProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  // Check if nav item is active
  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  // Toggle expanded dropdown in mobile menu
  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    )
  }

  // Close mobile menu when navigating
  const handleNavigation = () => {
    setIsMobileMenuOpen(false)
    setExpandedItems([])
  }

  return (
    <div className={`lg:hidden flex items-center space-x-1 sm:space-x-2 ${className}`}>
      {/* Mobile Search */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Search" 
            className="w-8 h-8 sm:w-10 sm:h-10"
          >
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[90vw] max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearch} className="flex space-x-2">
            <Input
              placeholder="Search photos, blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 text-sm"
              autoFocus
            />
            <Button type="submit" size="icon" aria-label="Submit search" className="shrink-0">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Mobile Theme Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        className="w-8 h-8 sm:w-10 sm:h-10"
      >
        {theme === 'light' ? (
          <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
        ) : (
          <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
        )}
      </Button>

      {/* Mobile Menu Trigger */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Open menu" 
            className="w-8 h-8 sm:w-10 sm:h-10"
          >
            <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent 
          side="right" 
          className="w-[280px] sm:w-[320px] bg-background/95 backdrop-blur-md"
        >
          <SheetHeader className="mb-6">
            <SheetTitle className="text-left font-photography text-lg">
              Menu
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col space-y-2">
            {navigationItems.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <div className="space-y-1">
                    {/* Dropdown trigger */}
                    <button
                      onClick={() => toggleExpanded(item.name)}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-md transition-colors text-base ${
                        isActiveRoute(item.href)
                          ? 'text-brand-accent bg-brand-accent/10'
                          : 'text-foreground hover:text-brand-accent hover:bg-brand-accent/5'
                      }`}
                    >
                      <span>{item.name}</span>
                      <motion.div
                        animate={{ 
                          rotate: expandedItems.includes(item.name) ? 180 : 0 
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.div>
                    </button>
                    
                    {/* Dropdown content */}
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: expandedItems.includes(item.name) ? 'auto' : 0,
                        opacity: expandedItems.includes(item.name) ? 1 : 0
                      }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 space-y-1 py-1">
                        {item.subItems?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={handleNavigation}
                            className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                              isActiveRoute(subItem.href)
                                ? 'text-brand-accent bg-brand-accent/10'
                                : 'text-muted-foreground hover:text-brand-accent hover:bg-brand-accent/5'
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={handleNavigation}
                    className={`block px-3 py-3 rounded-md transition-colors text-base ${
                      isActiveRoute(item.href)
                        ? 'text-brand-accent bg-brand-accent/10'
                        : 'text-foreground hover:text-brand-accent hover:bg-brand-accent/5'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Footer */}
          <div className="absolute bottom-6 left-4 right-4">
            <div className="border-t border-border pt-4">
              <p className="text-xs text-muted-foreground text-center">
                © 2024 MR-PHOTOGRAPHY
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}