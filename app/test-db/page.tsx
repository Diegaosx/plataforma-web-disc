import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

export default async function TestDbPage() {
  let dbStatus = "❌ Erro"
  let users: any[] = []
  let error = ""
  let connectionDetails = ""

  try {
    // Testar conexão com o banco
    const { prisma } = await import("../../lib/prisma")

    // Verificar se consegue conectar
    await prisma.$connect()

    // Buscar usuários
    users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true, // Para verificar se existe
      },
    })

    dbStatus = "✅ Conectado"
    connectionDetails = `Encontrados ${users.length} usuários no banco`

    await prisma.$disconnect()
  } catch (err: any) {
    error = err.message
    dbStatus = "❌ Erro de conexão"
    connectionDetails = `Erro: ${err.message}`
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Teste de Conexão com Banco de Dados</h1>

      <Card>
        <CardHeader>
          <CardTitle>Status da Conexão</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>Status:</strong> {dbStatus}
            </p>
            <p>
              <strong>Detalhes:</strong> {connectionDetails}
            </p>
            {error && (
              <div className="bg-red-50 p-3 rounded-md">
                <p className="text-red-700">
                  <strong>Erro:</strong> {error}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Variáveis de Ambiente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>DATABASE_URL:</strong> {process.env.DATABASE_URL ? "✅ Configurada" : "❌ Não configurada"}
            </p>
            <p>
              <strong>NEXTAUTH_SECRET:</strong> {process.env.NEXTAUTH_SECRET ? "✅ Configurada" : "❌ Não configurada"}
            </p>
            <p>
              <strong>NEXTAUTH_URL:</strong> {process.env.NEXTAUTH_URL ? "✅ Configurada" : "❌ Não configurada"}
            </p>
          </div>
        </CardContent>
      </Card>

      {users.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Usuários no Banco</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {users.map((user) => (
                <div key={user.id} className="border p-3 rounded-md">
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Nome:</strong> {user.name}
                  </p>
                  <p>
                    <strong>Role:</strong> {user.role}
                  </p>
                  <p>
                    <strong>Senha:</strong> {user.password ? "✅ Configurada" : "❌ Não configurada"}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Usuários de Fallback (Mock)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="border p-3 rounded-md">
              <p>
                <strong>Email:</strong> admin@dezorzi.com
              </p>
              <p>
                <strong>Senha:</strong> admin123
              </p>
              <p>
                <strong>Role:</strong> ADMIN
              </p>
            </div>
            <div className="border p-3 rounded-md">
              <p>
                <strong>Email:</strong> consultant@dezorzi.com
              </p>
              <p>
                <strong>Senha:</strong> consultant123
              </p>
              <p>
                <strong>Role:</strong> CONSULTANT
              </p>
            </div>
            <div className="border p-3 rounded-md">
              <p>
                <strong>Email:</strong> client@empresa.com
              </p>
              <p>
                <strong>Senha:</strong> client123
              </p>
              <p>
                <strong>Role:</strong> CLIENT
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
