'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'

interface LogoProps {
  size?: 'small' | 'medium' | 'large'
  showText?: boolean
  className?: string
}

export default function Logo({ 
  size = 'medium', 
  showText = false, 
  className = "" 
}: LogoProps) {
  const [logoError, setLogoError] = useState(false)

  // Size configurations
  const sizeConfigs = {
    small: {
      container: "w-6 h-6 sm:w-8 sm:h-8",
      image: "(max-width: 640px) 24px, 32px",
      icon: "h-4 w-4 sm:h-6 sm:w-6",
      text: "text-sm sm:text-base"
    },
    medium: {
      container: "w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16",
      image: "(max-width: 475px) 32px, (max-width: 640px) 40px, (max-width: 768px) 48px, (max-width: 1024px) 56px, 64px",
      icon: "h-6 w-6 xs:h-8 xs:w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14",
      text: "text-lg sm:text-xl lg:text-2xl xl:text-3xl"
    },
    large: {
      container: "w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24",
      image: "(max-width: 640px) 48px, (max-width: 768px) 64px, (max-width: 1024px) 80px, 96px",
      icon: "h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20",
      text: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
    }
  }

  const config = sizeConfigs[size]

  const logoVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } }
  }

  return (
    <Link href="/" className={`flex items-center group ${showText ? 'space-x-3' : ''} ${className}`}>
      <motion.div
        variants={logoVariants}
        whileHover="hover"
        whileTap="tap"
        className="flex items-center"
      >
        {/* Logo Image */}
        <div className={`relative ${config.container}`}>
          {!logoError ? (
            <Image
              src="/images/logo.png"
              alt="MR-PHOTOGRAPHY Logo"
              fill
              sizes={config.image}
              className="object-contain filter dark:brightness-0 dark:invert"
              priority={size === 'medium'} // Only prioritize medium size (header)
              quality={90}
              onError={() => setLogoError(true)}
            />
          ) : (
            <Camera className={`${config.icon} text-brand-accent`} />
          )}
        </div>
        
        {/* Optional Logo Text */}
        {showText && (
          <span className={`logo-text ${config.text} text-foreground group-hover:text-brand-accent transition-colors duration-200 font-bold tracking-wider`}>
            MR-PHOTOGRAPHY
          </span>
        )}
      </motion.div>
    </Link>
  )
}