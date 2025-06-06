import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Badge } from "../../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Mail, Send, Clock, CheckCircle, XCircle, Users, LinkIcon } from "lucide-react"

export default function SendLinksPage() {
  // Dados mock para envios
  const sentLinks = [
    {
      id: "link-1",
      candidate: "João Silva",
      email: "joao@exemplo.com",
      sentAt: new Date("2024-01-20T10:30:00"),
      status: "sent",
      opened: false,
      completed: false,
    },
    {
      id: "link-2",
      candidate: "Maria Oliveira",
      email: "maria@exemplo.com",
      sentAt: new Date("2024-01-18T14:15:00"),
      status: "completed",
      opened: true,
      completed: true,
    },
    {
      id: "link-3",
      candidate: "Pedro Santos",
      email: "pedro@exemplo.com",
      sentAt: new Date("2024-01-15T09:00:00"),
      status: "expired",
      opened: true,
      completed: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Envio de Links</h1>
          <p className="text-muted-foreground">Gerencie o envio de links de avaliação para candidatos</p>
        </div>
      </div>

      <Tabs defaultValue="send" className="space-y-6">
        <TabsList>
          <TabsTrigger value="send">Enviar Links</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="send" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="mr-2 h-5 w-5" />
                  Envio Individual
                </CardTitle>
                <CardDescription>Envie um link de avaliação para um candidato específico</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="candidate-email">Email do Candidato</Label>
                  <Input id="candidate-email" type="email" placeholder="candidato@exemplo.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="candidate-name">Nome do Candidato</Label>
                  <Input id="candidate-name" placeholder="Nome completo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem Personalizada (Opcional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Adicione uma mensagem personalizada para o candidato..."
                    rows={3}
                  />
                </div>
                <Button className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Link
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Envio em Lote
                </CardTitle>
                <CardDescription>Envie links para múltiplos candidatos de uma vez</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="csv-upload">Upload de Lista (CSV)</Label>
                  <Input id="csv-upload" type="file" accept=".csv" />
                  <p className="text-xs text-muted-foreground">Formato: nome, email, empresa (opcional)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batch-message">Mensagem para Todos</Label>
                  <Textarea
                    id="batch-message"
                    placeholder="Mensagem que será enviada para todos os candidatos..."
                    rows={3}
                  />
                </div>
                <Button className="w-full" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Enviar para Todos
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Envios</CardTitle>
              <CardDescription>Acompanhe o status dos links enviados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sentLinks.map((link) => (
                  <div key={link.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium">{link.candidate}</div>
                      <div className="text-sm text-muted-foreground">{link.email}</div>
                      <div className="text-xs text-muted-foreground">
                        Enviado em {link.sentAt.toLocaleDateString("pt-BR")} às{" "}
                        {link.sentAt.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          link.status === "completed"
                            ? "default"
                            : link.status === "expired"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {link.status === "completed" && <CheckCircle className="mr-1 h-3 w-3" />}
                        {link.status === "expired" && <XCircle className="mr-1 h-3 w-3" />}
                        {link.status === "sent" && <Clock className="mr-1 h-3 w-3" />}
                        {link.status === "completed" ? "Concluído" : link.status === "expired" ? "Expirado" : "Enviado"}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <LinkIcon className="mr-1 h-4 w-4" />
                        Reenviar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Template Padrão</CardTitle>
                <CardDescription>Mensagem padrão enviada aos candidatos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  defaultValue="Olá {nome},

Você foi convidado(a) para realizar uma avaliação de perfil comportamental DISC.

Esta avaliação é importante para entendermos melhor seu estilo de trabalho e como você pode contribuir para nossa equipe.

O link para a avaliação é: {link}

A avaliação leva aproximadamente 15-20 minutos para ser concluída.

Atenciosamente,
Equipe Dezorzi Consultoria"
                  rows={10}
                />
                <Button>Salvar Template</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Variáveis Disponíveis</CardTitle>
                <CardDescription>Use estas variáveis em seus templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <code className="text-sm">{"{nome}"}</code>
                    <span className="text-sm text-muted-foreground">Nome do candidato</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <code className="text-sm">{"{email}"}</code>
                    <span className="text-sm text-muted-foreground">Email do candidato</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <code className="text-sm">{"{link}"}</code>
                    <span className="text-sm text-muted-foreground">Link da avaliação</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <code className="text-sm">{"{empresa}"}</code>
                    <span className="text-sm text-muted-foreground">Nome da empresa</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <code className="text-sm">{"{data}"}</code>
                    <span className="text-sm text-muted-foreground">Data atual</span>
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
