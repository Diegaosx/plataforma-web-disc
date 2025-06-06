import { MobileAppLayout } from "../../../components/mobile/mobile-app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { getMockData } from "../../../lib/db-fallback"
import { Badge } from "../../../components/ui/badge"

export default function MobileCandidatesPage() {
  const candidates = getMockData("candidates")

  return (
    <MobileAppLayout>
      <div className="space-y-4">
        <h1 className="text-xl font-bold">Candidatos</h1>

        <div className="space-y-3">
          {candidates.map((candidate, index) => (
            <Card key={index} className="shadow-sm">
              <CardHeader className="py-3 px-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium">{candidate.name}</CardTitle>
                  <Badge variant={candidate.status === "COMPLETED" ? "success" : "outline"}>
                    {candidate.status === "COMPLETED" ? "Concluído" : "Pendente"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="py-2 px-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>{candidate.email}</span>
                  <span>{new Date(candidate.createdAt).toLocaleDateString("pt-BR")}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MobileAppLayout>
  )
}
