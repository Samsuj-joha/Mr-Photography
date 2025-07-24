// scripts/create-admin.js
// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' })

const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function createAdminUser() {
  try {
    console.log('🔄 Creating admin user...')
    
    // Admin credentials
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
    const adminPassword = process.env.ADMIN_PASSWORD || '12345678'
    const adminName = 'Admin User'

    console.log('📧 Admin Email:', adminEmail)
    console.log('🔐 Admin Password:', adminPassword)

    // Check if admin user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail }
    })

    if (existingUser) {
      console.log('⚠️  Admin user already exists!')
      console.log('🔄 Updating existing user...')
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(adminPassword, 12)
      
      // Update existing user
      const updatedUser = await prisma.user.update({
        where: { email: adminEmail },
        data: {
          password: hashedPassword,
          role: 'ADMIN',
          name: adminName
        }
      })
      
      console.log('✅ Admin user updated successfully!')
      console.log('🆔 ID:', updatedUser.id)
      console.log('📧 Email:', updatedUser.email)
      console.log('👤 Name:', updatedUser.name)
      console.log('🔑 Role:', updatedUser.role)
    } else {
      console.log('🆕 Creating new admin user...')
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(adminPassword, 12)
      
      // Create new admin user
      const newUser = await prisma.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          name: adminName,
          role: 'ADMIN'
        }
      })
      
      console.log('✅ Admin user created successfully!')
      console.log('🆔 ID:', newUser.id)
      console.log('📧 Email:', newUser.email)
      console.log('👤 Name:', newUser.name)
      console.log('🔑 Role:', newUser.role)
    }

    // Test password hashing
    console.log('\n🧪 Testing password verification...')
    const user = await prisma.user.findUnique({
      where: { email: adminEmail }
    })
    
    if (user && user.password) {
      const isPasswordValid = await bcrypt.compare(adminPassword, user.password)
      console.log('✅ Password verification test:', isPasswordValid ? 'PASSED' : 'FAILED')
    }

    console.log('\n🎉 Admin setup complete!')
    console.log('📝 You can now login with:')
    console.log(`   Email: ${adminEmail}`)
    console.log(`   Password: ${adminPassword}`)

  } catch (error) {
    console.error('❌ Error creating admin user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdminUser()