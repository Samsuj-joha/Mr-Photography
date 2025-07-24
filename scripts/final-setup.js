// scripts/final-setup.js
require('dotenv').config({ path: '.env.local' })

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

async function finalSetup() {
  console.log('🚀 MR-PHOTOGRAPHY Final Setup')
  console.log('==============================')

  try {
    // Step 1: Check environment
    console.log('\n📋 Step 1: Environment Check')
    if (!process.env.DATABASE_URL) {
      console.log('❌ DATABASE_URL missing')
      console.log('💡 Add to .env.local: DATABASE_URL="postgresql://postgres:123456@localhost:5432/photography_db"')
      return
    }
    console.log('✅ DATABASE_URL found')

    // Step 2: Check schema file
    console.log('\n📋 Step 2: Schema Check')
    const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma')
    if (!fs.existsSync(schemaPath)) {
      console.log('❌ Missing prisma/schema.prisma')
      console.log('💡 Create the schema file in prisma/schema.prisma')
      return
    }
    console.log('✅ Schema file found')

    // Step 3: Test database connection
    console.log('\n📋 Step 3: Database Connection Test')
    try {
      execSync('npx prisma db push --accept-data-loss --force-reset', { 
        stdio: 'pipe' 
      })
      console.log('✅ Database connection works')
    } catch (error) {
      console.log('❌ Database connection failed')
      console.log('💡 Make sure PostgreSQL is running and database exists')
      console.log('Error:', error.message)
      return
    }

    // Step 4: Generate Prisma client
    console.log('\n📦 Step 4: Generate Prisma Client')
    execSync('npx prisma generate', { stdio: 'inherit' })
    console.log('✅ Prisma client generated')

    // Step 5: Create/Reset database tables
    console.log('\n🔄 Step 5: Create Database Tables')
    execSync('npx prisma db push --force-reset', { stdio: 'inherit' })
    console.log('✅ Database tables created')

    // Step 6: Create admin user
    console.log('\n👤 Step 6: Create Admin User')
    const bcrypt = require('bcryptjs')
    
    // Import after generating client
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient()

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
    const adminPassword = process.env.ADMIN_PASSWORD || '12345678'
    
    console.log('📧 Email:', adminEmail)
    console.log('🔐 Password:', adminPassword)

    const hashedPassword = await bcrypt.hash(adminPassword, 12)
    
    const user = await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Admin User',
        role: 'ADMIN'
      }
    })

    console.log('✅ Admin user created!')
    console.log('🆔 ID:', user.id)

    // Step 7: Test login
    console.log('\n🧪 Step 7: Test Authentication')
    const testUser = await prisma.user.findUnique({
      where: { email: adminEmail }
    })

    const passwordValid = await bcrypt.compare(adminPassword, testUser.password)
    console.log('🔐 Password test:', passwordValid ? '✅ VALID' : '❌ INVALID')
    console.log('🔑 Role test:', testUser.role === 'ADMIN' ? '✅ ADMIN' : '❌ NOT ADMIN')

    await prisma.$disconnect()

    if (passwordValid && testUser.role === 'ADMIN') {
      console.log('\n🎉 SETUP COMPLETE!')
      console.log('==================')
      console.log('✅ Database tables created')
      console.log('✅ Admin user created')
      console.log('✅ Authentication ready')
      console.log('\n🚀 Next Steps:')
      console.log('1. npm run dev')
      console.log('2. Open: http://localhost:3000/admin/login')
      console.log('3. Login with:')
      console.log(`   📧 Email: ${adminEmail}`)
      console.log(`   🔐 Password: ${adminPassword}`)
    } else {
      console.log('\n❌ Setup completed but authentication test failed')
    }

  } catch (error) {
    console.error('\n❌ Setup failed:', error.message)
    
    if (error.message.includes('P1001')) {
      console.log('\n💡 Database connection issue:')
      console.log('- Make sure PostgreSQL is running')
      console.log('- Check DATABASE_URL in .env.local')
      console.log('- Ensure database "photography_db" exists')
    } else if (error.message.includes('connect ECONNREFUSED')) {
      console.log('\n💡 PostgreSQL not running:')
      console.log('- Start PostgreSQL service')
      console.log('- Check if port 5432 is correct')
    }
  }
}

finalSetup()