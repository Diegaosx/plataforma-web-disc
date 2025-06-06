import { NextResponse } from "next/server"

// Verificar se a chave GROQ está disponível
const GROQ_API_KEY = process.env.GROQ_API_KEY

// Base de conhecimento expandida da Dezorzi Consultoria
const DEZORZI_KNOWLEDGE = {
  empresa: {
    nome: "Dezorzi Consultoria",
    especialidade: "Desenvolvimento humano e organizacional",
    foco: "Avaliações de perfil comportamental DISC",
    missao:
      "Transformar dados comportamentais em insights estratégicos para o desenvolvimento de pessoas e organizações",
    valores: ["Ética profissional", "Precisão científica", "Desenvolvimento humano", "Inovação tecnológica"],
    diferenciais: [
      "Metodologia DISC validada cientificamente",
      "Plataforma tecnológica própria",
      "Relatórios personalizados e detalhados",
      "Suporte especializado em desenvolvimento organizacional",
    ],
  },

  metodologia_disc: {
    definicao:
      "Ferramenta de avaliação comportamental baseada na teoria de William Moulton Marston que identifica quatro dimensões básicas do comportamento humano",
    aplicacoes: [
      "Seleção e recrutamento",
      "Desenvolvimento de liderança",
      "Formação de equipes",
      "Coaching e mentoring",
      "Planejamento de carreira",
      "Resolução de conflitos",
    ],
    dimensoes: {
      D: {
        nome: "Dominância",
        caracteristicas: [
          "Foco em resultados",
          "Orientação para desafios",
          "Tomada de decisões rápidas",
          "Assertividade",
          "Competitividade",
        ],
        comportamentos: ["Direto", "Decidido", "Competitivo", "Independente", "Orientado para objetivos"],
        ambiente_ideal: "Ambientes com autonomia, desafios e oportunidades de liderança",
      },
      I: {
        nome: "Influência",
        caracteristicas: ["Comunicação eficaz", "Habilidades sociais", "Persuasão", "Otimismo", "Trabalho em equipe"],
        comportamentos: ["Sociável", "Otimista", "Persuasivo", "Entusiasmado", "Colaborativo"],
        ambiente_ideal: "Ambientes sociais, colaborativos e com reconhecimento público",
      },
      S: {
        nome: "Estabilidade",
        caracteristicas: ["Preferência por rotinas", "Estabilidade", "Cooperação", "Paciência", "Lealdade"],
        comportamentos: ["Paciente", "Leal", "Colaborativo", "Confiável", "Consistente"],
        ambiente_ideal: "Ambientes estáveis, previsíveis e com relacionamentos duradouros",
      },
      C: {
        nome: "Conformidade",
        caracteristicas: ["Atenção aos detalhes", "Análise criteriosa", "Qualidade", "Precisão", "Sistematização"],
        comportamentos: ["Preciso", "Analítico", "Sistemático", "Cauteloso", "Orientado para qualidade"],
        ambiente_ideal: "Ambientes estruturados, com padrões claros e foco na qualidade",
      },
    },
  },

  plataforma: {
    recursos: [
      "Dashboard intuitivo com métricas em tempo real",
      "Gestão completa de candidatos e projetos",
      "Sistema automatizado de envio de avaliações",
      "Relatórios DISC detalhados e personalizados",
      "Análises avançadas e insights comportamentais",
      "Conformidade total com LGPD",
      "Suporte multi-empresa",
      "Integração com sistemas de RH",
    ],
    diferenciais_tecnicos: [
      "Aplicação ética com ambiente controlado",
      "Validação de dispositivo (bloqueio mobile para garantir qualidade)",
      "Orientações claras e intuitivas para candidatos",
      "Processamento automático de resultados",
      "Geração instantânea de relatórios",
      "Análise de padrões comportamentais por IA",
      "Backup automático e segurança de dados",
    ],
  },

  processo: {
    etapas: [
      "Cadastro do candidato na plataforma",
      "Configuração do projeto e parâmetros",
      "Envio automático do link de avaliação",
      "Realização da avaliação (15-20 minutos)",
      "Processamento automático dos resultados",
      "Geração do relatório DISC personalizado",
      "Análise e interpretação dos resultados",
      "Entrega e apresentação dos insights",
    ],
    tempo_medio: "15-20 minutos para completar a avaliação",
    ambiente_recomendado: "Desktop ou laptop, ambiente silencioso e sem interrupções",
    validade: "Resultados válidos por 12-18 meses, dependendo de mudanças significativas na vida profissional",
  },
}

// Respostas inteligentes baseadas no contexto
function getIntelligentResponse(query: string): string {
  const lowerQuery = query.toLowerCase()

  // Respostas sobre DISC
  if (lowerQuery.includes("disc") && (lowerQuery.includes("o que") || lowerQuery.includes("que é"))) {
    return `A metodologia DISC é uma ferramenta de avaliação comportamental baseada na teoria de William Moulton Marston. Ela identifica quatro dimensões básicas do comportamento humano:

🔴 **Dominância (D)**: Foco em resultados e desafios
🟡 **Influência (I)**: Comunicação e trabalho em equipe  
🟢 **Estabilidade (S)**: Preferência por rotinas e cooperação
🔵 **Conformidade (C)**: Atenção aos detalhes e qualidade

Cada pessoa possui uma combinação única desses perfis, o que nos ajuda a entender seu estilo de trabalho, motivações e como pode contribuir melhor em uma equipe.`
  }

  // Respostas sobre perfis específicos
  if (lowerQuery.includes("dominan")) {
    return `**Perfil Dominância (D)** 🔴

**Características principais:**
• Foco em resultados e objetivos
• Tomada de decisões rápidas
• Orientação para desafios
• Assertividade e competitividade

**Comportamentos típicos:**
• Direto e objetivo na comunicação
• Gosta de liderar e ter autonomia
• Prefere ambientes dinâmicos
• Orientado para ação e resultados

**Ambiente ideal:** Posições de liderança, projetos desafiadores, autonomia para tomar decisões.`
  }

  if (lowerQuery.includes("influenc")) {
    return `**Perfil Influência (I)** 🟡

**Características principais:**
• Excelentes habilidades de comunicação
• Sociabilidade e otimismo
• Capacidade de persuasão
• Trabalho em equipe

**Comportamentos típicos:**
• Comunicativo e entusiasmado
• Gosta de reconhecimento público
• Prefere ambientes colaborativos
• Motivado por relacionamentos

**Ambiente ideal:** Trabalho em equipe, apresentações, networking, ambientes sociais.`
  }

  if (lowerQuery.includes("estabil")) {
    return `**Perfil Estabilidade (S)** 🟢

**Características principais:**
• Preferência por rotinas e estabilidade
• Cooperação e trabalho em equipe
• Paciência e lealdade
• Consistência nas ações

**Comportamentos típicos:**
• Paciente e confiável
• Prefere mudanças graduais
• Leal à equipe e organização
• Busca harmonia no ambiente

**Ambiente ideal:** Rotinas estabelecidas, relacionamentos duradouros, ambiente estável.`
  }

  if (lowerQuery.includes("conformid") || lowerQuery.includes("conscien")) {
    return `**Perfil Conformidade (C)** 🔵

**Características principais:**
• Atenção aos detalhes e precisão
• Análise criteriosa antes de agir
• Foco na qualidade e excelência
• Sistematização de processos

**Comportamentos típicos:**
• Analítico e cauteloso
• Busca informações antes de decidir
• Prefere padrões e procedimentos
• Orientado para qualidade

**Ambiente ideal:** Trabalho técnico, análise de dados, ambientes estruturados.`
  }

  // Respostas sobre a plataforma
  if (lowerQuery.includes("plataforma") || lowerQuery.includes("sistema")) {
    return `Nossa **Plataforma DISC** oferece uma solução completa para avaliação comportamental:

**🎯 Recursos principais:**
• Dashboard intuitivo com métricas em tempo real
• Gestão completa de candidatos e projetos
• Sistema automatizado de envio de avaliações
• Relatórios DISC detalhados e personalizados
• Análises avançadas com insights comportamentais

**🔒 Diferenciais de segurança:**
• Conformidade total com LGPD
• Ambiente controlado de aplicação
• Validação de dispositivo (recomendado desktop)
• Backup automático e segurança de dados

**💡 Inovações tecnológicas:**
• Processamento automático de resultados
• Geração instantânea de relatórios
• Análise de padrões por IA
• Integração com sistemas de RH`
  }

  // Respostas sobre o processo
  if (lowerQuery.includes("como funciona") || lowerQuery.includes("processo")) {
    return `**Como funciona nossa avaliação DISC:**

**📋 Processo passo a passo:**
1. **Cadastro** - Registramos o candidato na plataforma
2. **Envio** - Link da avaliação enviado por email
3. **Avaliação** - Candidato responde em 15-20 minutos
4. **Processamento** - Análise automática dos resultados
5. **Relatório** - Geração do perfil DISC personalizado
6. **Entrega** - Apresentação dos insights e recomendações

**⏱️ Tempo:** 15-20 minutos para completar
**💻 Ambiente:** Recomendado desktop/laptop
**📊 Resultado:** Relatório detalhado com perfil comportamental`
  }

  // Respostas sobre a empresa
  if (lowerQuery.includes("empresa") || lowerQuery.includes("dezorzi")) {
    return `**Sobre a Dezorzi Consultoria:**

**🎯 Nossa missão:** Transformar dados comportamentais em insights estratégicos para o desenvolvimento de pessoas e organizações.

**🏢 Especialidade:** Desenvolvimento humano e organizacional com foco em avaliações DISC.

**💎 Nossos valores:**
• Ética profissional
• Precisão científica  
• Desenvolvimento humano
• Inovação tecnológica

**🚀 Diferenciais:**
• Metodologia DISC validada cientificamente
• Plataforma tecnológica própria
• Relatórios personalizados e detalhados
• Suporte especializado em desenvolvimento organizacional`
  }

  // Resposta padrão
  return `Olá! Sou a assistente da Dezorzi Consultoria. Posso ajudar com informações sobre:

**🎯 Metodologia DISC**
• O que é e como funciona
• Perfis comportamentais (D, I, S, C)
• Aplicações práticas

**💻 Nossa Plataforma**
• Recursos e funcionalidades
• Processo de avaliação
• Relatórios e análises

**🏢 Dezorzi Consultoria**
• Nossa empresa e valores
• Serviços oferecidos
• Diferenciais competitivos

O que gostaria de saber especificamente?`
}

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json()

    if (!message) {
      return NextResponse.json({ error: "Mensagem é obrigatória" }, { status: 400 })
    }

    // Se GROQ não estiver configurado, usar respostas inteligentes
    if (!GROQ_API_KEY) {
      console.log("GROQ_API_KEY não configurada, usando respostas inteligentes")
      const intelligentResponse = getIntelligentResponse(message)
      return NextResponse.json({ message: intelligentResponse })
    }

    // Tentar usar GROQ
    try {
      const { generateText } = await import("ai")
      const { createGroq } = await import("@ai-sdk/groq")

      const groq = createGroq({
        apiKey: GROQ_API_KEY,
      })

      const COMPANY_CONTEXT = `
Você é a assistente virtual especializada da Dezorzi Consultoria, empresa líder em desenvolvimento humano e organizacional com foco em avaliações de perfil comportamental DISC.

INFORMAÇÕES DETALHADAS DA EMPRESA:
${JSON.stringify(DEZORZI_KNOWLEDGE, null, 2)}

INSTRUÇÕES PARA RESPONDER:
1. Seja sempre prestativa, profissional e empática
2. Use linguagem clara, acessível e amigável
3. Forneça informações precisas e detalhadas sobre DISC
4. Destaque os benefícios e diferenciais da nossa plataforma
5. Ofereça exemplos práticos e aplicações reais
6. Use emojis para tornar as respostas mais visuais e amigáveis
7. Mantenha o foco em desenvolvimento humano e organizacional
8. Se perguntarem sobre algo fora do escopo, redirecione educadamente

FORMATO DE RESPOSTA:
- Use markdown para formatação
- Organize informações em tópicos quando relevante
- Inclua emojis apropriados
- Seja concisa mas completa
- Sempre ofereça ajuda adicional no final
`

      // Construir contexto da conversa
      const conversationHistory =
        history?.map((msg: any) => `${msg.role === "user" ? "Usuário" : "Assistente"}: ${msg.content}`).join("\n") || ""

      const prompt = `${COMPANY_CONTEXT}

HISTÓRICO DA CONVERSA:
${conversationHistory}

NOVA PERGUNTA DO USUÁRIO: ${message}

Responda de forma natural, prestativa e focada nos serviços da Dezorzi Consultoria:`

      const { text } = await generateText({
        model: groq("llama-3.1-70b-versatile"),
        prompt,
        maxTokens: 800,
        temperature: 0.7,
      })

      return NextResponse.json({ message: text })
    } catch (groqError) {
      console.error("Erro ao usar GROQ, usando respostas inteligentes:", groqError)
      const intelligentResponse = getIntelligentResponse(message)
      return NextResponse.json({ message: intelligentResponse })
    }
  } catch (error) {
    console.error("Erro geral na API do chat:", error)

    const errorResponse =
      "Desculpe, estou com dificuldades técnicas no momento. Mas posso ajudar com informações sobre nossa metodologia DISC e plataforma. O que gostaria de saber? 😊"

    return NextResponse.json({ message: errorResponse })
  }
}
