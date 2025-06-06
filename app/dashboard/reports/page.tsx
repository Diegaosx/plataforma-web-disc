import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { FileText, Download, Eye, Calendar, User, Building, TrendingUp, BarChart3 } from "lucide-react"
import { DiscChart } from "../../../components/disc-chart"

export default async function ReportsPage() {
  // Dados mock para relatórios
  const reports = [
    {
      id: "report-1",
      title: "Relatório Individual - Maria Oliveira",
      type: "individual",
      candidate: "Maria Oliveira",
      company: "Dezorzi Consultoria",
      createdAt: new Date("2024-01-20"),
      status: "completed",
      discData: { d: 75, i: 45, s: 30, c: 60 },
    },
    {
      id: "report-2",
      title: "Análise de Equipe - Vendas",
      type: "team",
      candidate: "Equipe Vendas (5 pessoas)",
      company: "Empresa Cliente",
      createdAt: new Date("2024-01-18"),
      status: "completed",
      discData: { d: 65, i: 70, s: 40, c: 45 },
    },
    {
      id: "report-3",
      title: "Relatório Individual - João Silva",
      type: "individual",
      candidate: "João Silva",
      company: "Dezorzi Consultoria",
      createdAt: new Date("2024-01-15"),
      status: "processing",
      discData: null,
    },
  ]

  const sampleDiscData = { d: 75, i: 45, s: 30, c: 60 }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">Visualize e gerencie relatórios de avaliação DISC</p>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">Todos os Relatórios</TabsTrigger>
          <TabsTrigger value="individual">Individuais</TabsTrigger>
          <TabsTrigger value="team">Equipes</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-6">
            {reports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <User className="mr-1 h-4 w-4" />
                          {report.candidate}
                        </div>
                        <div className="flex items-center">
                          <Building className="mr-1 h-4 w-4" />
                          {report.company}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {report.createdAt.toLocaleDateString("pt-BR")}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={report.status === "completed" ? "default" : "secondary"}>
                        {report.status === "completed" ? "Concluído" : "Processando"}
                      </Badge>
                      {report.status === "completed" && (
                        <div className="flex space-x-1">
                          <Button variant="outline" size="sm">
                            <Eye className="mr-1 h-4 w-4" />
                            Visualizar
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="mr-1 h-4 w-4" />
                            Download
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                {report.discData && (
                  <CardContent>
                    <div className="flex items-center space-x-6">
                      <div className="w-32 h-32">
                        <DiscChart data={report.discData} />
                      </div>
                      <div className="flex-1 grid grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600">{report.discData.d}%</div>
                          <div className="text-sm text-muted-foreground">Dominância</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-600">{report.discData.i}%</div>
                          <div className="text-sm text-muted-foreground">Influência</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{report.discData.s}%</div>
                          <div className="text-sm text-muted-foreground">Estabilidade</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{report.discData.c}%</div>
                          <div className="text-sm text-muted-foreground">Conformidade</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Tendências de Perfil
                </CardTitle>
                <CardDescription>Distribuição dos perfis DISC nos últimos 30 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Dominância (D)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: "75%" }} />
                      </div>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Influência (I)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "45%" }} />
                      </div>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Estabilidade (S)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "30%" }} />
                      </div>
                      <span className="text-sm font-medium">30%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Conformidade (C)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "60%" }} />
                      </div>
                      <span className="text-sm font-medium">60%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Estatísticas Gerais
                </CardTitle>
                <CardDescription>Resumo das avaliações realizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Total de Avaliações</span>
                    <span className="text-2xl font-bold text-blue-600">127</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Concluídas este mês</span>
                    <span className="text-2xl font-bold text-green-600">23</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium">Taxa de Conclusão</span>
                    <span className="text-2xl font-bold text-yellow-600">89%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
