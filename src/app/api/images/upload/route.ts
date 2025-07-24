// src/app/api/images/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const galleryId = formData.get('galleryId') as string | null
    const isFeatured = formData.get('isFeatured') === 'true'
    const isActive = formData.get('isActive') !== 'false' // Default to true

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    const uploadResults = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        continue // Skip non-image files
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        continue // Skip files larger than 10MB
      }

      try {
        // For now, we'll use a placeholder URL until Cloudinary is set up
        const imageUrl = `https://images.unsplash.com/photo-${Date.now()}?w=800&h=600&fit=crop`

        // Get the highest order number for new images
        const maxOrder = await prisma.image.findFirst({
          orderBy: { order: 'desc' },
          select: { order: true }
        })

        // Save to database
        const image = await prisma.image.create({
          data: {
            title: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension
            description: null,
            url: imageUrl,
            cloudinaryId: null, // Will be set when Cloudinary is configured
            width: 800,
            height: 600,
            size: file.size,
            format: file.type.split('/')[1],
            isActive,
            isFeatured,
            order: (maxOrder?.order || 0) + i + 1,
            tags: [],
            galleryId: galleryId || null
          }
        })

        uploadResults.push({
          success: true,
          image: {
            id: image.id,
            title: image.title,
            url: image.url,
            width: image.width,
            height: image.height,
            isFeatured: image.isFeatured
          }
        })

      } catch (uploadError) {
        console.error('Upload error for file:', file.name, uploadError)
        uploadResults.push({
          success: false,
          filename: file.name,
          error: 'Upload failed'
        })
      }
    }

    return NextResponse.json({
      message: `Uploaded ${uploadResults.filter(r => r.success).length} of ${files.length} images`,
      results: uploadResults
    })

  } catch (error) {
    console.error('Upload API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}