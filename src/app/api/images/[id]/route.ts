// src/app/api/images/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { deleteFromCloudinary } from '@/lib/cloudinary'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id } = params

    const updatedImage = await prisma.image.update({
      where: { id },
      data: body,
      include: {
        gallery: {
          select: {
            id: true,
            title: true,
            category: true
          }
        }
      }
    })

    return NextResponse.json({ image: updatedImage })
  } catch (error) {
    console.error('Update image error:', error)
    return NextResponse.json(
      { error: 'Failed to update image' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params

    // Get image details before deletion
    const image = await prisma.image.findUnique({
      where: { id },
      select: { cloudinaryId: true }
    })

    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    // Delete from database
    await prisma.image.delete({
      where: { id }
    })

    // Delete from Cloudinary if cloudinaryId exists
    if (image.cloudinaryId) {
      try {
        await deleteFromCloudinary(image.cloudinaryId)
      } catch (cloudinaryError) {
        console.error('Cloudinary deletion error:', cloudinaryError)
        // Don't fail the request if Cloudinary deletion fails
      }
    }

    return NextResponse.json({ message: 'Image deleted successfully' })
  } catch (error) {
    console.error('Delete image error:', error)
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}