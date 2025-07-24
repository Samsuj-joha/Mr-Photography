// src/app/admin/settings/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Save,
  Settings,
  Globe,
  Lock,
  Mail,
  Palette,
  Database,
  Shield,
  Bell,
  User,
  Camera,
  Eye
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import AdminPageLayout from '@/components/admin/AdminPageLayout'

interface SiteSettings {
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  address: string
  socialInstagram: string
  socialFacebook: string
  socialTwitter: string
  heroTitle: string
  heroSubtitle: string
  enableComments: boolean
  enableNewsletterSignup: boolean
  enableContactForm: boolean
  maintenanceMode: boolean
  seoTitle: string
  seoDescription: string
  seoKeywords: string
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'MR-PHOTOGRAPHY',
    siteDescription: 'Professional Photography Studio',
    contactEmail: 'info@mr-photography.com',
    contactPhone: '+1 (555) 123-4567',
    address: '123 Photography St, Creative City, CC 12345',
    socialInstagram: 'https://instagram.com/mrphotography',
    socialFacebook: 'https://facebook.com/mrphotography',
    socialTwitter: 'https://twitter.com/mrphotography',
    heroTitle: 'Capturing Life\'s Perfect Moments',
    heroSubtitle: 'Professional photography services for weddings, portraits, events, and more.',
    enableComments: true,
    enableNewsletterSignup: true,
    enableContactForm: true,
    maintenanceMode: false,
    seoTitle: 'MR-PHOTOGRAPHY | Professional Photography Services',
    seoDescription: 'Professional photography services for weddings, portraits, events, and more. Creating timeless memories with artistic vision.',
    seoKeywords: 'photography, wedding photographer, portrait photography, event photography'
  })
  
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('general')

  const handleSave = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      // Here you would make the actual API call to save settings
      console.log('Settings saved:', settings)
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof SiteSettings, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const stats = [
    {
      title: 'Active Features',
      value: Object.values(settings).filter(v => v === true).length,
      description: 'Enabled settings',
      icon: Settings,
      color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600'
    },
    {
      title: 'Site Status',
      value: settings.maintenanceMode ? 'Maintenance' : 'Live',
      description: 'Current status',
      icon: Globe,
      color: settings.maintenanceMode 
        ? 'bg-red-100 dark:bg-red-900/20 text-red-600'
        : 'bg-green-100 dark:bg-green-900/20 text-green-600'
    },
    {
      title: 'Security',
      value: 'Secure',
      description: 'SSL enabled',
      icon: Shield,
      color: 'bg-green-100 dark:bg-green-900/20 text-green-600'
    },
    {
      title: 'Notifications',
      value: '3 Active',
      description: 'Alert settings',
      icon: Bell,
      color: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600'
    }
  ]

  return (
    <AdminPageLayout
      title="Website Settings"
      description="Manage your website configuration and preferences"
      stats={stats}
      actions={
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
      }
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
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
                    onChange={(e) => handleInputChange('siteName', e.target.value)}
                    placeholder="Your site name"
                  />
                </div>
                <div>
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Input
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                    placeholder="Brief description"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="heroTitle">Homepage Hero Title</Label>
                <Input
                  id="heroTitle"
                  value={settings.heroTitle}
                  onChange={(e) => handleInputChange('heroTitle', e.target.value)}
                  placeholder="Main headline on homepage"
                />
              </div>
              
              <div>
                <Label htmlFor="heroSubtitle">Homepage Hero Subtitle</Label>
                <Textarea
                  id="heroSubtitle"
                  value={settings.heroSubtitle}
                  onChange={(e) => handleInputChange('heroSubtitle', e.target.value)}
                  placeholder="Subtitle or description"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Site Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenance">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Put site in maintenance mode for updates
                  </p>
                </div>
                <Switch
                  id="maintenance"
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleInputChange('maintenanceMode', checked)}
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
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    placeholder="contact@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Phone Number</Label>
                  <Input
                    id="contactPhone"
                    value={settings.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Business Address</Label>
                <Textarea
                  id="address"
                  value={settings.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Your business address"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Social Media Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="instagram">Instagram URL</Label>
                <Input
                  id="instagram"
                  value={settings.socialInstagram}
                  onChange={(e) => handleInputChange('socialInstagram', e.target.value)}
                  placeholder="https://instagram.com/username"
                />
              </div>
              
              <div>
                <Label htmlFor="facebook">Facebook URL</Label>
                <Input
                  id="facebook"
                  value={settings.socialFacebook}
                  onChange={(e) => handleInputChange('socialFacebook', e.target.value)}
                  placeholder="https://facebook.com/page"
                />
              </div>
              
              <div>
                <Label htmlFor="twitter">Twitter URL</Label>
                <Input
                  id="twitter"
                  value={settings.socialTwitter}
                  onChange={(e) => handleInputChange('socialTwitter', e.target.value)}
                  placeholder="https://twitter.com/username"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                SEO Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  value={settings.seoTitle}
                  onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                  placeholder="Page title for search engines"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended: 50-60 characters
                </p>
              </div>
              
              <div>
                <Label htmlFor="seoDescription">SEO Description</Label>
                <Textarea
                  id="seoDescription"
                  value={settings.seoDescription}
                  onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                  placeholder="Description for search engines"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended: 150-160 characters
                </p>
              </div>
              
              <div>
                <Label htmlFor="seoKeywords">SEO Keywords</Label>
                <Input
                  id="seoKeywords"
                  value={settings.seoKeywords}
                  onChange={(e) => handleInputChange('seoKeywords', e.target.value)}
                  placeholder="photography, wedding, portrait, event"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Separate keywords with commas
                </p>
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
                  <Label htmlFor="comments">Blog Comments</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow visitors to comment on blog posts
                  </p>
                </div>
                <Switch
                  id="comments"
                  checked={settings.enableComments}
                  onCheckedChange={(checked) => handleInputChange('enableComments', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="newsletter">Newsletter Signup</Label>
                  <p className="text-sm text-muted-foreground">
                    Show newsletter signup form
                  </p>
                </div>
                <Switch
                  id="newsletter"
                  checked={settings.enableNewsletterSignup}
                  onCheckedChange={(checked) => handleInputChange('enableNewsletterSignup', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="contactForm">Contact Form</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable contact form on contact page
                  </p>
                </div>
                <Switch
                  id="contactForm"
                  checked={settings.enableContactForm}
                  onCheckedChange={(checked) => handleInputChange('enableContactForm', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminPageLayout>
  )
}