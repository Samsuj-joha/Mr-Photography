'use client'

import { motion } from 'framer-motion'
import { useHomepageData } from '@/hooks/useHomepageData'
import ImageSlider from '@/components/home/ImageSlider'

export default function Home() {
  const { data, loading } = useHomepageData()

  return (
    <div className="min-h-screen">
      {/* Hero Section with Dynamic Image Slider */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Dynamic Image Slider - Full Width */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full"
            >
              <ImageSlider 
                images={data?.heroImages || []}
                autoSlide={true}
                slideInterval={5000}
                showControls={true}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}