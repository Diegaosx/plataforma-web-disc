import { NewCandidateForm } from "../../../../components/dashboard/new-candidate-form"
import { getMockData } from "../../../../lib/db-fallback"

export default async function NewCandidatePage() {
  let projects: any[] = []
  let companies: any[] = []

  try {
    const { prisma } = await import("../../../../lib/prisma")
    projects = await prisma.project.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
    })

    companies = await prisma.company.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
    })
  } catch (error) {
    console.error("Database error, using fallback data:", error)
    projects = getMockData("projects")
    companies = getMockData("companies")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Novo Candidato</h1>
        <p className="text-muted-foreground">Adicione um novo candidato para avaliação DISC</p>
      </div>

      <NewCandidateForm projects={projects} companies={companies} />
    </div>
  )
}
