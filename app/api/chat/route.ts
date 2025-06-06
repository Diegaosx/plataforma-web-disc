import { NextResponse } from "next/server"
import { generateText } from "ai"
import { createGroq } from "@ai-sdk/groq"

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

const COMPANY_CONTEXT = `
Você é a assistente virtual da Dezorzi Consultoria, especializada em avaliação de perfil comportamental DISC.

INFORMAÇÕES DA EMPRESA:
- Nome: Dezorzi Consultoria
- Especialidade: Desenvolvimento humano e organizacional
- Foco principal: Avaliações de perfil comportamental DISC
- Missão: Transformar dados comportamentais em insights estratégicos

SOBRE A METODOLOGIA DISC:
- D (Dominância): Foco em resultados, desafios e tomada de decisões. Pessoas diretas, assertivas e orientadas para objetivos.
- I (Influência): Comunicação, influência e trabalho em equipe. Pessoas sociáveis, otimistas e persuasivas.
- S (Estabilidade): Preferência por rotinas, estabilidade e cooperação. Pessoas pacientes, leais e colaborativas.
- C (Conformidade): Atenção aos detalhes, análise e foco na qualidade. Pessoas precisas, analíticas e sistemáticas.

NOSSA PLATAFORMA:
- Sistema moderno e seguro para aplicação de avaliações DISC
- Dashboard intuitivo com métricas em tempo real
- Gestão completa de candidatos e projetos
- Relatórios automáticos com gráficos DISC
- Sistema de envio de links de avaliação
- Análises avançadas e insights comportamentais
- Conformidade total com LGPD

DIFERENCIAIS:
- Aplicação ética com ambiente controlado
- Bloqueio de acesso via celular para garantir qualidade
- Orientações claras para candidatos
- Geração automática de relatórios detalhados
- Análise de padrões comportamentais
- Suporte completo para múltiplas empresas

COMO RESPONDER:
- Seja sempre prestativa e profissional
- Use linguagem clara e acessível
- Forneça informações precisas sobre DISC
- Destaque os benefícios da nossa plataforma
- Ofereça exemplos práticos quando relevante
- Mantenha o foco em desenvolvimento humano
- Seja empática e compreensiva

Se perguntarem sobre algo fora do escopo da empresa ou DISC, redirecione educadamente para nossos temas principais.
`

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json()

    if (!message) {
      return NextResponse.json({ error: "Mensagem é obrigatória" }, { status: 400 })
    }

    // Construir contexto da conversa
    const conversationHistory =
      history?.map((msg: any) => `${msg.role === "user" ? "Usuário" : "Assistente"}: ${msg.content}`).join("\n") || ""

    const prompt = `${COMPANY_CONTEXT}

HISTÓRICO DA CONVERSA:
${conversationHistory}

NOVA PERGUNTA DO USUÁRIO: ${message}

Responda de forma natural, prestativa e focada nos serviços da Dezorzi Consultoria e metodologia DISC:`

    const { text } = await generateText({
      model: groq("llama-3.1-70b-versatile"),
      prompt,
      maxTokens: 500,
      temperature: 0.7,
    })

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error("Erro na API do chat:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
