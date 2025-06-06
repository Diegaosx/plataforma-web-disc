export const DEZORZI_KNOWLEDGE_BASE = {
  empresa: {
    nome: "Dezorzi Consultoria",
    especialidade: "Desenvolvimento humano e organizacional",
    foco: "Avaliações de perfil comportamental DISC",
    missao: "Transformar dados comportamentais em insights estratégicos",
    valores: ["Ética", "Precisão", "Desenvolvimento", "Inovação"],
  },

  metodologia_disc: {
    definicao: "Ferramenta de avaliação que identifica quatro dimensões básicas do comportamento humano",
    dimensoes: {
      D: {
        nome: "Dominância",
        caracteristicas: [
          "Foco em resultados",
          "Desafios",
          "Tomada de decisões",
          "Assertividade",
          "Orientação para objetivos",
        ],
        comportamentos: ["Direto", "Decidido", "Competitivo", "Independente"],
      },
      I: {
        nome: "Influência",
        caracteristicas: ["Comunicação", "Influência", "Trabalho em equipe", "Sociabilidade", "Persuasão"],
        comportamentos: ["Sociável", "Otimista", "Persuasivo", "Entusiasmado"],
      },
      S: {
        nome: "Estabilidade",
        caracteristicas: ["Rotinas", "Estabilidade", "Cooperação", "Paciência", "Lealdade"],
        comportamentos: ["Paciente", "Leal", "Colaborativo", "Confiável"],
      },
      C: {
        nome: "Conformidade",
        caracteristicas: ["Atenção aos detalhes", "Análise", "Qualidade", "Precisão", "Sistematização"],
        comportamentos: ["Preciso", "Analítico", "Sistemático", "Cauteloso"],
      },
    },
  },

  plataforma: {
    recursos: [
      "Dashboard intuitivo com métricas em tempo real",
      "Gestão completa de candidatos e projetos",
      "Relatórios automáticos com gráficos DISC",
      "Sistema de envio de links de avaliação",
      "Análises avançadas e insights comportamentais",
      "Conformidade total com LGPD",
    ],
    diferenciais: [
      "Aplicação ética com ambiente controlado",
      "Bloqueio de acesso via celular para garantir qualidade",
      "Orientações claras para candidatos",
      "Geração automática de relatórios detalhados",
      "Análise de padrões comportamentais",
      "Suporte completo para múltiplas empresas",
    ],
  },

  processo_avaliacao: {
    etapas: [
      "Cadastro do candidato na plataforma",
      "Envio do link de avaliação por email",
      "Realização da avaliação (15-20 minutos)",
      "Processamento automático dos resultados",
      "Geração do relatório DISC",
      "Análise e interpretação dos resultados",
    ],
    tempo_medio: "15-20 minutos",
    ambiente: "Controlado, preferencialmente desktop",
  },
}

export function getContextualResponse(query: string): string {
  const lowerQuery = query.toLowerCase()

  // Respostas contextuais baseadas em palavras-chave
  if (lowerQuery.includes("disc") && lowerQuery.includes("o que")) {
    return "A metodologia DISC é uma ferramenta de avaliação comportamental que identifica quatro dimensões básicas do comportamento humano: Dominância (D), Influência (I), Estabilidade (S) e Conformidade (C). Cada pessoa possui uma combinação única desses perfis."
  }

  if (lowerQuery.includes("perfil") || lowerQuery.includes("perfis")) {
    return "Os quatro perfis DISC são:\n\n🔴 **Dominância (D)**: Foco em resultados e desafios\n🟡 **Influência (I)**: Comunicação e trabalho em equipe\n🟢 **Estabilidade (S)**: Preferência por rotinas e cooperação\n🔵 **Conformidade (C)**: Atenção aos detalhes e qualidade"
  }

  return ""
}
