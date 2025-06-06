import { getServerSession } from "next-auth/next"
import { authOptions } from "../../lib/auth"
import { prisma } from "../../lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { DashboardOverview } from "../../components/dashboard/overview"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  try {
    // Fetch summary data
    const candidatesCount = await prisma.candidate.count()
    const pendingCount = await prisma.candidate.count({
      where: { status: "PENDING" },
    })
    const completedCount = await prisma.candidate.count({
      where: { status: "COMPLETED" },
    })

    const recentCandidates = await prisma.candidate.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    })

    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

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
  } catch (error) {
    console.error("Database error:", error)

    // Fallback UI when database is not available
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total de Candidatos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Candidatos cadastrados na plataforma</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avaliações Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Candidatos que ainda não completaram a avaliação</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avaliações Concluídas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Avaliações finalizadas com sucesso</p>
            </CardContent>
          </Card>
        </div>

        <DashboardOverview recentCandidates={[]} />
      </div>
    )
  }
}
