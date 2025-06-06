import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Switch } from "../../../components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Separator } from "../../../components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Badge } from "../../../components/ui/badge"
import { User, Bell, Shield, Palette, Mail, Database } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">Gerencie suas preferências e configurações da conta</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Informações Pessoais
              </CardTitle>
              <CardDescription>Atualize suas informações de perfil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder.svg" alt="Foto do perfil" />
                  <AvatarFallback className="text-lg">AD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline">Alterar Foto</Button>
                  <p className="text-sm text-muted-foreground">JPG, PNG ou GIF. Máximo 2MB.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" defaultValue="Administrador" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="admin@dezorzi.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(11) 99999-9999" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Função</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="role" defaultValue="Administrador" disabled />
                    <Badge>ADMIN</Badge>
                  </div>
                </div>
              </div>

              <Button>Salvar Alterações</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Preferências de Notificação
              </CardTitle>
              <CardDescription>Configure como você deseja receber notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações por Email</Label>
                    <p className="text-sm text-muted-foreground">Receba atualizações importantes por email</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Avaliações Concluídas</Label>
                    <p className="text-sm text-muted-foreground">Notificar quando uma avaliação for concluída</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Novos Candidatos</Label>
                    <p className="text-sm text-muted-foreground">Notificar quando novos candidatos forem adicionados</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Relatórios Semanais</Label>
                    <p className="text-sm text-muted-foreground">Receba um resumo semanal das atividades</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Links Expirados</Label>
                    <p className="text-sm text-muted-foreground">Notificar quando links de avaliação expirarem</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Segurança da Conta
              </CardTitle>
              <CardDescription>Mantenha sua conta segura</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Senha Atual</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nova Senha</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>

              <Button>Alterar Senha</Button>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autenticação de Dois Fatores</Label>
                    <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
                  </div>
                  <Button variant="outline">Configurar</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sessões Ativas</Label>
                    <p className="text-sm text-muted-foreground">Gerencie dispositivos conectados</p>
                  </div>
                  <Button variant="outline">Ver Sessões</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="mr-2 h-5 w-5" />
                Aparência
              </CardTitle>
              <CardDescription>Personalize a aparência da plataforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Tema</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col items-center space-y-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="w-8 h-8 bg-white border rounded" />
                      <span className="text-sm">Claro</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="w-8 h-8 bg-gray-900 rounded" />
                      <span className="text-sm">Escuro</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="w-8 h-8 bg-gradient-to-br from-white to-gray-900 rounded" />
                      <span className="text-sm">Sistema</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Cor Primária</Label>
                  <div className="flex space-x-2">
                    {["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"].map((color) => (
                      <div
                        key={color}
                        className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Integrações
              </CardTitle>
              <CardDescription>Configure integrações com serviços externos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-8 w-8 text-blue-600" />
                    <div>
                      <div className="font-medium">Email (SMTP)</div>
                      <div className="text-sm text-muted-foreground">Configurar servidor de email</div>
                    </div>
                  </div>
                  <Badge variant="outline">Não Configurado</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Database className="h-8 w-8 text-green-600" />
                    <div>
                      <div className="font-medium">Railway PostgreSQL</div>
                      <div className="text-sm text-muted-foreground">Banco de dados principal</div>
                    </div>
                  </div>
                  <Badge variant="destructive">Erro de Conexão</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-purple-100 rounded flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-sm">API</span>
                    </div>
                    <div>
                      <div className="font-medium">Webhook URLs</div>
                      <div className="text-sm text-muted-foreground">Notificações automáticas</div>
                    </div>
                  </div>
                  <Button variant="outline">Configurar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
