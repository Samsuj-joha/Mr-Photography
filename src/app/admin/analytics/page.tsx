'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown,
  Eye, 
  Users, 
  Camera,
  MessageSquare,
  Calendar,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Sample analytics data
const analyticsData = {
  overview: [
    {
      title: 'Total Visitors',
      value: '12,847',
      change: '+23%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      title: 'Page Views',
      value: '45,231',
      change: '+18%',
      trend: 'up',
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      title: 'Photo Views',
      value: '89,654',
      change: '+31%',
      trend: 'up',
      icon: Camera,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      title: 'Contact Inquiries',
      value: '156',
      change: '-5%',
      trend: 'down',
      icon: MessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    }
  ],
  topPages: [
    { page: 'Gallery', views: 15420, percentage: 34 },
    { page: 'Portfolio', views: 8930, percentage: 20 },
    { page: 'Home', views: 7650, percentage: 17 },
    { page: 'Blog', views: 5440, percentage: 12 },
    { page: 'Contact', views: 4120, percentage: 9 }
  ],
  devices: [
    { device: 'Desktop', percentage: 45, icon: Monitor },
    { device: 'Mobile', percentage: 42, icon: Smartphone },
    { device: 'Tablet', percentage: 13, icon: Monitor }
  ],
  countries: [
    { country: 'United States', visitors: 3420, percentage: 27 },
    { country: 'United Kingdom', visitors: 2180, percentage: 17 },
    { country: 'Canada', visitors: 1890, percentage: 15 },
    { country: 'Australia', visitors: 1340, percentage: 10 },
    { country: 'Germany', visitors: 980, percentage: 8 }
  ]
}

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">
            Track your website performance and visitor insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Live Tracking
          </Badge>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.overview.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <p className={`text-xs flex items-center mt-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Top Pages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topPages.map((page, index) => (
                <div key={page.page} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{page.page}</p>
                      <p className="text-sm text-muted-foreground">{page.views.toLocaleString()} views</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{page.percentage}%</p>
                    <div className="w-16 h-2 bg-muted rounded-full mt-1">
                      <div 
                        className="h-full bg-brand-accent rounded-full"
                        style={{ width: `${page.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Types */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Device Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.devices.map((device) => (
                <div key={device.device} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <device.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium text-foreground">{device.device}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{device.percentage}%</p>
                    <div className="w-16 h-2 bg-muted rounded-full mt-1">
                      <div 
                        className="h-full bg-brand-accent rounded-full"
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Countries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Top Countries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.countries.map((country, index) => (
                <div key={country.country} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{country.country}</p>
                      <p className="text-sm text-muted-foreground">{country.visitors.toLocaleString()} visitors</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{country.percentage}%</p>
                    <div className="w-16 h-2 bg-muted rounded-full mt-1">
                      <div 
                        className="h-full bg-brand-accent rounded-full"
                        style={{ width: `${country.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">Peak traffic recorded</p>
                  <p className="text-xs text-muted-foreground">2,847 visitors in the last hour</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">New country detected</p>
                  <p className="text-xs text-muted-foreground">First visitor from Japan</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-foreground">Gallery trending</p>
                  <p className="text-xs text-muted-foreground">Wedding gallery most viewed today</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}