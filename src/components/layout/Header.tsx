'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import Navbar from './Navbar'
import MobileMenu from './MobileMenu'
import SearchDialog from './SearchDialog'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle scroll effect with throttling for performance
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animation variants
  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  }

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          
          {/* Logo Section - Left Side */}
          <Logo size="medium" />

          {/* Desktop Navigation - Right Side */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <Navbar />
            <SearchDialog iconSize="medium" className="ml-1 xl:ml-2" />
            <ThemeToggle iconSize="medium" className="ml-1 xl:ml-2" />
          </div>

          {/* Mobile Navigation - Right Side */}
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  )
}