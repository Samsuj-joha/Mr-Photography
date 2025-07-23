'use client'

import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ThemeToggleProps {
  className?: string
  iconSize?: 'small' | 'medium' | 'large'
  showLabel?: boolean
}

export default function ThemeToggle({ 
  className = "", 
  iconSize = 'medium',
  showLabel = false 
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()

  // Icon size configurations
  const iconSizes = {
    small: "h-3 w-3",
    medium: "h-4 w-4 xl:h-5 xl:w-5",
    large: "h-5 w-5"
  }

  const buttonSizes = {
    small: "w-6 h-6",
    medium: "w-8 h-8 xl:w-10 xl:h-10", 
    large: "w-10 h-10"
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const iconVariants = {
    initial: { scale: 0.8, rotate: -90 },
    animate: { scale: 1, rotate: 0 },
    exit: { scale: 0.8, rotate: 90 }
  }

  return (
    <Button
      variant="ghost"
      size={showLabel ? "sm" : "icon"}
      onClick={toggleTheme}
      className={`hover:text-brand-accent transition-colors ${!showLabel ? buttonSizes[iconSize] : ''} ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        key={theme}
        variants={iconVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.2 }}
        className="flex items-center"
      >
        {theme === 'light' ? (
          <Moon className={iconSizes[iconSize]} />
        ) : (
          <Sun className={iconSizes[iconSize]} />
        )}
      </motion.div>
      
      {showLabel && (
        <span className="ml-2 text-sm">
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </span>
      )}
    </Button>
  )
}