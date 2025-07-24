// src/components/admin/ImageUploader.tsx
'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  CheckCircle, 
  AlertCircle,
  Star,
  Eye
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

interface UploadFile extends File {
  preview?: string
  id?: string
}

interface ImageUploaderProps {
  onUploadComplete?: (images: any[]) => void
  galleryId?: string | null
  maxFiles?: number
  className?: string
}

export default function ImageUploader({ 
  onUploadComplete,
  galleryId = null,
  maxFiles = 20,
  className = ""
}: ImageUploaderProps) {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadResults, setUploadResults] = useState<any[]>([])
  const [isFeatured, setIsFeatured] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const [isDragActive, setIsDragActive] = useState(false)

  // Handle file selection
  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    const newFiles = Array.from(selectedFiles).map(file => {
      if (file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024) {
        const fileWithPreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
          id: Math.random().toString(36).substr(2, 9)
        })
        return fileWithPreview
      }
      return null
    }).filter(Boolean) as UploadFile[]

    setFiles(prev => [...prev, ...newFiles].slice(0, maxFiles))
  }

  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    
    const droppedFiles = e.dataTransfer.files
    handleFileSelect(droppedFiles)
  }

  // Remove file from list
  const removeFile = (fileId: string) => {
    setFiles(prev => {
      const updated = prev.filter(f => f.id !== fileId)
      // Revoke preview URL to prevent memory leaks
      const removedFile = prev.find(f => f.id === fileId)
      if (removedFile?.preview) {
        URL.revokeObjectURL(removedFile.preview)
      }
      return updated
    })
  }

  // Upload files
  const handleUpload = async () => {
    if (files.length === 0) return

    setUploading(true)
    setUploadProgress(0)
    setUploadResults([])

    try {
      const formData = new FormData()
      
      files.forEach(file => {
        formData.append('files', file)
      })
      
      if (galleryId) {
        formData.append('galleryId', galleryId)
      }
      
      formData.append('isFeatured', isFeatured.toString())
      formData.append('isActive', isActive.toString())

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev < 90) return prev + 10
          return prev
        })
      }, 200)

      const response = await fetch('/api/images/upload', {
        method: 'POST',
        body: formData
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()
      setUploadResults(result.results)

      const successCount = result.results.filter((r: any) => r.success).length

      // Clear successful uploads
      const failedFiles = files.filter((_, index) => !result.results[index]?.success)
      setFiles(failedFiles)

      // Call completion callback
      if (onUploadComplete) {
        const uploadedImages = result.results
          .filter((r: any) => r.success)
          .map((r: any) => r.image)
        onUploadComplete(uploadedImages)
      }

    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  // Clear all files
  const clearFiles = () => {
    files.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview)
      }
    })
    setFiles([])
    setUploadResults([])
  }

  return (
    <div className={`space-y-6 ${className}`}>
      
      {/* Upload Settings */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={isFeatured}
                onCheckedChange={setIsFeatured}
              />
              <Label htmlFor="featured" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Featured (Homepage Slider)
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <Label htmlFor="active" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Active (Visible)
              </Label>
            </div>
          </div>
          
          {isFeatured && (
            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                ⭐ Featured images will appear in the homepage slider
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dropzone */}
      <Card>
        <CardContent className="p-6">
          <div
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              isDragActive 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => {
              const input = document.createElement('input')
              input.type = 'file'
              input.multiple = true
              input.accept = 'image/*'
              input.onchange = (e) => {
                const target = e.target as HTMLInputElement
                handleFileSelect(target.files)
              }
              input.click()
            }}
          >
            <motion.div
              animate={{ 
                scale: isDragActive ? 1.05 : 1,
                opacity: isDragActive ? 0.8 : 1 
              }}
              transition={{ duration: 0.2 }}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              
              {isDragActive ? (
                <p className="text-lg font-medium text-blue-600">
                  Drop images here...
                </p>
              ) : (
                <div>
                  <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Drag & drop images here
                  </p>
                  <p className="text-gray-500 mb-4">
                    or click to browse files
                  </p>
                  <Button variant="outline" type="button">
                    Select Images
                  </Button>
                </div>
              )}
              
              <div className="mt-4 text-xs text-gray-500">
                <p>Supports: JPG, PNG, WebP, GIF</p>
                <p>Max size: 10MB per file</p>
                <p>Max files: {maxFiles}</p>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* File Preview List */}
      {files.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Selected Images ({files.length})
              </h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearFiles}
                disabled={uploading}
              >
                Clear All
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
              <AnimatePresence>
                {files.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative group"
                  >
                    <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                      {file.preview && (
                        <Image
                          src={file.preview}
                          alt={file.name}
                          fill
                          className="object-cover"
                        />
                      )}
                      
                      {/* Remove button */}
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                        onClick={() => removeFile(file.id!)}
                        disabled={uploading}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <p className="text-xs text-gray-600 mt-1 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(1)} MB
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Upload Progress */}
            {uploading && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Uploading...</span>
                  <span className="text-sm text-gray-500">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {/* Upload Results */}
            {uploadResults.length > 0 && (
              <div className="mb-4 space-y-2">
                {uploadResults.map((result, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 p-2 rounded text-sm ${
                      result.success 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {result.success ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <span>
                      {result.success 
                        ? `✅ ${result.image?.title || 'Image'} uploaded successfully`
                        : `❌ ${result.filename || 'Upload'} failed: ${result.error}`
                      }
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Button */}
            <Button 
              onClick={handleUpload}
              disabled={uploading || files.length === 0}
              className="w-full"
              size="lg"
            >
              {uploading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Uploading {files.length} images...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload {files.length} Images
                  {isFeatured && <Star className="h-4 w-4 ml-2" />}
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}