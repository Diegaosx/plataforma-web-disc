// Dados completos para funcionamento sem banco de dados
export const mockData = {
  users: [
    {
      id: "easypanel-admin",
      name: "Administrador",
      email: "admin@dezorzi.com",
      role: "ADMIN" as const,
      companyId: null,
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    {
      id: "easypanel-consultant",
      name: "Consultor",
      email: "consultant@dezorzi.com",
      role: "CONSULTANT" as const,
      companyId: null,
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    {
      id: "easypanel-client",
      name: "Cliente",
      email: "client@empresa.com",
      role: "CLIENT" as const,
      companyId: "company-1",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
  ],
  candidates: [
    {
      id: "candidate-1",
      name: "João Silva",
      email: "joao@exemplo.com",
      status: "PENDING" as const,
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15"),
      companyId: "company-1",
      projectId: "project-1",
      assessmentSentAt: null,
      assessmentCompletedAt: null,
      assessmentLink: null,
      createdById: "easypanel-consultant",
    },
    {
      id: "candidate-2",
      name: "Maria Oliveira",
      email: "maria@exemplo.com",
      status: "COMPLETED" as const,
      createdAt: new Date("2024-01-10"),
      updatedAt: new Date("2024-01-20"),
      companyId: "company-1",
      projectId: "project-1",
      assessmentSentAt: new Date("2024-01-10"),
      assessmentCompletedAt: new Date("2024-01-20"),
      assessmentLink: "https://exemplo.com/assessment/candidate-2",
      createdById: "easypanel-consultant",
    },
    {
      id: "candidate-3",
      name: "Pedro Santos",
      email: "pedro@exemplo.com",
      status: "EXPIRED" as const,
      createdAt: new Date("2024-01-05"),
      updatedAt: new Date("2024-01-25"),
      companyId: "company-1",
      projectId: "project-1",
      assessmentSentAt: new Date("2024-01-05"),
      assessmentCompletedAt: null,
      assessmentLink: "https://exemplo.com/assessment/candidate-3",
      createdById: "easypanel-consultant",
    },
  ],
  companies: [
    {
      id: "company-1",
      name: "Dezorzi Consultoria",
      active: true,
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
      logoUrl: null,
      primaryColor: "#3B82F6",
    },
    {
      id: "company-2",
      name: "Empresa Cliente",
      active: true,
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
      logoUrl: null,
      primaryColor: "#10B981",
    },
  ],
  projects: [
    {
      id: "project-1",
      name: "Projeto Piloto",
      description: "Projeto inicial para teste da plataforma",
      active: true,
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
      companyId: "company-1",
    },
    {
      id: "project-2",
      name: "Avaliação Equipe Vendas",
      description: "Avaliação comportamental da equipe de vendas",
      active: true,
      createdAt: new Date("2024-01-05"),
      updatedAt: new Date("2024-01-05"),
      companyId: "company-2",
    },
  ],
}

export function getMockData(type: keyof typeof mockData) {
  return mockData[type]
}

// Função para simular operações de banco
export function createMockCandidate(data: any) {
  const newCandidate = {
    id: `candidate-${Date.now()}`,
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "PENDING" as const,
    assessmentSentAt: null,
    assessmentCompletedAt: null,
    assessmentLink: null,
  }

  mockData.candidates.push(newCandidate)
  return newCandidate
}
