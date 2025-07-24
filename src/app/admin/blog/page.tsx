// src/app/admin/blog/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  FileText,
  Calendar,
  User,
  Tag
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'

// Mock blog posts data
const mockPosts = [
  {
    id: '1',
    title: '10 Tips for Perfect Wedding Photography',
    excerpt: 'Essential tips every wedding photographer should know to capture the perfect moments on the big day.',
    featuredImage: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop',
    status: 'PUBLISHED',
    publishedAt: '2024-01-15',
    category: { name: 'Wedding Photography', color: '#f59e0b' },
    author: { name: 'Admin User' },
    comments: 12
  },
  {
    id: '2',
    title: 'Behind the Scenes: Fashion Photography Shoot',
    excerpt: 'Go behind the scenes of our latest fashion photography shoot and see how we create stunning images.',
    featuredImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop',
    status: 'PUBLISHED',
    publishedAt: '2024-01-12',
    category: { name: 'Behind the Scenes', color: '#10b981' },
    author: { name: 'Admin User' },
    comments: 8
  },
  {
    id: '3',
    title: 'Essential Camera Settings for Portrait Photography',
    excerpt: 'Master these camera settings to take your portrait photography to the next level.',
    featuredImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop',
    status: 'DRAFT',
    publishedAt: null,
    category: { name: 'Photography Tips', color: '#3b82f6' },
    author: { name: 'Admin User' },
    comments: 0
  }
]

export default function BlogPage() {
  const [posts, setPosts] = useState(mockPosts)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">
            Create and manage your blog posts and articles
          </p>
        </div>
        <Button size="lg" className="gap-2">
          <Plus className="h-4 w-4" />
          Create Post
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{posts.length}</p>
                <p className="text-sm text-muted-foreground">Total Posts</p>
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
                <p className="text-2xl font-bold">{posts.filter(p => p.status === 'PUBLISHED').length}</p>
                <p className="text-sm text-muted-foreground">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <Edit className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{posts.filter(p => p.status === 'DRAFT').length}</p>
                <p className="text-sm text-muted-foreground">Drafts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <User className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{posts.reduce((acc, p) => acc + p.comments, 0)}</p>
                <p className="text-sm text-muted-foreground">Comments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Featured Image */}
                      {post.featuredImage && (
                        <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      {/* Post Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg hover:text-blue-600 cursor-pointer">
                              {post.title}
                            </h3>
                            <Badge 
                              variant={post.status === 'PUBLISHED' ? "default" : "secondary"}
                              className={post.status === 'PUBLISHED' ? "bg-green-500" : ""}
                            >
                              {post.status}
                            </Badge>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
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
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <p className="text-muted-foreground mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Tag className="h-4 w-4" />
                            <Badge 
                              variant="outline" 
                              style={{ color: post.category.color }}
                            >
                              {post.category.name}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {post.publishedAt 
                              ? new Date(post.publishedAt).toLocaleDateString()
                              : 'Not published'
                            }
                          </div>

                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {post.author.name}
                          </div>

                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {post.comments} comments
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// src/app/admin/analytics/page.tsx
'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const analyticsData = {
  totalViews: 24567,
  uniqueVisitors: 18432,
  pageViews: 31245,
  bounceRate: 34.5,
  topPages: [
    { page: '/portfolio', views: 8945, change: 12.5 },
    { page: '/gallery/wedding', views: 6732, change: 8.3 },
    { page: '/about', views: 4521, change: -2.1 },
    { page: '/services', views: 3890, change: 15.7 }
  ],
  deviceStats: {
    desktop: 52.3,
    mobile: 41.2,
    tablet: 6.5
  }
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Website Analytics</h1>
          <p className="text-muted-foreground">
            Track your website performance and visitor insights
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">7 Days</Button>
          <Button size="sm">30 Days</Button>
          <Button variant="outline" size="sm">90 Days</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Eye className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{analyticsData.totalViews.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{analyticsData.uniqueVisitors.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Unique Visitors</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                <MousePointer className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{analyticsData.bounceRate}%</p>
                <p className="text-sm text-muted-foreground">Bounce Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">2m 45s</p>
                <p className="text-sm text-muted-foreground">Avg. Session</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Pages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topPages.map((page, index) => (
                <div key={page.page} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{page.page}</p>
                    <p className="text-sm text-muted-foreground">
                      {page.views.toLocaleString()} views
                    </p>
                  </div>
                  <Badge 
                    variant={page.change > 0 ? "default" : "destructive"}
                    className={page.change > 0 ? "bg-green-500" : ""}
                  >
                    {page.change > 0 ? '+' : ''}{page.change}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Device Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-blue-600" />
                  <span>Desktop</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${analyticsData.deviceStats.desktop}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">
                    {analyticsData.deviceStats.desktop}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-green-600" />
                  <span>Mobile</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${analyticsData.deviceStats.mobile}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">
                    {analyticsData.deviceStats.mobile}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-purple-600" />
                  <span>Tablet</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${analyticsData.deviceStats.tablet}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">
                    {analyticsData.deviceStats.tablet}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// src/app/admin/settings/page.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Save,
  Settings,
  Globe,
  Mail,
  Camera,
  Eye
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'MR-PHOTOGRAPHY',
    siteDescription: 'Professional Photography Studio',
    contactEmail: 'info@mr-photography.com',
    contactPhone: '+1 (555) 123-4567',
    heroTitle: 'Capturing Life\'s Perfect Moments',
    heroSubtitle: 'Professional photography services for weddings, portraits, events, and more.',
    enableComments: true,
    enableContactForm: true,
    maintenanceMode: false
  })
  
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Website Settings</h1>
          <p className="text-muted-foreground">
            Manage your website configuration and preferences
          </p>
        </div>
        <Button onClick={handleSave} disabled={loading} size="lg" className="gap-2">
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save Changes
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Settings className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">6</p>
                <p className="text-sm text-muted-foreground">Active Features</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Globe className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">Live</p>
                <p className="text-sm text-muted-foreground">Site Status</p>
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
                <p className="text-2xl font-bold">Secure</p>
                <p className="text-sm text-muted-foreground">SSL Enabled</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <Mail className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Notifications</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Site Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Input
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="heroTitle">Homepage Hero Title</Label>
                <Input
                  id="heroTitle"
                  value={settings.heroTitle}
                  onChange={(e) => setSettings({...settings, heroTitle: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactEmail">Email Address</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Phone Number</Label>
                  <Input
                    id="contactPhone"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Feature Toggles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Blog Comments</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow visitors to comment on blog posts
                  </p>
                </div>
                <Switch
                  checked={settings.enableComments}
                  onCheckedChange={(checked) => setSettings({...settings, enableComments: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Contact Form</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable contact form on contact page
                  </p>
                </div>
                <Switch
                  checked={settings.enableContactForm}
                  onCheckedChange={(checked) => setSettings({...settings, enableContactForm: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Put site in maintenance mode for updates
                  </p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}