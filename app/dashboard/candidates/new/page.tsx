import { NewCandidateForm } from "../../../../components/dashboard/new-candidate-form"
import { getMockData } from "../../../../lib/db-fallback"

export default async function NewCandidatePage() {
  // Usar sempre dados mock no EasyPanel
  const projects = getMockData("projects")
  const companies = getMockData("companies")

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
