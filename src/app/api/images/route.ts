// src/app/api/images/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const images = await prisma.image.findMany({
      include: {
        gallery: {
          select: {
            id: true,
            title: true,
            category: true
          }
        }
      },
      orderBy: [
        { isFeatured: 'desc' },
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json({ images })
  } catch (error) {
    console.error('Images API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    )
  }
}