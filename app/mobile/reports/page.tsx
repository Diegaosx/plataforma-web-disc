import { MobileAppLayout } from "../../../components/mobile/mobile-app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { getMockData } from "../../../lib/db-fallback"
import { FileText, Download, Eye } from "lucide-react"
import { Button } from "../../../components/ui/button"

export default function MobileReportsPage() {
  const candidates = getMockData("candidates").filter((c) => c.status === "COMPLETED")

  return (
    <MobileAppLayout>
      <div className="space-y-4">
        <h1 className="text-xl font-bold">Relatórios</h1>

        <div className="space-y-3">
          {candidates.map((candidate, index) => (
            <Card key={index} className="shadow-sm">
              <CardHeader className="py-3 px-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    Relatório DISC - {candidate.name}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="py-2 px-4">
                <div className="text-sm text-gray-600 mb-3">
                  Gerado em: {new Date(candidate.createdAt).toLocaleDateString("pt-BR")}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-1" /> Visualizar
                  </Button>
                  <Button size="sm" variant="default" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-1" /> Baixar PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MobileAppLayout>
  )
}
