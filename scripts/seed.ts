import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await hash("admin123", 10)
  const admin = await prisma.user.upsert({
    where: { email: "admin@dezorzi.com" },
    update: {},
    create: {
      email: "admin@dezorzi.com",
      name: "Administrador",
      password: adminPassword,
      role: "ADMIN",
    },
  })

  console.log({ admin })

  // Create consultant user
  const consultantPassword = await hash("consultant123", 10)
  const consultant = await prisma.user.upsert({
    where: { email: "consultant@dezorzi.com" },
    update: {},
    create: {
      email: "consultant@dezorzi.com",
      name: "Consultor",
      password: consultantPassword,
      role: "CONSULTANT",
    },
  })

  console.log({ consultant })

  // Create company
  const company = await prisma.company.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      name: "Dezorzi Consultoria",
      active: true,
    },
  })

  console.log({ company })

  // Create client user
  const clientPassword = await hash("client123", 10)
  const client = await prisma.user.upsert({
    where: { email: "client@empresa.com" },
    update: {},
    create: {
      email: "client@empresa.com",
      name: "Cliente",
      password: clientPassword,
      role: "CLIENT",
      companyId: company.id,
    },
  })

  console.log({ client })

  // Create project
  const project = await prisma.project.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      name: "Projeto Piloto",
      description: "Projeto inicial para teste da plataforma",
      companyId: company.id,
      active: true,
    },
  })

  console.log({ project })

  // Create candidates
  const candidates = await Promise.all([
    prisma.candidate.upsert({
      where: { id: "00000000-0000-0000-0000-000000000001" },
      update: {},
      create: {
        id: "00000000-0000-0000-0000-000000000001",
        name: "João Silva",
        email: "joao@exemplo.com",
        status: "PENDING",
        companyId: company.id,
        projectId: project.id,
        createdById: consultant.id,
      },
    }),
    prisma.candidate.upsert({
      where: { id: "00000000-0000-0000-0000-000000000002" },
      update: {},
      create: {
        id: "00000000-0000-0000-0000-000000000002",
        name: "Maria Oliveira",
        email: "maria@exemplo.com",
        status: "COMPLETED",
        companyId: company.id,
        projectId: project.id,
        createdById: consultant.id,
        assessmentSentAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        assessmentCompletedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      },
    }),
  ])

  console.log({ candidates })

  // Create assessment for completed candidate
  const assessment = await prisma.assessment.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      candidateId: candidates[1].id,
      startedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000), // 5 days ago + 30 minutes
      completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 40 * 60 * 1000), // 5 days ago + 40 minutes
      isValid: true,
      environmentCheckPassed: true,
      deviceType: "desktop",
      consentGiven: true,
    },
  })

  console.log({ assessment })

  // Create DISC result
  const discResult = await prisma.discResult.upsert({
    where: { assessmentId: assessment.id },
    update: {},
    create: {
      assessmentId: assessment.id,
      dScore: 75,
      iScore: 45,
      sScore: 30,
      cScore: 60,
      patternType: "DC",
      reportGenerated: true,
    },
  })

  console.log({ discResult })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
