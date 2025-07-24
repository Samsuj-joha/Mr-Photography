// src/components/admin/AdminGallery.tsx
'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  Search, 
  Filter, 
  Grid3X3, 
  Grid2X2, 
  List, 
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Download,
  Plus,
  X,
  ImageIcon,
  Calendar,
  User,
  Tag,
  Star,
  Heart,
  Share2,
  FolderPlus,
  SortAsc,
  SortDesc
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CldImage } from 'next-cloudinary'

// Sample data - replace with real API calls
const galleryImages = [
  {
    id: 1,
    title: 'Sunset Wedding Ceremony',
    category: 'Wedding',
    tags: ['wedding', 'sunset', 'ceremony'],
    uploadDate: '2024-07-20',
    size: '2.4 MB',
    dimensions: '1920x1080',
    photographer: 'MD Photography',
    likes: 24,
    views: 156,
    cloudinaryId: 'sample-wedding-1',
    featured: true
  },
  {
    id: 2,
    title: 'Corporate Headshot Session',
    category: 'Portrait',
    tags: ['portrait', 'corporate', 'professional'],
    uploadDate: '2024-07-19',
    size: '1.8 MB',
    dimensions: '1080x1350',
    photographer: 'MD Photography',
    likes: 12,
    views: 89,
    cloudinaryId: 'sample-portrait-1',
    featured: false
  },
  {
    id: 3,
    title: 'Product Photography - Luxury Watch',
    category: 'Product',
    tags: ['product', 'luxury', 'watch'],
    uploadDate: '2024-07-18',
    size: '3.1 MB',
    dimensions: '2048x2048',
    photographer: 'MD Photography',
    likes: 45,
    views: 234,
    cloudinaryId: 'sample-product-1',
    featured: true
  },
  {
    id: 4,
    title: 'Nature Landscape - Mountain Vista',
    category: 'Landscape',
    tags: ['landscape', 'nature', 'mountain'],
    uploadDate: '2024-07-17',
    size: '4.2 MB',
    dimensions: '2560x1440',
    photographer: 'MD Photography',
    likes: 67,
    views: 312,
    cloudinaryId: 'sample-landscape-1',
    featured: false
  },
  {
    id: 5,
    title: 'Birthday Party Celebration',
    category: 'Event',
    tags: ['event', 'birthday', 'celebration'],
    uploadDate: '2024-07-16',
    size: '2.1 MB',
    dimensions: '1920x1280',
    photographer: 'MD Photography',
    likes: 18,
    views: 145,
    cloudinaryId: 'sample-event-1',
    featured: false
  },
  {
    id: 6,
    title: 'Fashion Model Photoshoot',
    category: 'Fashion',
    tags: ['fashion', 'model', 'studio'],
    uploadDate: '2024-07-15',
    size: '2.8 MB',
    dimensions: '1080x1620',
    photographer: 'MD Photography',
    likes: 89,
    views: 423,
    cloudinaryId: 'sample-fashion-1',
    featured: true
  }
]

const categories = ['All', 'Wedding', 'Portrait', 'Product', 'Landscape', 'Event', 'Fashion']

type ViewMode = 'grid-large' | 'grid-small' | 'list'
type SortOption = 'newest' | 'oldest' | 'most-liked' | 'most-viewed' | 'alphabetical'

export default function AdminGallery() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid-large')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState<SortOption>('newest')
  const [selectedImages, setSelectedImages] = useState<number[]>([])
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Filter and sort images
  const filteredImages = galleryImages
    .filter(image => {
      const matchesCategory = selectedCategory === 'All' || image.category === selectedCategory
      const matchesSearch = searchQuery === '' || 
        image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        image.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
        case 'oldest':
          return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
        case 'most-liked':
          return b.likes - a.likes
        case 'most-viewed':
          return b.views - a.views
        case 'alphabetical':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  const handleImageSelect = (imageId: number) => {
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    )
  }

  const handleSelectAll = () => {
    if (selectedImages.length === filteredImages.length) {
      setSelectedImages([])
    } else {
      setSelectedImages(filteredImages.map(img => img.id))
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      console.log('Files selected:', files)
      // In real implementation, upload to Cloudinary and update state
    }
  }

  const getGridColumns = () => {
    switch (viewMode) {
      case 'grid-large':
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      case 'grid-small':
        return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
      default:
        return 'grid-cols-1'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gallery Management</h1>
          <p className="text-muted-foreground">
            Manage your photography portfolio and image collections
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {filteredImages.length} Images
          </Badge>
          {selectedImages.length > 0 && (
            <Badge variant="secondary">
              {selectedImages.length} Selected
            </Badge>
          )}
        </div>
      </div>

      {/* Action Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Left side - Upload and bulk actions */}
            <div className="flex flex-wrap items-center gap-2">
              <Button 
                onClick={handleUploadClick}
                className="bg-brand-accent hover:bg-brand-accent/90 text-brand-dark"
              >
                <Plus className="h-4 w-4 mr-2" />
                Upload Photos
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {selectedImages.length > 0 && (
                <>
                  <Button variant="outline" size="sm">
                    <FolderPlus className="h-4 w-4 mr-2" />
                    Add to Album
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete ({selectedImages.length})
                  </Button>
                </>
              )}
            </div>

            {/* Right side - View controls */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid-large' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid-large')}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid-small' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid-small')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search images by title or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-auto">
              <TabsList className="grid w-full grid-cols-7 lg:w-auto">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="text-xs px-3">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Sort */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[120px]">
                  <Filter className="h-4 w-4 mr-2" />
                  Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortOption('newest')}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Newest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption('oldest')}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Oldest First
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption('most-liked')}>
                  <Heart className="h-4 w-4 mr-2" />
                  Most Liked
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption('most-viewed')}>
                  <Eye className="h-4 w-4 mr-2" />
                  Most Viewed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption('alphabetical')}>
                  <SortAsc className="h-4 w-4 mr-2" />
                  Alphabetical
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedImages.length === filteredImages.length && filteredImages.length > 0}
                onChange={handleSelectAll}
                className="rounded"
              />
              <span className="text-sm text-muted-foreground">Select All</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Total: {galleryImages.length} images
            </div>
            <div className="text-sm text-muted-foreground">
              Featured: {galleryImages.filter(img => img.featured).length}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Gallery */}
      <div className={`grid gap-4 ${getGridColumns()}`}>
        <AnimatePresence>
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {viewMode === 'list' ? (
                // List View
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selectedImages.includes(image.id)}
                        onChange={() => handleImageSelect(image.id)}
                        className="rounded"
                      />
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                        <CldImage
                          src={image.cloudinaryId}
                          alt={image.title}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate">{image.title}</h3>
                        <p className="text-sm text-muted-foreground">{image.category}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span>{image.uploadDate}</span>
                          <span>{image.size}</span>
                          <span>{image.dimensions}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {image.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {image.views}
                        </div>
                        {image.featured && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedImage(image)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                // Grid View
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="relative">
                    <div className={`aspect-square overflow-hidden rounded-t-lg bg-muted ${
                      viewMode === 'grid-large' ? 'h-64' : 'h-40'
                    }`}>
                      <CldImage
                        src={image.cloudinaryId}
                        alt={image.title}
                        width={viewMode === 'grid-large' ? 400 : 200}
                        height={viewMode === 'grid-large' ? 400 : 200}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        crop="fill"
                        gravity="auto"
                      />
                      
                      {/* Overlay with actions */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setSelectedImage(image)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Selection checkbox */}
                      <div className="absolute top-2 left-2">
                        <input
                          type="checkbox"
                          checked={selectedImages.includes(image.id)}
                          onChange={() => handleImageSelect(image.id)}
                          className="rounded"
                        />
                      </div>

                      {/* Featured badge */}
                      {image.featured && (
                        <div className="absolute top-2 right-2">
                          <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        </div>
                      )}

                      {/* Category badge */}
                      <div className="absolute bottom-2 left-2">
                        <Badge variant="secondary" className="text-xs">
                          {image.category}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-3">
                      <h3 className="font-medium text-foreground truncate mb-1">
                        {image.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{image.uploadDate}</span>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {image.likes}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {image.views}
                          </div>
                        </div>
                      </div>
                      {viewMode === 'grid-large' && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {image.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </div>
                </Card>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Image Detail Modal */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedImage.title}</DialogTitle>
              <DialogDescription>
                Image details and metadata
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Image */}
              <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                <CldImage
                  src={selectedImage.cloudinaryId}
                  alt={selectedImage.title}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                  crop="fill"
                  gravity="auto"
                />
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Image Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <Badge>{selectedImage.category}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Upload Date:</span>
                      <span>{selectedImage.uploadDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">File Size:</span>
                      <span>{selectedImage.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dimensions:</span>
                      <span>{selectedImage.dimensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Photographer:</span>
                      <span>{selectedImage.photographer}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">Engagement</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Views:</span>
                      <span>{selectedImage.views}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Likes:</span>
                      <span>{selectedImage.likes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Featured:</span>
                      <span>{selectedImage.featured ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-foreground mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedImage.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No images found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || selectedCategory !== 'All' 
              ? 'Try adjusting your search or filter criteria'
              : 'Start by uploading your first photos to the gallery'
            }
          </p>
          <Button onClick={handleUploadClick} className="bg-brand-accent hover:bg-brand-accent/90 text-brand-dark">
            <Plus className="h-4 w-4 mr-2" />
            Upload Photos
          </Button>
        </motion.div>
      )}
    </div>
  )
}