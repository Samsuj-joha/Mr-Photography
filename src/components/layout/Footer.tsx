'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter,
  Youtube,
  ArrowRight,
  Send
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Logo from './Logo'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ]

  const services = [
    { name: 'Wedding Photography', href: '/services/wedding' },
    { name: 'Portrait Sessions', href: '/services/portrait' },
    { name: 'Event Coverage', href: '/services/events' },
    { name: 'Commercial Photography', href: '/services/commercial' },
    { name: 'Photo Editing', href: '/services/editing' },
  ]

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-600' },
  ]

  const contactInfo = [
    { icon: Mail, text: 'hello@mrphotography.com', href: 'mailto:hello@mrphotography.com' },
    { icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: MapPin, text: 'New York, NY 10001', href: 'https://maps.google.com' },
  ]

  // Handle newsletter subscription
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Newsletter subscription:', email)
      setEmail('')
      // Show success message here
    } catch (error) {
      console.error('Newsletter subscription error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <footer className="bg-background border-t border-border">
      {/* Main Footer Content */}
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-12 sm:py-16">
        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          
          {/* Brand Section */}
          <motion.div
            variants={fadeInUp}
            className="sm:col-span-2 lg:col-span-1"
          >
            <Logo size="small" className="mb-4" />
            
            <p className="text-muted-foreground mb-6 leading-relaxed text-sm sm:text-base max-w-md">
              Professional photography services capturing life's most beautiful moments 
              with artistic excellence and attention to detail.
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-9 h-9 sm:w-10 sm:h-10 bg-muted hover:bg-brand-accent rounded-full flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-200 ${social.color}`}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={fadeInUp}
            className="min-w-0"
          >
            <h3 className="font-semibold text-foreground mb-4 text-base sm:text-lg">Quick Links</h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="min-w-0"
                >
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-brand-accent transition-colors duration-200 flex items-center group text-sm sm:text-base truncate"
                  >
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                    <span className="truncate">{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            variants={fadeInUp}
            className="min-w-0"
          >
            <h3 className="font-semibold text-foreground mb-4 text-base sm:text-lg">Services</h3>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="min-w-0"
                >
                  <Link 
                    href={service.href}
                    className="text-muted-foreground hover:text-brand-accent transition-colors duration-200 flex items-center group text-sm sm:text-base"
                  >
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 shrink-0" />
                    <span className="truncate">{service.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info & Newsletter */}
          <motion.div
            variants={fadeInUp}
            className="min-w-0"
          >
            <h3 className="font-semibold text-foreground mb-4 text-base sm:text-lg">Get In Touch</h3>
            
            {/* Contact Information */}
            <div className="space-y-2 sm:space-y-3 mb-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start text-muted-foreground hover:text-brand-accent transition-colors duration-200 group text-sm sm:text-base min-w-0"
                  target={info.href.startsWith('http') ? "_blank" : undefined}
                  rel={info.href.startsWith('http') ? "noopener noreferrer" : undefined}
                >
                  <info.icon className="h-3 w-3 sm:h-4 sm:w-4 mr-2 sm:mr-3 text-brand-accent mt-0.5 shrink-0" />
                  <span className="truncate">{info.text}</span>
                </motion.a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div>
              <h4 className="font-medium text-foreground mb-3 text-sm sm:text-base">Newsletter</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                Subscribe for photography tips and updates
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input 
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  className="flex-1 text-sm min-w-0"
                  disabled={isSubmitting}
                />
                <Button 
                  type="submit"
                  size="sm"
                  className="bg-brand-accent hover:bg-brand-accent/90 text-brand-dark px-2 sm:px-3 shrink-0"
                  disabled={isSubmitting}
                  aria-label="Subscribe to newsletter"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-brand-dark border-t-transparent rounded-full"
                    />
                  ) : (
                    <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-muted-foreground"
          >
            <div className="text-center sm:text-left">
              <p>© {currentYear} MR-PHOTOGRAPHY. All rights reserved.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {[
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Cookie Policy', href: '/cookies' }
              ].map((link, index) => (
                <Link 
                  key={index}
                  href={link.href} 
                  className="hover:text-brand-accent transition-colors duration-200 whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}