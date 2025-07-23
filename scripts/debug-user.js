// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' })

const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function debugUser() {
  try {
    console.log('🔍 Database Connection Test...')
    console.log('Database URL:', process.env.DATABASE_URL)
    
    if (!process.env.DATABASE_URL) {
      console.log('❌ DATABASE_URL not found in environment variables')
      console.log('Make sure .env.local exists and contains DATABASE_URL')
      return
    }
    
    // Test database connection
    await prisma.$connect()
    console.log('✅ Connected to database successfully')
    
    // Check all users
    const allUsers = await prisma.user.findMany()
    console.log(`📊 Total users in database: ${allUsers.length}`)
    
    if (allUsers.length > 0) {
      console.log('\n👥 All users:')
      allUsers.forEach((user, index) => {
        console.log(`${index + 1}. Email: ${user.email}, Role: ${user.role}, Has Password: ${!!user.password}`)
      })
    }
    
    // Look for specific admin user
    const adminUser = await prisma.user.findUnique({
      where: { email: "admin@example.com" }
    })
    
    if (adminUser) {
      console.log('\n✅ Admin user found:')
      console.log('📧 Email:', adminUser.email)
      console.log('👤 Name:', adminUser.name)
      console.log('🔑 Role:', adminUser.role)
      console.log('🆔 ID:', adminUser.id)
      console.log('🔐 Has Password:', !!adminUser.password)
      console.log('🔐 Password Hash Length:', adminUser.password?.length || 0)
      
      // Test password comparison
      if (adminUser.password) {
        const testPassword = "12345678"
        const isValid = await bcrypt.compare(testPassword, adminUser.password)
        console.log(`🔐 Password "${testPassword}" is valid:`, isValid)
      }
    } else {
      console.log('\n❌ Admin user NOT found!')
    }
    
  } catch (error) {
    console.error('❌ Database error:', error.message)
    console.error('Full error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

debugUser()