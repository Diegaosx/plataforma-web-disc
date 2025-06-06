import Link from "next/link"
import { prisma } from "../../../lib/prisma"
import { Button } from "../../../components/ui/button"
import { CandidatesList } from "../../../components/dashboard/candidates-list"
import { Plus } from "lucide-react"

export default async function CandidatesPage() {
  try {
    const candidates = await prisma.candidate.findMany({
      orderBy: { createdAt: "desc" },
    })

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
  } catch (error) {
    console.error("Database error:", error)

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

        <CandidatesList candidates={[]} />
      </div>
    )
  }
}
