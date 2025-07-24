// src/hooks/useHomepageData.ts
'use client'

import { useState, useEffect } from 'react'

export interface HomepageData {
  heroImages: Array<{
    id: string
    title?: string
    description?: string
    url: string
    cloudinaryId?: string
  }>
  featuredGalleries: Array<{
    id: string
    title: string
    description?: string
    category: string
    images: Array<{
      id: string
      url: string
      title?: string
    }>
  }>
  recentPosts: Array<{
    id: string
    title: string
    excerpt?: string
    slug: string
    featuredImage?: string
    publishedAt: string
    author?: { name?: string }
    category?: { name?: string; color?: string }
  }>
  testimonials: Array<{
    id: string
    name: string
    company?: string
    content: string
    rating: number
    image?: string
  }>
  settings: Record<string, string>
  stats: {
    photosTaken: string
    happyClients: string
    yearsExperience: string
    awardsWon: string
  }
}

export function useHomepageData() {
  const [data, setData] = useState<HomepageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetch('/api/homepage')
        
        if (!response.ok) {
          throw new Error('Failed to fetch homepage data')
        }
        
        const result = await response.json()
        setData(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Homepage data fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error, refetch: () => fetchData() }
}