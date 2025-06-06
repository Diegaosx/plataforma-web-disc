"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { useToast } from "../ui/use-toast"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import type { Project, Company } from "@prisma/client"

export function NewCandidateForm({
  projects,
  companies,
}: {
  projects: Project[]
  companies: Company[]
}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [projectId, setProjectId] = useState<string>("")
  const [companyId, setCompanyId] = useState<string>("")
  const [notes, setNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { toast } = useToast()
  const { data: session } = useSession()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/candidates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          projectId: projectId || null,
          companyId: companyId || null,
          createdById: session?.user.id,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Erro ao adicionar candidato")
      }

      toast({
        title: "Candidato adicionado",
        description: "O candidato foi adicionado com sucesso.",
      })

      router.push("/dashboard/candidates")
      router.refresh()
    } catch (error: any) {
      toast({
        title: "Erro ao adicionar candidato",
        description: error.message || "Ocorreu um erro inesperado.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <CardHeader>
          <CardTitle>Informações do Candidato</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project">Projeto</Label>
              <Select onValueChange={setProjectId}>
                <SelectTrigger id="project">
                  <SelectValue placeholder="Selecione um projeto" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Empresa</Label>
              <Select onValueChange={setCompanyId}>
                <SelectTrigger id="company">
                  <SelectValue placeholder="Selecione uma empresa" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar Candidato"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
