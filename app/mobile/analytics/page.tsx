import { MobileAppLayout } from "../../../components/mobile/mobile-app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Progress } from "../../../components/ui/progress"

export default function MobileAnalyticsPage() {
  // Dados simulados para os perfis DISC
  const discProfiles = [
    { type: "D - Dominância", percentage: 65, color: "bg-red-500" },
    { type: "I - Influência", percentage: 42, color: "bg-yellow-500" },
    { type: "S - Estabilidade", percentage: 78, color: "bg-green-500" },
    { type: "C - Conformidade", percentage: 53, color: "bg-blue-500" },
  ]

  return (
    <MobileAppLayout>
      <div className="space-y-4">
        <h1 className="text-xl font-bold">Análises</h1>

        <Card className="shadow-sm">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-base">Distribuição de Perfis DISC</CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-4">
            <div className="space-y-4">
              {discProfiles.map((profile, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{profile.type}</span>
                    <span>{profile.percentage}%</span>
                  </div>
                  <Progress value={profile.percentage} className={profile.color} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-base">Estatísticas Gerais</CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">42</div>
                <div className="text-xs text-gray-600">Total de Avaliações</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-green-700">78%</div>
                <div className="text-xs text-gray-600">Taxa de Conclusão</div>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-yellow-700">12</div>
                <div className="text-xs text-gray-600">Novos esta semana</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-2xl font-bold text-purple-700">8</div>
                <div className="text-xs text-gray-600">Empresas Ativas</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileAppLayout>
  )
}
