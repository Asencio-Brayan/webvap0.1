import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcrypt'

import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL! })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
  adapter,
})

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@vapequest.pe'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  })

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    await prisma.adminUser.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
      },
    })

    console.log(`Admin user created: ${adminEmail}`)
  } else {
    console.log('Admin user already exists.')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })