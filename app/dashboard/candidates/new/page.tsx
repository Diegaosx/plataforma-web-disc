import { prisma } from "../../../../lib/prisma"
import { NewCandidateForm } from "../../../../components/dashboard/new-candidate-form"

export default async function NewCandidatePage() {
  try {
    const projects = await prisma.project.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
    })

    const companies = await prisma.company.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
    })

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Novo Candidato</h1>
          <p className="text-muted-foreground">Adicione um novo candidato para avaliação DISC</p>
        </div>

        <NewCandidateForm projects={projects} companies={companies} />
      </div>
    )
  } catch (error) {
    console.error("Database error:", error)

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Novo Candidato</h1>
          <p className="text-muted-foreground">Adicione um novo candidato para avaliação DISC</p>
        </div>

        <NewCandidateForm projects={[]} companies={[]} />
      </div>
    )
  }
}
