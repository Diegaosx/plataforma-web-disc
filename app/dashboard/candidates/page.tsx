import Link from "next/link"
import { Button } from "../../../components/ui/button"
import { CandidatesList } from "../../../components/dashboard/candidates-list"
import { Plus } from "lucide-react"
import { getMockData } from "../../../lib/db-fallback"

export default async function CandidatesPage() {
  // Usar sempre dados mock no EasyPanel
  const candidates = getMockData("candidates")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Candidatos</h1>
        <Button asChild>
          <Link href="/dashboard/candidates/new">
            <Plus className="mr-2 h-4 w-4" />
            Novo Candidato
          </Link>
        </Button>
      </div>

      <CandidatesList candidates={candidates} />
    </div>
  )
}
