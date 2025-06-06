import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button"

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Dezorzi Consultoria"
              width={40}
              height={40}
              className="rounded"
            />
            <span className="text-xl font-bold">Dezorzi Consultoria</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline">
              Funcionalidades
            </Link>
            <Link href="#methodology" className="text-sm font-medium hover:underline">
              Metodologia DISC
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:underline">
              Contato
            </Link>
          </nav>
          <div>
            <Button asChild variant="outline" className="mr-2">
              <Link href="/login">Entrar</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight">Avaliação de Perfil Comportamental DISC</h1>
              <p className="text-gray-500 md:text-xl">
                Uma plataforma moderna, segura e ética para aplicação, gestão e análise de perfis comportamentais.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg">
                  <Link href="/login">Acessar Plataforma</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#methodology">Saiba Mais</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Análise de perfil DISC"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Funcionalidades Principais</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Aplicação Ética</h3>
                <p className="text-gray-500">
                  Ambiente controlado para aplicação do questionário, com bloqueio de acesso via celular e orientações
                  claras.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Relatórios Automáticos</h3>
                <p className="text-gray-500">
                  Geração de gráficos DISC e relatórios detalhados com análise de padrões comportamentais.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Gestão Completa</h3>
                <p className="text-gray-500">
                  Cadastro e acompanhamento de candidatos, envio de links e controle de status.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="methodology" className="py-20 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Metodologia DISC</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gray-500 mb-6">
                  A Metodologia DISC é uma ferramenta de avaliação que identifica quatro dimensões básicas do
                  comportamento humano: Dominância (D), Influência (I), Estabilidade (S) e Conformidade (C).
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-100 p-4 rounded-lg">
                    <h3 className="font-bold">Dominância (D)</h3>
                    <p className="text-sm">Foco em resultados, desafios e tomada de decisões</p>
                  </div>
                  <div className="bg-yellow-100 p-4 rounded-lg">
                    <h3 className="font-bold">Influência (I)</h3>
                    <p className="text-sm">Comunicação, influência e trabalho em equipe</p>
                  </div>
                  <div className="bg-green-100 p-4 rounded-lg">
                    <h3 className="font-bold">Estabilidade (S)</h3>
                    <p className="text-sm">Preferência por rotinas, estabilidade e cooperação</p>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h3 className="font-bold">Conformidade (C)</h3>
                    <p className="text-sm">Atenção aos detalhes, análise e foco na qualidade</p>
                  </div>
                </div>
              </div>
              <div className="relative h-[300px]">
                <Image src="/placeholder.svg?height=300&width=400" alt="Gráfico DISC" fill className="object-contain" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Dezorzi Consultoria</h3>
              <p className="text-gray-400">Soluções em desenvolvimento humano e organizacional.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/login" className="text-gray-400 hover:text-white">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="text-gray-400 hover:text-white">
                    Funcionalidades
                  </Link>
                </li>
              </ul>
            </div>
            <div id="contact">
              <h3 className="text-lg font-bold mb-4">Contato</h3>
              <address className="text-gray-400 not-italic">
                <p>contato@dezorzi.com.br</p>
                <p>+55 (XX) XXXX-XXXX</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Dezorzi Consultoria. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
