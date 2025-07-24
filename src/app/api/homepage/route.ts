// src/app/api/homepage/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get featured galleries
    const featuredGalleries = await prisma.gallery.findMany({
      where: {
        isActive: true,
        isFeatured: true
      },
      include: {
        images: {
          where: { isActive: true },
          take: 1,
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' },
      take: 6
    })

    // Get featured images for hero slider
    const heroImages = await prisma.image.findMany({
      where: {
        isActive: true,
        isFeatured: true
      },
      orderBy: { order: 'asc' },
      take: 5
    })

    // Get recent blog posts
    const recentPosts = await prisma.blogPost.findMany({
      where: {
        isPublished: true,
        status: 'PUBLISHED'
      },
      include: {
        author: {
          select: { name: true }
        },
        category: {
          select: { name: true, color: true }
        }
      },
      orderBy: { publishedAt: 'desc' },
      take: 3
    })

    // Get testimonials
    const testimonials = await prisma.testimonial.findMany({
      where: {
        isActive: true,
        isFeatured: true
      },
      orderBy: { createdAt: 'desc' },
      take: 6
    })

    // Get site settings
    const settings = await prisma.setting.findMany({
      where: {
        key: {
          in: [
            'site_title',
            'site_description', 
            'hero_title',
            'hero_subtitle',
            'contact_email',
            'contact_phone',
            'social_instagram',
            'social_facebook',
            'stats_photos_taken',
            'stats_happy_clients',
            'stats_years_experience',
            'stats_awards_won'
          ]
        }
      }
    })

    // Convert settings array to object
    const siteSettings = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value
      return acc
    }, {} as Record<string, string>)

    return NextResponse.json({
      heroImages,
      featuredGalleries,
      recentPosts,
      testimonials,
      settings: siteSettings,
      stats: {
        photosTaken: siteSettings.stats_photos_taken || '10K+',
        happyClients: siteSettings.stats_happy_clients || '500+',
        yearsExperience: siteSettings.stats_years_experience || '5+',
        awardsWon: siteSettings.stats_awards_won || '25+'
      }
    })

  } catch (error) {
    console.error('Homepage API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch homepage data' },
      { status: 500 }
    )
  }
}