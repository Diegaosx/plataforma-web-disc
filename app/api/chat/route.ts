import { NextResponse } from "next/server"

// Verificar se a chave GROQ está disponível
const GROQ_API_KEY = process.env.GROQ_API_KEY

// Fallback para quando GROQ não estiver disponível
const FALLBACK_RESPONSES = {
  disc: "A metodologia DISC é uma ferramenta de avaliação comportamental que identifica quatro dimensões: Dominância (D), Influência (I), Estabilidade (S) e Conformidade (C). Cada pessoa possui uma combinação única desses perfis.",
  plataforma:
    "Nossa plataforma oferece um sistema completo para aplicação de avaliações DISC, com dashboard intuitivo, gestão de candidatos, relatórios automáticos e conformidade total com LGPD.",
  perfis:
    "Os quatro perfis DISC são:\n\n🔴 **Dominância (D)**: Foco em resultados e desafios\n🟡 **Influência (I)**: Comunicação e trabalho em equipe\n🟢 **Estabilidade (S)**: Preferência por rotinas e cooperação\n🔵 **Conformidade (C)**: Atenção aos detalhes e qualidade",
  avaliacao:
    "O processo de avaliação leva de 15-20 minutos e deve ser realizado em ambiente controlado, preferencialmente no desktop. Enviamos o link por email e o candidato responde às questões comportamentais.",
  empresa:
    "A Dezorzi Consultoria é especializada em desenvolvimento humano e organizacional, com foco em avaliações de perfil comportamental DISC. Nossa missão é transformar dados comportamentais em insights estratégicos.",
  default:
    "Olá! Sou a assistente da Dezorzi Consultoria. Posso ajudar com informações sobre:\n\n• Metodologia DISC\n• Nossa plataforma\n• Processo de avaliação\n• Perfis comportamentais\n\nO que gostaria de saber?",
}

function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("disc") && (lowerMessage.includes("o que") || lowerMessage.includes("que é"))) {
    return FALLBACK_RESPONSES.disc
  }

  if (lowerMessage.includes("plataforma") || lowerMessage.includes("sistema")) {
    return FALLBACK_RESPONSES.plataforma
  }

  if (lowerMessage.includes("perfil") || lowerMessage.includes("perfis")) {
    return FALLBACK_RESPONSES.perfis
  }

  if (
    lowerMessage.includes("avaliacao") ||
    lowerMessage.includes("avaliação") ||
    lowerMessage.includes("como funciona")
  ) {
    return FALLBACK_RESPONSES.avaliacao
  }

  if (lowerMessage.includes("empresa") || lowerMessage.includes("dezorzi")) {
    return FALLBACK_RESPONSES.empresa
  }

  return FALLBACK_RESPONSES.default
}

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json()

    if (!message) {
      return NextResponse.json({ error: "Mensagem é obrigatória" }, { status: 400 })
    }

    // Se GROQ não estiver configurado, usar respostas fallback
    if (!GROQ_API_KEY) {
      console.log("GROQ_API_KEY não configurada, usando respostas fallback")
      const fallbackResponse = getFallbackResponse(message)
      return NextResponse.json({ message: fallbackResponse })
    }

    // Tentar usar GROQ
    try {
      const { generateText } = await import("ai")
      const { createGroq } = await import("@ai-sdk/groq")

      const groq = createGroq({
        apiKey: GROQ_API_KEY,
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
    } catch (groqError) {
      console.error("Erro ao usar GROQ, usando fallback:", groqError)
      const fallbackResponse = getFallbackResponse(message)
      return NextResponse.json({ message: fallbackResponse })
    }
  } catch (error) {
    console.error("Erro geral na API do chat:", error)

    // Resposta de erro mais amigável
    const errorResponse =
      "Desculpe, estou com dificuldades técnicas no momento. Mas posso ajudar com informações básicas sobre nossa metodologia DISC e plataforma. O que gostaria de saber?"

    return NextResponse.json({ message: errorResponse })
  }
}
