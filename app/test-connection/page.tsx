import { prisma } from "../../lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

export default async function TestConnectionPage() {
  let connectionStatus = "❌ Erro"
  let userCount = 0
  let candidateCount = 0
  let companyCount = 0
  let error = null

  try {
    // Testar conexão com o banco
    userCount = await prisma.user.count()
    candidateCount = await prisma.candidate.count()
    companyCount = await prisma.company.count()
    connectionStatus = "✅ Conectado"
  } catch (err: any) {
    error = err.message
    console.error("Erro de conexão:", err)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Teste de Conexão - Plataforma DISC</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status da Conexão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectionStatus}</div>
            <p className="text-xs text-muted-foreground">Railway PostgreSQL</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount}</div>
            <p className="text-xs text-muted-foreground">Usuários cadastrados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Candidatos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{candidateCount}</div>
            <p className="text-xs text-muted-foreground">Candidatos no sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Empresas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companyCount}</div>
            <p className="text-xs text-muted-foreground">Empresas cadastradas</p>
          </CardContent>
        </Card>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">Erro de Conexão</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-sm text-red-600 whitespace-pre-wrap">{error}</pre>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Próximos Passos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">1. Testar Login</h3>
            <p className="text-sm text-muted-foreground">
              Acesse <code>/login</code> e teste com os usuários:
            </p>
            <ul className="text-sm space-y-1 ml-4">
              <li>
                • <strong>Admin:</strong> admin@dezorzi.com / admin123
              </li>
              <li>
                • <strong>Consultor:</strong> consultant@dezorzi.com / consultant123
              </li>
              <li>
                • <strong>Cliente:</strong> client@empresa.com / client123
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">2. Acessar Dashboard</h3>
            <p className="text-sm text-muted-foreground">
              Após login, acesse <code>/dashboard</code> para ver a interface completa
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">3. Testar Funcionalidades</h3>
            <p className="text-sm text-muted-foreground">
              • Cadastrar novos candidatos
              <br />• Visualizar relatórios DISC
              <br />• Gerenciar projetos e empresas
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
