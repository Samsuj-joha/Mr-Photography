// src/components/home/ImageSlider.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface SliderImage {
  id: string
  title?: string
  description?: string
  url: string
  cloudinaryId?: string
}

interface ImageSliderProps {
  images?: SliderImage[]
  autoSlide?: boolean
  slideInterval?: number
  showControls?: boolean
  className?: string
}

export default function ImageSlider({ 
  images = [], 
  autoSlide = true, 
  slideInterval = 5000,
  showControls = true,
  className = ""
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Auto-slide functionality
  useEffect(() => {
    if (autoSlide && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }, slideInterval)
      return () => clearInterval(interval)
    }
  }, [autoSlide, images.length, slideInterval])

  // Simulate loading
  useEffect(() => {
    if (images.length > 0) {
      setIsLoading(false)
    }
  }, [images])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Show placeholder if no images
  if (isLoading || images.length === 0) {
    return (
      <div className={`relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-brand-accent/20 to-brand-accent/40 ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Camera className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 text-brand-accent/60 mx-auto mb-3 sm:mb-4" />
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-photography text-brand-accent/80">
              MR-PHOTOGRAPHY
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">
              {isLoading ? 'Loading Images...' : 'Featured Photography'}
            </p>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/5 rounded-xl lg:rounded-2xl"></div>
      </div>
    )
  }

  return (
    <div className={`relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl group ${className}`}>
      
      {/* Image Container */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={images[currentIndex].url}
              alt={images[currentIndex].title || `Photography ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority={currentIndex === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10" />
            
            {/* Image Info Overlay */}
            {images[currentIndex].title && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute bottom-4 left-4 right-4 text-white"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-1">
                  {images[currentIndex].title}
                </h3>
                {images[currentIndex].description && (
                  <p className="text-sm sm:text-base text-white/80">
                    {images[currentIndex].description}
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      {showControls && images.length > 1 && (
        <>
          {/* Previous Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrev}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>

          {/* Next Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </>
      )}

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Loading Indicator */}
      {autoSlide && images.length > 1 && (
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10">
            <motion.div
              className="w-full h-full border-2 border-white/30 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, transparent, white)`,
                opacity: 0.7
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: slideInterval / 1000,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}