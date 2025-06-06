import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Badge } from "../../../components/ui/badge"
import { BarChart3, TrendingUp, Users, Target, Calendar, Award } from "lucide-react"
import { DiscChart } from "../../../components/disc-chart"

export default function AnalyticsPage() {
  const sampleDiscData = { d: 65, i: 55, s: 40, c: 50 }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Análises</h1>
          <p className="text-muted-foreground">Insights e estatísticas detalhadas das avaliações DISC</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Total de Avaliações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Target className="mr-2 h-4 w-4" />
              Taxa de Conclusão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89.3%</div>
            <p className="text-xs text-muted-foreground">+2.1% em relação ao mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Tempo Médio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18min</div>
            <p className="text-xs text-muted-foreground">-2min em relação ao mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Award className="mr-2 h-4 w-4" />
              Satisfação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">Baseado em 234 avaliações</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="profiles">Perfis DISC</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
          <TabsTrigger value="companies">Por Empresa</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Distribuição de Perfis
                </CardTitle>
                <CardDescription>Perfis DISC mais comuns nas avaliações</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span>Dominante (D)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: "35%" }} />
                      </div>
                      <span className="text-sm font-medium">35%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <span>Influente (I)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "28%" }} />
                      </div>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span>Estável (S)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "22%" }} />
                      </div>
                      <span className="text-sm font-medium">22%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span>Consciente (C)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "15%" }} />
                      </div>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Perfil Médio Geral</CardTitle>
                <CardDescription>Média de todos os perfis avaliados</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="w-64 h-64">
                  <DiscChart data={sampleDiscData} />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Padrões Comportamentais Mais Comuns
              </CardTitle>
              <CardDescription>Top 10 combinações de perfis DISC identificadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { pattern: "DC", description: "Dominante-Consciente", count: 89, percentage: 18.2 },
                  { pattern: "DI", description: "Dominante-Influente", count: 76, percentage: 15.5 },
                  { pattern: "SI", description: "Estável-Influente", count: 68, percentage: 13.9 },
                  { pattern: "SC", description: "Estável-Consciente", count: 54, percentage: 11.0 },
                  { pattern: "ID", description: "Influente-Dominante", count: 47, percentage: 9.6 },
                ].map((item, index) => (
                  <div key={item.pattern} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline">#{index + 1}</Badge>
                      <div>
                        <div className="font-medium">{item.pattern}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{item.count} pessoas</div>
                      <div className="text-sm text-muted-foreground">{item.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profiles" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { type: "D", name: "Dominância", color: "red", score: 65, description: "Foco em resultados" },
              { type: "I", name: "Influência", color: "yellow", score: 55, description: "Comunicação e pessoas" },
              { type: "S", name: "Estabilidade", color: "green", score: 40, description: "Cooperação e rotina" },
              { type: "C", name: "Conformidade", color: "blue", score: 50, description: "Qualidade e precisão" },
            ].map((profile) => (
              <Card key={profile.type}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span>{profile.name}</span>
                    <Badge variant="outline">{profile.type}</Badge>
                  </CardTitle>
                  <CardDescription>{profile.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{profile.score}%</div>
                      <div className="text-sm text-muted-foreground">Pontuação média</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-${profile.color}-500`}
                        style={{ width: `${profile.score}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
