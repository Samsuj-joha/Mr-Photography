// scripts/debug-auth.js
require('dotenv').config({ path: '.env.local' })

const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function debugAuth() {
  console.log('🔍 Authentication Debug Tool')
  console.log('============================')

  try {
    // Check environment variables
    console.log('\n📋 Environment Check:')
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Found' : '❌ Missing')
    console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '✅ Found' : '❌ Missing')
    console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL || 'Not set')

    // Test database connection
    console.log('\n🔌 Database Connection:')
    await prisma.$connect()
    console.log('✅ Connected successfully')

    // Check all users
    console.log('\n👥 All Users in Database:')
    const allUsers = await prisma.user.findMany()
    console.log(`Total users: ${allUsers.length}`)

    if (allUsers.length === 0) {
      console.log('❌ No users found! Need to create admin user first.')
      return
    }

    allUsers.forEach((user, index) => {
      console.log(`\n${index + 1}. User:`)
      console.log(`   📧 Email: ${user.email}`)
      console.log(`   👤 Name: ${user.name || 'No name'}`)
      console.log(`   🔑 Role: ${user.role}`)
      console.log(`   🔐 Has Password: ${!!user.password}`)
      console.log(`   📊 Password Length: ${user.password?.length || 0}`)
      console.log(`   📅 Created: ${user.createdAt}`)
    })

    // Test specific admin credentials
    console.log('\n🧪 Testing Admin Login:')
    const testEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
    const testPassword = process.env.ADMIN_PASSWORD || '12345678'

    console.log(`Testing: ${testEmail} / ${testPassword}`)

    const user = await prisma.user.findUnique({
      where: { email: testEmail.toLowerCase().trim() }
    })

    if (!user) {
      console.log('❌ User not found with this email')
      console.log('💡 Available emails:')
      allUsers.forEach(u => console.log(`   - ${u.email}`))
      return
    }

    console.log('✅ User found')
    console.log(`   📧 Email: ${user.email}`)
    console.log(`   🔑 Role: ${user.role}`)
    console.log(`   🔐 Has Password: ${!!user.password}`)

    if (!user.password) {
      console.log('❌ User has no password!')
      console.log('💡 Need to set password for this user')
      return
    }

    // Test password
    console.log('\n🔐 Password Test:')
    const isPasswordValid = await bcrypt.compare(testPassword, user.password)
    console.log(`Password "${testPassword}" is valid: ${isPasswordValid ? '✅ YES' : '❌ NO'}`)

    if (!isPasswordValid) {
      console.log('\n🔧 Fixing password...')
      const newHashedPassword = await bcrypt.hash(testPassword, 12)
      
      await prisma.user.update({
        where: { id: user.id },
        data: { password: newHashedPassword }
      })
      
      console.log('✅ Password updated!')
      
      // Test again
      const retestUser = await prisma.user.findUnique({
        where: { email: testEmail }
      })
      
      const retestValid = await bcrypt.compare(testPassword, retestUser.password)
      console.log(`Retest password: ${retestValid ? '✅ VALID' : '❌ STILL INVALID'}`)
    }

    // Check role
    if (user.role !== 'ADMIN') {
      console.log(`\n⚠️  User role is ${user.role}, updating to ADMIN...`)
      await prisma.user.update({
        where: { id: user.id },
        data: { role: 'ADMIN' }
      })
      console.log('✅ Role updated to ADMIN')
    }

    console.log('\n🎯 Final Status:')
    const finalUser = await prisma.user.findUnique({
      where: { email: testEmail }
    })
    
    const finalPasswordTest = await bcrypt.compare(testPassword, finalUser.password)
    
    console.log(`📧 Email: ${finalUser.email}`)
    console.log(`🔑 Role: ${finalUser.role}`)
    console.log(`🔐 Password Test: ${finalPasswordTest ? '✅ VALID' : '❌ INVALID'}`)
    
    if (finalPasswordTest && finalUser.role === 'ADMIN') {
      console.log('\n🎉 Authentication should work now!')
      console.log('🔗 Try logging in at: http://localhost:3000/admin/login')
      console.log(`📧 Email: ${testEmail}`)
      console.log(`🔐 Password: ${testPassword}`)
    } else {
      console.log('\n❌ Something is still wrong!')
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    console.error('Full error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

debugAuth()