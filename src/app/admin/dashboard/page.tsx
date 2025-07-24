// src/app/admin/dashboard/page.tsx
// Updated to use your existing AdminDashboard component with gallery integration

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Upload, 
  Image as ImageIcon, 
  Plus, 
  Search, 
  Grid3X3,
  List,
  Eye,
  Edit,
  Trash2,
  Star,
  MoreVertical
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
// import ImageUploader from '@/components/admin/ImageUploader'
import ImageUploader from '@/components/ImageUploader'
import Image from 'next/image'

// Import your existing AdminDashboard component
// import AdminDashboard from '@/components/admin/AdminDashboard'

interface ImageData {
  id: string
  title?: string
  description?: string
  url: string
  width?: number
  height?: number
  isFeatured: boolean
  isActive: boolean
  order: number
  createdAt: string
  gallery?: {
    id: string
    title: string
    category: string
  }
}

export default function DashboardPage() {
  const [images, setImages] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterFeatured, setFilterFeatured] = useState<boolean | null>(null)
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  // Fetch images
  const fetchImages = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/images')
      if (response.ok) {
        const data = await response.json()
        setImages(data.images || [])
      }
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  // Filter images based on search and featured status
  const filteredImages = images.filter(image => {
    const matchesSearch = !searchQuery || 
      image.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.gallery?.title.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFeatured = filterFeatured === null || image.isFeatured === filterFeatured
    
    return matchesSearch && matchesFeatured
  })

  // Handle upload completion
  const handleUploadComplete = (uploadedImages: any[]) => {
    setImages(prev => [...uploadedImages, ...prev])
    setUploadDialogOpen(false)
    fetchImages() // Refresh data
  }

  // Toggle featured status
  const toggleFeatured = async (imageId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/images/${imageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !currentStatus })
      })

      if (response.ok) {
        setImages(prev => prev.map(img => 
          img.id === imageId ? { ...img, isFeatured: !currentStatus } : img
        ))
      }
    } catch (error) {
      console.error('Failed to update image')
    }
  }

  // Delete image
  const deleteImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      const response = await fetch(`/api/images/${imageId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setImages(prev => prev.filter(img => img.id !== imageId))
      }
    } catch (error) {
      console.error('Failed to delete image')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your photography business from one place
          </p>
        </div>
        
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Images
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Upload New Images</DialogTitle>
            </DialogHeader>
            <ImageUploader onUploadComplete={handleUploadComplete} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dashboard">Dashboard Overview</TabsTrigger>
          <TabsTrigger value="gallery">Gallery Management</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab - Using your existing AdminDashboard component */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* <AdminDashboard /> */}
        </TabsContent>

        {/* Gallery Tab */}
        <TabsContent value="gallery" className="space-y-6">
          
          {/* Gallery Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <ImageIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{images.length}</p>
                    <p className="text-sm text-muted-foreground">Total Images</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                    <Star className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {images.filter(img => img.isFeatured).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Featured</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <Eye className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {images.filter(img => img.isActive).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <Upload className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {Math.round(images.reduce((acc, img) => acc + (img.width || 0) * (img.height || 0), 0) / 1000000)}M
                    </p>
                    <p className="text-sm text-muted-foreground">Total Pixels</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters & Search */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search images..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={filterFeatured === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterFeatured(null)}
                  >
                    All
                  </Button>
                  <Button
                    variant={filterFeatured === true ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterFeatured(true)}
                  >
                    <Star className="h-4 w-4 mr-1" />
                    Featured
                  </Button>
                  <Button
                    variant={filterFeatured === false ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterFeatured(false)}
                  >
                    Regular
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images Display */}
          <Card>
            <CardContent className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <p className="text-muted-foreground">Loading images...</p>
                  </div>
                </div>
              ) : filteredImages.length === 0 ? (
                <div className="text-center py-12">
                  <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No images found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery || filterFeatured !== null 
                      ? 'Try adjusting your search or filters'
                      : 'Upload your first images to get started'
                    }
                  </p>
                  <Button onClick={() => setUploadDialogOpen(true)}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Images
                  </Button>
                </div>
              ) : (
                <div className={
                  viewMode === 'grid' 
                    ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                    : "space-y-4"
                }>
                  {filteredImages.map((image, index) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={viewMode === 'grid' ? "group" : ""}
                    >
                      {viewMode === 'grid' ? (
                        /* Grid View */
                        <div className="relative">
                          <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={image.url}
                              alt={image.title || 'Image'}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                            
                            {/* Overlay with actions */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => toggleFeatured(image.id, image.isFeatured)}
                                >
                                  <Star className={`h-4 w-4 ${image.isFeatured ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                                </Button>
                                <Button size="sm" variant="secondary">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => deleteImage(image.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {/* Featured badge */}
                            {image.isFeatured && (
                              <div className="absolute top-2 left-2">
                                <Badge variant="secondary" className="bg-yellow-500 text-yellow-900">
                                  <Star className="h-3 w-3 mr-1" />
                                  Featured
                                </Badge>
                              </div>
                            )}

                            {/* Status badge */}
                            {!image.isActive && (
                              <div className="absolute top-2 right-2">
                                <Badge variant="destructive">
                                  Hidden
                                </Badge>
                              </div>
                            )}
                          </div>

                          {/* Image info */}
                          <div className="mt-2">
                            <p className="text-sm font-medium truncate">
                              {image.title || 'Untitled'}
                            </p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{image.width}×{image.height}</span>
                              {image.gallery && (
                                <Badge variant="outline" className="text-xs">
                                  {image.gallery.category}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* List View */
                        <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image
                              src={image.url}
                              alt={image.title || 'Image'}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium truncate">
                                {image.title || 'Untitled'}
                              </h3>
                              {image.isFeatured && (
                                <Badge variant="secondary" className="bg-yellow-500 text-yellow-900">
                                  <Star className="h-3 w-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                              {!image.isActive && (
                                <Badge variant="destructive">Hidden</Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{image.width}×{image.height}</span>
                              <span>{new Date(image.createdAt).toLocaleDateString()}</span>
                              {image.gallery && (
                                <Badge variant="outline">{image.gallery.category}</Badge>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleFeatured(image.id, image.isFeatured)}
                            >
                              <Star className={`h-4 w-4 ${image.isFeatured ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                            </Button>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => deleteImage(image.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}