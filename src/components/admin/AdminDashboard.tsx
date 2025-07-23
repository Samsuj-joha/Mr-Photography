'use client'

import { motion } from 'framer-motion'
import { 
  Image, 
  FileText, 
  Users, 
  Eye, 
  TrendingUp, 
  Calendar,
  Camera,
  MessageSquare,
  Star,
  Upload
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

// Sample data (replace with real API calls)
const stats = [
  {
    title: 'Total Photos',
    value: '2,847',
    change: '+12%',
    icon: Image,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20'
  },
  {
    title: 'Blog Posts',
    value: '156',
    change: '+8%',
    icon: FileText,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/20'
  },
  {
    title: 'Website Views',
    value: '45,231',
    change: '+23%',
    icon: Eye,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20'
  },
  {
    title: 'Contact Inquiries',
    value: '89',
    change: '+15%',
    icon: MessageSquare,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20'
  }
]

const recentActivity = [
  {
    id: 1,
    type: 'photo',
    title: 'New photo uploaded',
    description: 'Wedding_ceremony_2024.jpg',
    time: '2 minutes ago',
    icon: Upload
  },
  {
    id: 2,
    type: 'blog',
    title: 'Blog post published',
    description: 'Photography Tips for Beginners',
    time: '1 hour ago',
    icon: FileText
  },
  {
    id: 3,
    type: 'contact',
    title: 'New contact inquiry',
    description: 'Wedding photography booking',
    time: '3 hours ago',
    icon: MessageSquare
  },
  {
    id: 4,
    type: 'review',
    title: 'New 5-star review',
    description: 'Amazing work on our engagement shoot!',
    time: '1 day ago',
    icon: Star
  }
]

const quickActions = [
  {
    title: 'Upload Photos',
    description: 'Add new images to gallery',
    href: '/admin/gallery',
    icon: Upload,
    color: 'bg-blue-600 hover:bg-blue-700'
  },
  {
    title: 'Write Blog Post',
    description: 'Create new article',
    href: '/admin/blog',
    icon: FileText,
    color: 'bg-green-600 hover:bg-green-700'
  },
  {
    title: 'View Analytics',
    description: 'Check website performance',
    href: '/admin/analytics',
    icon: TrendingUp,
    color: 'bg-purple-600 hover:bg-purple-700'
  },
  {
    title: 'Manage Settings',
    description: 'Configure website settings',
    href: '/admin/settings',
    icon: Calendar,
    color: 'bg-orange-600 hover:bg-orange-700'
  }
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your MR-PHOTOGRAPHY admin panel
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            System Online
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link href={action.href}>
                      <Card className="hover:shadow-md transition-all duration-200 cursor-pointer group">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg text-white ${action.color} group-hover:scale-110 transition-transform duration-200`}>
                              <action.icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground group-hover:text-brand-accent transition-colors">
                                {action.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {action.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="p-2 rounded-full bg-muted">
                      <activity.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.title}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4" asChild>
                <Link href="/admin/activity">View All Activity</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Website Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Website Preview
            </span>
            <Button variant="outline" size="sm" asChild>
              <Link href="/" target="_blank">
                Visit Website
              </Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-4 text-center">
            <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Preview of your photography website will appear here
            </p>
            <Button variant="outline" size="sm" className="mt-2" asChild>
              <Link href="/">View Live Site</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}