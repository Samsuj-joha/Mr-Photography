'use client'

import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Single Image */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Main Image Container - Full Width */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full"
            >
              {/* Featured Image - Full Container Width */}
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-brand-accent/20 to-brand-accent/40">
                {/* Image Placeholder - Replace with actual image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 text-brand-accent/60 mx-auto mb-3 sm:mb-4" />
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-photography text-brand-accent/80">
                      MR-PHOTOGRAPHY
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">
                      Featured Photography
                    </p>
                  </div>
                </div>
                
                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-black/5 rounded-xl lg:rounded-2xl"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}