"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { useToast } from "./ui/use-toast"
import { User, KeyRound } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      console.log("Tentando login com:", { email, password })

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      console.log("Resultado do login:", result)

      if (result?.error) {
        setError("Email ou senha incorretos")
        toast({
          title: "Erro ao fazer login",
          description: "Email ou senha incorretos",
          variant: "destructive",
        })
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (error) {
      console.error("Erro no login:", error)
      setError("Ocorreu um erro inesperado. Tente novamente.")
      toast({
        title: "Erro ao fazer login",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Função para preencher automaticamente os dados de login
  const fillLoginData = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
  }

  // Lista de usuários de demonstração
  const demoUsers = [
    { email: "admin@dezorzi.com", password: "admin123", role: "Administrador" },
    { email: "consultant@dezorzi.com", password: "consultant123", role: "Consultor" },
    { email: "client@empresa.com", password: "client123", role: "Cliente" },
  ]

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Acesse a plataforma DISC da Dezorzi Consultoria</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          {error && <div className="bg-red-50 p-3 rounded-md text-red-700 text-sm">{error}</div>}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@dezorzi.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="admin123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-md">
            <p className="font-medium mb-3 text-sm flex items-center">
              <KeyRound className="h-4 w-4 mr-1" /> Login rápido (clique para preencher):
            </p>
            <div className="space-y-2">
              {demoUsers.map((user, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => fillLoginData(user.email, user.password)}
                  className="w-full flex items-center justify-between p-2 text-sm bg-white hover:bg-gray-50 border rounded-md transition-colors"
                >
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="font-medium">{user.role}</span>
                  </div>
                  <span className="text-gray-500 text-xs">{user.email}</span>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
