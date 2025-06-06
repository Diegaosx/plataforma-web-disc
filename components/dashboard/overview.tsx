"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Button } from "../ui/button"
import { BarChart, Calendar, Clock, Mail, Plus, Users, FileText } from "lucide-react"
import { DiscChart } from "../disc-chart"
import type { Candidate } from "@prisma/client"

export function DashboardOverview({
  recentCandidates,
}: {
  recentCandidates: Candidate[]
}) {
  const [activeTab, setActiveTab] = useState("overview")

  // Sample DISC data for visualization
  const sampleDiscData = {
    d: 75,
    i: 45,
    s: 30,
    c: 60,
  }

  return (
    <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

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

      <TabsContent value="overview" className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Candidatos Recentes</CardTitle>
              <CardDescription>Últimos candidatos adicionados à plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              {recentCandidates.length > 0 ? (
                <div className="space-y-4">
                  {recentCandidates.map((candidate) => (
                    <div key={candidate.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{candidate.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          <span>{candidate.email}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                            candidate.status === "COMPLETED"
                              ? "bg-green-100 text-green-700"
                              : candidate.status === "PENDING"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {candidate.status === "COMPLETED"
                            ? "Concluído"
                            : candidate.status === "PENDING"
                              ? "Pendente"
                              : candidate.status === "EXPIRED"
                                ? "Expirado"
                                : "Inválido"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Users className="h-12 w-12 text-gray-300 mb-2" />
                  <h3 className="text-lg font-medium">Nenhum candidato encontrado</h3>
                  <p className="text-sm text-muted-foreground">Adicione candidatos para começar a usar a plataforma</p>
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
              <CardTitle>Próximas Atividades</CardTitle>
              <CardDescription>Atividades programadas para os próximos dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full p-2 bg-blue-100 text-blue-700">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Envio de Avaliações</p>
                    <p className="text-sm text-muted-foreground">5 avaliações programadas para envio</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Hoje, 14:00</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full p-2 bg-purple-100 text-purple-700">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Relatórios Pendentes</p>
                    <p className="text-sm text-muted-foreground">3 relatórios aguardando revisão</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Amanhã, 10:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="analytics" className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Perfis DISC</CardTitle>
              <CardDescription>Visualização dos perfis comportamentais</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-4">
              <div className="w-full max-w-md">
                <DiscChart data={sampleDiscData} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estatísticas de Avaliações</CardTitle>
              <CardDescription>Métricas de uso da plataforma</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-4">
              <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-md">
                <BarChart className="h-12 w-12 text-gray-400" />
                <span className="ml-2 text-gray-500">Gráficos de estatísticas</span>
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
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <FileText className="h-12 w-12 text-gray-300 mb-2" />
              <h3 className="text-lg font-medium">Nenhum relatório recente</h3>
              <p className="text-sm text-muted-foreground">Os relatórios gerados aparecerão aqui</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
