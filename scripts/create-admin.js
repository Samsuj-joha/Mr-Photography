const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkAdmin() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: "admin@example.com" }
    })
    
    if (user) {
      console.log('✅ Admin user found:')
      console.log('📧 Email:', user.email)
      console.log('👤 Name:', user.name)
      console.log('🔑 Role:', user.role)
      console.log('🆔 ID:', user.id)
      console.log('🔐 Has Password:', !!user.password)
    } else {
      console.log('❌ Admin user NOT found!')
      console.log('Need to create admin user first.')
    }
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkAdmin()