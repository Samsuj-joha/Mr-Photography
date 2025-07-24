// scripts/debug-user.js
// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' })

const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function debugUser() {
  try {
    console.log('🔍 Database Connection Test...')
    console.log('Database URL:', process.env.DATABASE_URL ? 'Found' : 'Missing')
    
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
        console.log(`${index + 1}. Email: ${user.email}`)
        console.log(`   Role: ${user.role}`)
        console.log(`   Name: ${user.name || 'No name'}`)
        console.log(`   Has Password: ${!!user.password}`)
        console.log(`   Password Length: ${user.password?.length || 0}`)
        console.log(`   Created: ${user.createdAt}`)
        console.log('   ---')
      })
    }
    
    // Look for admin users
    const adminUsers = await prisma.user.findMany({
      where: { role: 'ADMIN' }
    })
    
    console.log(`\n🔑 Admin users found: ${adminUsers.length}`)
    
    if (adminUsers.length === 0) {
      console.log('❌ No admin users found!')
      console.log('💡 Run: node scripts/create-admin.js to create one')
    } else {
      for (const admin of adminUsers) {
        console.log(`\n✅ Admin user: ${admin.email}`)
        console.log(`   Name: ${admin.name || 'No name'}`)
        console.log(`   Has Password: ${!!admin.password}`)
        
        // Test password if available
        if (admin.password) {
          const testPasswords = ['12345678', 'admin123', 'password']
          
          for (const testPassword of testPasswords) {
            try {
              const isValid = await bcrypt.compare(testPassword, admin.password)
              console.log(`   Test "${testPassword}": ${isValid ? '✅ VALID' : '❌ Invalid'}`)
              if (isValid) break
            } catch (error) {
              console.log(`   Test "${testPassword}": ❌ Error - ${error.message}`)
            }
          }
        }
      }
    }
    
    // Environment check
    console.log('\n🔧 Environment Variables:')
    console.log(`NEXTAUTH_SECRET: ${process.env.NEXTAUTH_SECRET ? 'Found' : 'Missing'}`)
    console.log(`ADMIN_EMAIL: ${process.env.ADMIN_EMAIL || 'Not set (will use admin@example.com)'}`)
    console.log(`ADMIN_PASSWORD: ${process.env.ADMIN_PASSWORD ? 'Found' : 'Not set (will use 12345678)'}`)
    
  } catch (error) {
    console.error('❌ Database error:', error.message)
    
    if (error.code === 'P1001') {
      console.log('💡 Database connection failed. Check your DATABASE_URL')
    } else if (error.code === 'P2002') {
      console.log('💡 Unique constraint violation')
    }
    
    console.error('Full error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

debugUser()