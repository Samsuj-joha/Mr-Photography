// src/app/admin/analytics/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  Calendar,
  Globe,
  Smartphone,
  Monitor,
  ArrowUp,
  ArrowDown
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AdminPageLayout from '@/components/admin/AdminPageLayout'

interface AnalyticsData {
  totalViews: number
  uniqueVisitors: number
  pageViews: number
  bounceRate: number
  avgSessionDuration: string
  topPages: Array<{
    page: string
    views: number
    change: number
  }>
  topCountries: Array<{
    country: string
    visitors: number
    percentage: number
  }>
  deviceStats: {
    desktop: number
    mobile: number
    tablet: number
  }
  trafficSources: Array<{
    source: string
    visitors: number
    percentage: number
  }>
}

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d')

  // Mock analytics data
  useEffect(() => {
    const mockData: AnalyticsData = {
      totalViews: 24567,
      uniqueVisitors: 18432,
      pageViews: 31245,
      bounceRate: 34.5,
      avgSessionDuration: '2m 45s',
      topPages: [
        { page: '/portfolio', views: 8945, change: 12.5 },
        { page: '/gallery/wedding', views: 6732, change: 8.3 },
        { page: '/about', views: 4521, change: -2.1 },
        { page: '/services', views: 3890, change: 15.7 },
        { page: '/blog/photography-tips', views: 2156, change: 22.4 }
      ],
      topCountries: [
        { country: 'United States', visitors: 8432, percentage: 45.8 },
        { country: 'United Kingdom', visitors: 3245, percentage: 17.6 },
        { country: 'Canada', visitors: 2156, percentage: 11.7 },
        { country: 'Australia', visitors: 1789, percentage: 9.7 },
        { country: 'Germany', visitors: 1234, percentage: 6.7 }
      ],
      deviceStats: {
        desktop: 52.3,
        mobile: 41.2,
        tablet: 6.5
      },
      trafficSources: [
        { source: 'Google Search', visitors: 9845, percentage: 53.4 },
        { source: 'Direct', visitors: 4321, percentage: 23.4 },
        { source: 'Social Media', visitors: 2156, percentage: 11.7 },
        { source: 'Referrals', visitors: 1234, percentage: 6.7 },
        { source: 'Email', visitors: 876, percentage: 4.8 }
      ]
    }

    setTimeout(() => {
      setAnalytics(mockData)
      setLoading(false)
    }, 1000)
  }, [timeRange])

  const stats = analytics ? [
    {
      title: 'Total Views',
      value: analytics.totalViews.toLocaleString(),
      description: 'Page views',
      icon: Eye,
      color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600'
    },
    {
      title: 'Unique Visitors',
      value: analytics.uniqueVisitors.toLocaleString(),
      description: 'Individual users',
      icon: Users,
      color: 'bg-green-100 dark:bg-green-900/20 text-green-600'
    },
    {
      title: 'Bounce Rate',
      value: `${analytics.bounceRate}%`,
      description: 'Single page visits',
      icon: MousePointer,
      color: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600'
    },
    {
      title: 'Avg. Session',
      value: analytics.avgSessionDuration,
      description: 'Time on site',
      icon: TrendingUp,
      color: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600'
    }
  ] : []

  return (
    <AdminPageLayout
      title="Website Analytics"
      description="Track your website performance and visitor insights"
      stats={stats}
      actions={
        <div className="flex gap-2">
          <Button 
            variant={timeRange === '7d' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('7d')}
          >
            7 Days
          </Button>
          <Button 
            variant={timeRange === '30d' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('30d')}
          >
            30 Days
          </Button>
          <Button 
            variant={timeRange === '90d' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('90d')}
          >
            90 Days
          </Button>
        </div>
      }
    >
      {loading ? (
        <Card>
          <CardContent className="p-12">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
                />
                <p className="text-muted-foreground">Loading analytics...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="acquisition">Acquisition</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
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
                    {analytics?.topPages.map((page, index) => (
                      <div key={page.page} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{page.page}</p>
                          <p className="text-sm text-muted-foreground">
                            {page.views.toLocaleString()} views
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={page.change > 0 ? "default" : "destructive"}
                            className={page.change > 0 ? "bg-green-500" : ""}
                          >
                            {page.change > 0 ? (
                              <ArrowUp className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowDown className="h-3 w-3 mr-1" />
                            )}
                            {Math.abs(page.change)}%
                          </Badge>
                        </div>
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
                            style={{ width: `${analytics?.deviceStats.desktop}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {analytics?.deviceStats.desktop}%
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
                            style={{ width: `${analytics?.deviceStats.mobile}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {analytics?.deviceStats.mobile}%
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
                            style={{ width: `${analytics?.deviceStats.tablet}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {analytics?.deviceStats.tablet}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audience" className="space-y-6">
            {/* Top Countries */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Top Countries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics?.topCountries.map((country, index) => (
                    <div key={country.country} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <span className="font-medium">{country.country}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${country.percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-right min-w-[80px]">
                          <p className="font-medium">{country.visitors.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">{country.percentage}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-6">
            {/* Real-time Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Real-time Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600">127</div>
                      <p className="text-sm text-muted-foreground">Active users right now</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Homepage</span>
                        <span className="font-medium">45 users</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Portfolio</span>
                        <span className="font-medium">32 users</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Gallery</span>
                        <span className="font-medium">28 users</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Blog</span>
                        <span className="font-medium">22 users</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Page Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">2.3s</div>
                        <p className="text-xs text-muted-foreground">Avg Load Time</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">98%</div>
                        <p className="text-xs text-muted-foreground">Uptime</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Core Web Vitals</span>
                        <Badge className="bg-green-500">Good</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Mobile Speed</span>
                        <Badge className="bg-yellow-500">Fair</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Desktop Speed</span>
                        <Badge className="bg-green-500">Good</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="acquisition" className="space-y-6">
            {/* Traffic Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Traffic Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics?.trafficSources.map((source, index) => (
                    <div key={source.source} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          index === 0 ? 'bg-blue-500' :
                          index === 1 ? 'bg-green-500' :
                          index === 2 ? 'bg-purple-500' :
                          index === 3 ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}></div>
                        <span className="font-medium">{source.source}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              index === 0 ? 'bg-blue-500' :
                              index === 1 ? 'bg-green-500' :
                              index === 2 ? 'bg-purple-500' :
                              index === 3 ? 'bg-yellow-500' : 'bg-gray-500'
                            }`}
                            style={{ width: `${source.percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-right min-w-[80px]">
                          <p className="font-medium">{source.visitors.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">{source.percentage}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Conversion Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">3.2%</div>
                    <p className="text-sm text-muted-foreground">Contact Form Rate</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">1.8%</div>
                    <p className="text-sm text-muted-foreground">Portfolio Engagement</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">4.1%</div>
                    <p className="text-sm text-muted-foreground">Email Signups</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </AdminPageLayout>
  )
}