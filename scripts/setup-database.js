// scripts/setup-database.js
// Complete database setup script
require('dotenv').config({ path: '.env.local' })

const { execSync } = require('child_process')
const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')

async function setupDatabase() {
  console.log('🚀 Starting database setup...')
  
  try {
    // Step 1: Generate Prisma Client
    console.log('\n📦 Step 1: Generating Prisma Client...')
    execSync('npx prisma generate', { stdio: 'inherit' })
    console.log('✅ Prisma Client generated')

    // Step 2: Push schema to database
    console.log('\n🔄 Step 2: Creating database tables...')
    execSync('npx prisma db push', { stdio: 'inherit' })
    console.log('✅ Database tables created')

    // Step 3: Create admin user
    console.log('\n👤 Step 3: Creating admin user...')
    
    const prisma = new PrismaClient()
    
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
      console.log('⚠️  Admin user already exists! Updating...')
      
      const hashedPassword = await bcrypt.hash(adminPassword, 12)
      
      const updatedUser = await prisma.user.update({
        where: { email: adminEmail },
        data: {
          password: hashedPassword,
          role: 'ADMIN',
          name: adminName
        }
      })
      
      console.log('✅ Admin user updated!')
      console.log('🆔 ID:', updatedUser.id)
      console.log('👤 Name:', updatedUser.name)
      console.log('🔑 Role:', updatedUser.role)
    } else {
      console.log('🆕 Creating new admin user...')
      
      const hashedPassword = await bcrypt.hash(adminPassword, 12)
      
      const newUser = await prisma.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          name: adminName,
          role: 'ADMIN'
        }
      })
      
      console.log('✅ Admin user created!')
      console.log('🆔 ID:', newUser.id)
      console.log('👤 Name:', newUser.name)
      console.log('🔑 Role:', newUser.role)
    }

    // Step 4: Test password
    console.log('\n🧪 Step 4: Testing password...')
    const user = await prisma.user.findUnique({
      where: { email: adminEmail }
    })
    
    if (user && user.password) {
      const isPasswordValid = await bcrypt.compare(adminPassword, user.password)
      console.log('✅ Password test:', isPasswordValid ? 'PASSED' : 'FAILED')
    }

    await prisma.$disconnect()

    console.log('\n🎉 Database setup complete!')
    console.log('📝 Login credentials:')
    console.log(`   📧 Email: ${adminEmail}`)
    console.log(`   🔐 Password: ${adminPassword}`)
    console.log('\n🌐 You can now start your app with: npm run dev')
    console.log('🔗 Admin login: http://localhost:3000/admin/login')

  } catch (error) {
    console.error('❌ Setup failed:', error.message)
    
    if (error.message.includes('P1001')) {
      console.log('\n💡 Database connection failed!')
      console.log('   Check your DATABASE_URL in .env.local')
      console.log('   Make sure PostgreSQL is running')
    } else if (error.message.includes('ENOENT')) {
      console.log('\n💡 Command not found!')
      console.log('   Make sure you have installed dependencies: npm install')
    }
    
    process.exit(1)
  }
}

setupDatabase()