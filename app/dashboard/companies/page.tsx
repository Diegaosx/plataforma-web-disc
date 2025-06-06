import Link from "next/link"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Plus, Building, Users, FolderKanban, MoreHorizontal, Eye, Edit, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import { getMockData } from "../../../lib/db-fallback"

export default async function CompaniesPage() {
  const companies = getMockData("companies")
  const projects = getMockData("projects")
  const candidates = getMockData("candidates")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Empresas</h1>
          <p className="text-muted-foreground">Gerencie as empresas clientes da plataforma</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/companies/new">
            <Plus className="mr-2 h-4 w-4" />
            Nova Empresa
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => {
          const companyProjects = projects.filter((p) => p.companyId === company.id)
          const companyCandidates = candidates.filter((c) => c.companyId === company.id)

          return (
            <Card key={company.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={company.logoUrl || ""} alt={company.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">{company.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      <Badge variant={company.active ? "default" : "secondary"} className="mt-1">
                        {company.active ? "Ativa" : "Inativa"}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Visualizar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <FolderKanban className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{companyProjects.length}</div>
                    <div className="text-xs text-blue-600">Projetos</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-600">{companyCandidates.length}</div>
                    <div className="text-xs text-green-600">Candidatos</div>
                  </div>
                </div>

                {company.primaryColor && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Cor primária</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: company.primaryColor }} />
                      <span className="font-mono text-xs">{company.primaryColor}</span>
                    </div>
                  </div>
                )}

                <div className="text-sm text-muted-foreground">
                  Criada em {company.createdAt.toLocaleDateString("pt-BR")}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {companies.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <Building className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Nenhuma empresa encontrada</h3>
                <p className="text-muted-foreground">Adicione sua primeira empresa cliente</p>
              </div>
              <Button asChild>
                <Link href="/dashboard/companies/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Empresa
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
