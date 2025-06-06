"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Progress } from "../ui/progress"
import {
  Users,
  Clock,
  CheckCircle,
  TrendingUp,
  Plus,
  Eye,
  BarChart3,
  Calendar,
  Building,
  FileText,
  Target,
  Award,
} from "lucide-react"
import { DiscChart } from "../disc-chart"
import { MetricsChart } from "./metrics-chart"

interface DashboardData {
  metrics: {
    totalCandidates: number
    pendingAssessments: number
    completedAssessments: number
    completionRate: number
  }
  recentCandidates: any[]
  projects: any[]
  companies: any[]
  user: any
}

export function EnhancedDashboard({ data }: { data: DashboardData }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Sample DISC data for visualization
  const sampleDiscData = {
    d: 75,
    i: 45,
    s: 30,
    c: 60,
  }

  // Mock analytics data
  const analyticsData = [
    { month: "Jan", assessments: 45, completion: 89 },
    { month: "Fev", assessments: 52, completion: 92 },
    { month: "Mar", assessments: 48, completion: 87 },
    { month: "Abr", assessments: 61, completion: 94 },
    { month: "Mai", assessments: 55, completion: 91 },
    { month: "Jun", assessments: 67, completion: 96 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo de volta, {data.user?.name || "Usuário"}! Aqui está um resumo das suas atividades.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/candidates">
              <Users className="mr-2 h-4 w-4" />
              Ver Todos
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/dashboard/candidates/new">
              <Plus className="mr-2 h-4 w-4" />
              Novo Candidato
            </Link>
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total de Candidatos</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.metrics.totalCandidates}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span>+12% em relação ao mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avaliações Pendentes</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.metrics.pendingAssessments}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="mr-1 h-3 w-3" />
              <span>Aguardando resposta</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avaliações Concluídas</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.metrics.completedAssessments}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Award className="mr-1 h-3 w-3 text-green-500" />
              <span>Finalizadas com sucesso</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Taxa de Conclusão</CardTitle>
              <Target className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.metrics.completionRate}%</div>
            <Progress value={data.metrics.completionRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
          <TabsTrigger value="activity">Atividades</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Candidatos Recentes</CardTitle>
                <CardDescription>Últimos candidatos adicionados à plataforma</CardDescription>
              </CardHeader>
              <CardContent>
                {data.recentCandidates.length > 0 ? (
                  <div className="space-y-4">
                    {data.recentCandidates.map((candidate) => (
                      <div key={candidate.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">{candidate.name}</p>
                          <p className="text-sm text-muted-foreground">{candidate.email}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              candidate.status === "COMPLETED"
                                ? "default"
                                : candidate.status === "PENDING"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {candidate.status === "COMPLETED"
                              ? "Concluído"
                              : candidate.status === "PENDING"
                                ? "Pendente"
                                : "Expirado"}
                          </Badge>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/dashboard/candidates/${candidate.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Users className="h-12 w-12 text-gray-300 mb-2" />
                    <h3 className="text-lg font-medium">Nenhum candidato encontrado</h3>
                    <p className="text-sm text-muted-foreground">Adicione candidatos para começar</p>
                    <Button asChild className="mt-4">
                      <Link href="/dashboard/candidates/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Adicionar Candidato
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição DISC</CardTitle>
                <CardDescription>Perfil comportamental médio dos candidatos</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-4">
                <div className="w-full max-w-md">
                  <DiscChart data={sampleDiscData} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="mr-2 h-5 w-5" />
                  Empresas Ativas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{data.companies.length}</div>
                <p className="text-sm text-muted-foreground">Empresas cadastradas</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Projetos Ativos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{data.projects.length}</div>
                <p className="text-sm text-muted-foreground">Projetos em andamento</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Relatórios Gerados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">127</div>
                <p className="text-sm text-muted-foreground">Este mês</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tendência de Avaliações</CardTitle>
                <CardDescription>Número de avaliações realizadas por mês</CardDescription>
              </CardHeader>
              <CardContent>
                <MetricsChart data={analyticsData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance por Perfil DISC</CardTitle>
                <CardDescription>Distribuição dos perfis identificados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "D", name: "Dominância", value: 35, color: "bg-red-500" },
                    { type: "I", name: "Influência", value: 28, color: "bg-yellow-500" },
                    { type: "S", name: "Estabilidade", value: 22, color: "bg-green-500" },
                    { type: "C", name: "Conformidade", value: 15, color: "bg-blue-500" },
                  ].map((item) => (
                    <div key={item.type} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={item.value} className="w-20" />
                        <span className="text-sm text-muted-foreground">{item.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Recentes</CardTitle>
              <CardDescription>Últimos relatórios gerados na plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium">Relatórios em desenvolvimento</h3>
                <p className="text-sm text-muted-foreground">Funcionalidade de relatórios será implementada em breve</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
              <CardDescription>Últimas ações realizadas na plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "Novo candidato adicionado",
                    user: "João Silva",
                    time: "2 horas atrás",
                    type: "create",
                  },
                  {
                    action: "Avaliação concluída",
                    user: "Maria Oliveira",
                    time: "4 horas atrás",
                    type: "complete",
                  },
                  {
                    action: "Relatório gerado",
                    user: "Pedro Santos",
                    time: "1 dia atrás",
                    type: "report",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "create"
                          ? "bg-blue-500"
                          : activity.type === "complete"
                            ? "bg-green-500"
                            : "bg-purple-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.user}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
