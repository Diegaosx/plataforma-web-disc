import { getServerSession } from "next-auth/next"
import { authOptions } from "../../lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { DashboardOverview } from "../../components/dashboard/overview"
import { getMockData } from "../../lib/db-fallback"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  // Usar sempre dados mock no EasyPanel
  const mockCandidates = getMockData("candidates")
  const candidatesCount = mockCandidates.length
  const pendingCount = mockCandidates.filter((c) => c.status === "PENDING").length
  const completedCount = mockCandidates.filter((c) => c.status === "COMPLETED").length
  const recentCandidates = mockCandidates.slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="text-sm text-muted-foreground">Bem-vindo, {session?.user?.name || "Usuário"}!</div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de Candidatos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{candidatesCount}</div>
            <p className="text-xs text-muted-foreground">Candidatos cadastrados na plataforma</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avaliações Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Candidatos que ainda não completaram a avaliação</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avaliações Concluídas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCount}</div>
            <p className="text-xs text-muted-foreground">Avaliações finalizadas com sucesso</p>
          </CardContent>
        </Card>
      </div>

      <DashboardOverview recentCandidates={recentCandidates} />
    </div>
  )
}
