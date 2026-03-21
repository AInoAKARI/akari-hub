import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Seed employees
  await prisma.user.upsert({
    where: { employeeCode: "001" },
    update: {},
    create: {
      employeeCode: "001",
      name: "ˆ¤–ì‚ ‚©‚è",
      displayName: "‚ ‚©‚è",
      role: "admin",
      email: "akari@ai-akari.ai",
    },
  })

  await prisma.user.upsert({
    where: { employeeCode: "002" },
    update: {},
    create: {
      employeeCode: "002",
      name: "¯–ì^Šó",
      displayName: "‚«‚ç‚½‚ñ",
      role: "manager",
      email: "kira@ai-akari.ai",
    },
  })

  console.log("Seed data created!")
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
