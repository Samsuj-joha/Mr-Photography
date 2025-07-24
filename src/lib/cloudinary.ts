// src/lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

// Upload image to Cloudinary
export async function uploadToCloudinary(
  file: File,
  folder: string = 'mr-photography'
): Promise<{
  url: string
  publicId: string
  width: number
  height: number
  format: string
  bytes: number
}> {
  try {
    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64 = buffer.toString('base64')
    const dataURI = `data:${file.type};base64,${base64}`

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder,
      resource_type: 'auto',
      transformation: [
        { quality: 'auto', fetch_format: 'auto' },
        { width: 2000, height: 2000, crop: 'limit' }
      ]
    })

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw new Error('Failed to upload image to Cloudinary')
  }
}

// Delete image from Cloudinary
export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return result.result === 'ok'
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    return false
  }
}

// Get optimized image URL
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: string
    format?: string
    crop?: string
  } = {}
): string {
  const {
    width = 'auto',
    height = 'auto', 
    quality = 'auto',
    format = 'auto',
    crop = 'fill'
  } = options

  return cloudinary.url(publicId, {
    width,
    height,
    quality,
    format,
    crop,
    secure: true
  })
}