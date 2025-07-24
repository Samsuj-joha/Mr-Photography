// scripts/seed-sample-data.js
require('dotenv').config({ path: '.env.local' })

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seedSampleData() {
  console.log('🌱 Seeding sample data for homepage...')

  try {
    // 1. Create sample settings
    console.log('⚙️  Creating site settings...')
    const settings = [
      { key: 'site_title', value: 'MR-PHOTOGRAPHY' },
      { key: 'site_description', value: 'Professional Photography Studio' },
      { key: 'hero_title', value: 'Capturing Life\'s Perfect Moments' },
      { key: 'hero_subtitle', value: 'Professional photography services for weddings, portraits, events, and more. Creating timeless memories with artistic vision and technical excellence.' },
      { key: 'contact_email', value: 'info@mr-photography.com' },
      { key: 'contact_phone', value: '+1 (555) 123-4567' },
      { key: 'social_instagram', value: 'https://instagram.com/mrphotography' },
      { key: 'social_facebook', value: 'https://facebook.com/mrphotography' },
      { key: 'stats_photos_taken', value: '12,500+' },
      { key: 'stats_happy_clients', value: '750+' },
      { key: 'stats_years_experience', value: '8+' },
      { key: 'stats_awards_won', value: '35+' }
    ]

    for (const setting of settings) {
      await prisma.setting.upsert({
        where: { key: setting.key },
        update: { value: setting.value },
        create: setting
      })
    }

    // 2. Create sample blog categories
    console.log('📚 Creating blog categories...')
    const blogCategories = [
      { name: 'Wedding Photography', slug: 'wedding-photography', color: '#f59e0b' },
      { name: 'Photography Tips', slug: 'photography-tips', color: '#3b82f6' },
      { name: 'Behind the Scenes', slug: 'behind-the-scenes', color: '#10b981' },
      { name: 'Client Stories', slug: 'client-stories', color: '#8b5cf6' }
    ]

    for (const category of blogCategories) {
      await prisma.blogCategory.upsert({
        where: { slug: category.slug },
        update: category,
        create: category
      })
    }

    // 3. Create sample images first (using Unsplash URLs for demo)
    console.log('📸 Creating sample images...')
    const sampleImages = [
      {
        title: 'Wedding Ceremony',
        description: 'Beautiful wedding ceremony moment',
        url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1920&h=1080&fit=crop',
        width: 1920,
        height: 1080,
        isActive: true,
        isFeatured: true,
        order: 1,
        tags: ['wedding', 'ceremony', 'love']
      },
      {
        title: 'Portrait Session',
        description: 'Professional portrait photography',
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&h=1080&fit=crop',
        width: 1920,
        height: 1080,
        isActive: true,
        isFeatured: true,
        order: 2,
        tags: ['portrait', 'professional', 'studio']
      },
      {
        title: 'Corporate Event',
        description: 'Corporate event photography',
        url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1920&h=1080&fit=crop',
        width: 1920,
        height: 1080,
        isActive: true,
        isFeatured: true,
        order: 3,
        tags: ['corporate', 'event', 'business']
      },
      {
        title: 'Nature Landscape',
        description: 'Beautiful natural landscape',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
        width: 1920,
        height: 1080,
        isActive: true,
        isFeatured: true,
        order: 4,
        tags: ['nature', 'landscape', 'mountains']
      },
      {
        title: 'Fashion Shoot',
        description: 'High-end fashion photography',
        url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=1080&fit=crop',
        width: 1920,
        height: 1080,
        isActive: true,
        isFeatured: true,
        order: 5,
        tags: ['fashion', 'model', 'style']
      }
    ]

    // Clear existing images first
    await prisma.image.deleteMany({})
    
    const createdImages = []
    for (const image of sampleImages) {
      const createdImage = await prisma.image.create({
        data: image
      })
      createdImages.push(createdImage)
    }

    // 4. Create sample galleries
    console.log('🖼️  Creating sample galleries...')
    const adminUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    })

    // Clear existing galleries first
    await prisma.gallery.deleteMany({})

    const galleries = [
      {
        title: 'Romantic Wedding Collection',
        description: 'Beautiful wedding moments captured with artistic vision',
        category: 'WEDDING',
        isActive: true,
        isFeatured: true,
        order: 1,
        authorId: adminUser?.id
      },
      {
        title: 'Professional Portraits',
        description: 'Stunning portrait photography sessions',
        category: 'PORTRAIT',
        isActive: true,
        isFeatured: true,
        order: 2,
        authorId: adminUser?.id
      },
      {
        title: 'Corporate Events',
        description: 'Professional event photography services',
        category: 'EVENT',
        isActive: true,
        isFeatured: true,
        order: 3,
        authorId: adminUser?.id
      },
      {
        title: 'Nature & Landscapes',
        description: 'Breathtaking natural scenery',
        category: 'NATURE',
        isActive: true,
        isFeatured: true,
        order: 4,
        authorId: adminUser?.id
      },
      {
        title: 'Commercial Photography',
        description: 'Professional commercial and product photography',
        category: 'COMMERCIAL',
        isActive: true,
        isFeatured: true,
        order: 5,
        authorId: adminUser?.id
      },
      {
        title: 'Fashion Photography',
        description: 'High-end fashion and lifestyle photography',
        category: 'FASHION',
        isActive: true,
        isFeatured: true,
        order: 6,
        authorId: adminUser?.id
      }
    ]

    const createdGalleries = []
    for (const gallery of galleries) {
      const createdGallery = await prisma.gallery.create({
        data: gallery
      })
      createdGalleries.push(createdGallery)
    }

    // 5. Link images to galleries
    console.log('🔗 Linking images to galleries...')
    if (createdImages.length > 0 && createdGalleries.length > 0) {
      // Assign first image to wedding gallery
      if (createdGalleries[0] && createdImages[0]) {
        await prisma.image.update({
          where: { id: createdImages[0].id },
          data: { galleryId: createdGalleries[0].id }
        })
      }

      // Assign second image to portrait gallery
      if (createdGalleries[1] && createdImages[1]) {
        await prisma.image.update({
          where: { id: createdImages[1].id },
          data: { galleryId: createdGalleries[1].id }
        })
      }

      // Assign third image to event gallery
      if (createdGalleries[2] && createdImages[2]) {
        await prisma.image.update({
          where: { id: createdImages[2].id },
          data: { galleryId: createdGalleries[2].id }
        })
      }

      // Assign fourth image to nature gallery
      if (createdGalleries[3] && createdImages[3]) {
        await prisma.image.update({
          where: { id: createdImages[3].id },
          data: { galleryId: createdGalleries[3].id }
        })
      }

      // Assign fifth image to fashion gallery
      if (createdGalleries[5] && createdImages[4]) {
        await prisma.image.update({
          where: { id: createdImages[4].id },
          data: { galleryId: createdGalleries[5].id }
        })
      }
    }

    // 6. Create sample blog posts
    console.log('📝 Creating sample blog posts...')
    const weddingCategory = await prisma.blogCategory.findFirst({
      where: { slug: 'wedding-photography' }
    })
    const tipsCategory = await prisma.blogCategory.findFirst({
      where: { slug: 'photography-tips' }
    })
    const behindCategory = await prisma.blogCategory.findFirst({
      where: { slug: 'behind-the-scenes' }
    })

    // Clear existing blog posts
    await prisma.blogPost.deleteMany({})

    const blogPosts = [
      {
        title: '10 Tips for Perfect Wedding Photography',
        slug: '10-tips-perfect-wedding-photography',
        excerpt: 'Essential tips every wedding photographer should know to capture the perfect moments on the big day.',
        content: `# 10 Tips for Perfect Wedding Photography

Wedding photography is one of the most rewarding yet challenging forms of photography. Here are 10 essential tips to help you capture those perfect moments:

## 1. Plan Ahead
Meet with the couple before the wedding day to understand their vision and preferred style.

## 2. Scout the Location
Visit the venue beforehand to identify the best spots for photos and understand the lighting conditions.

## 3. Capture Candid Moments
Some of the best wedding photos are unposed, natural moments between the couple and their loved ones.

## 4. Use the Right Equipment
Invest in quality lenses and always have backup equipment ready.

## 5. Master Low Light Photography
Churches and reception venues often have challenging lighting conditions.

*Continue reading for more professional tips...*`,
        featuredImage: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop',
        status: 'PUBLISHED',
        isPublished: true,
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        authorId: adminUser?.id,
        categoryId: weddingCategory?.id
      },
      {
        title: 'Behind the Scenes: Fashion Photography Shoot',
        slug: 'behind-scenes-fashion-photography-shoot',
        excerpt: 'Go behind the scenes of our latest fashion photography shoot and see how we create stunning images.',
        content: `# Behind the Scenes: Fashion Photography Shoot

Take a look behind the scenes of our latest fashion photography session...

## The Setup
Our team spent hours setting up the perfect lighting and backdrop for this high-fashion shoot.

## Working with Models
Communication and direction are key to getting the perfect shot.

## Post-Processing Magic
See how we transform raw images into stunning final photographs.`,
        featuredImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop',
        status: 'PUBLISHED',
        isPublished: true,
        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        authorId: adminUser?.id,
        categoryId: behindCategory?.id
      },
      {
        title: 'Essential Camera Settings for Portrait Photography',
        slug: 'essential-camera-settings-portrait-photography',
        excerpt: 'Master these camera settings to take your portrait photography to the next level.',
        content: `# Essential Camera Settings for Portrait Photography

Portrait photography requires specific camera settings to achieve professional results...

## Aperture Settings
Use wide apertures (f/1.4 - f/2.8) for shallow depth of field and beautiful bokeh.

## Shutter Speed
Maintain fast enough shutter speeds to avoid camera shake and subject movement.

## ISO Settings
Keep ISO as low as possible while maintaining proper exposure.`,
        featuredImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
        status: 'PUBLISHED',
        isPublished: true,
        publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        authorId: adminUser?.id,
        categoryId: tipsCategory?.id
      }
    ]

    for (const post of blogPosts) {
      await prisma.blogPost.create({
        data: post
      })
    }

    // 7. Create sample testimonials
    console.log('💬 Creating sample testimonials...')
    
    // Clear existing testimonials
    await prisma.testimonial.deleteMany({})

    const testimonials = [
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        company: 'Happy Bride',
        rating: 5,
        content: 'MR Photography captured our wedding day perfectly! Every moment was beautifully documented and we couldn\'t be happier with the results. Professional, creative, and so easy to work with.',
        isActive: true,
        isFeatured: true,
        authorId: adminUser?.id
      },
      {
        name: 'Michael Chen',
        email: 'michael.chen@email.com',
        company: 'Tech Startup CEO',
        rating: 5,
        content: 'Outstanding corporate headshots and event photography. The team was professional and delivered exceptional quality photos that really elevated our brand image.',
        isActive: true,
        isFeatured: true,
        authorId: adminUser?.id
      },
      {
        name: 'Emma Williams',
        email: 'emma.williams@email.com',
        company: 'Fashion Model',
        rating: 5,
        content: 'Amazing fashion photography session! The photographer understood my vision perfectly and created stunning images that exceeded my expectations. Highly recommended!',
        isActive: true,
        isFeatured: true,
        authorId: adminUser?.id
      },
      {
        name: 'David Rodriguez',
        email: 'david.rodriguez@email.com',
        company: 'Event Organizer',
        rating: 5,
        content: 'Exceptional event photography services. Captured all the important moments and emotions of our corporate event. The final photos were delivered quickly and looked amazing.',
        isActive: true,
        isFeatured: true,
        authorId: adminUser?.id
      },
      {
        name: 'Lisa Thompson',
        email: 'lisa.thompson@email.com',
        company: 'Mother of the Bride',
        rating: 5,
        content: 'Beautiful family portrait session. The photographer made everyone feel comfortable and captured wonderful natural moments. We will treasure these photos forever.',
        isActive: true,
        isFeatured: true,
        authorId: adminUser?.id
      },
      {
        name: 'James Park',
        email: 'james.park@email.com',
        company: 'Business Owner',
        rating: 5,
        content: 'Professional commercial photography for our product catalog. High quality images that really showcase our products in the best light. Great attention to detail.',
        isActive: true,
        isFeatured: true,
        authorId: adminUser?.id
      }
    ]

    for (const testimonial of testimonials) {
      await prisma.testimonial.create({
        data: testimonial
      })
    }

    console.log('✅ Sample data seeded successfully!')
    console.log('🎉 Your homepage should now display dynamic content!')
    console.log('\n📋 What was created:')
    console.log('- 12 site settings')
    console.log('- 4 blog categories')
    console.log('- 6 featured galleries')
    console.log('- 5 hero images')
    console.log('- 3 blog posts')
    console.log('- 6 testimonials')
    console.log('\n🌐 Start your dev server and visit: http://localhost:3000')

  } catch (error) {
    console.error('❌ Error seeding data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedSampleData()