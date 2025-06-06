// Fallback para quando o banco não estiver disponível
export const mockData = {
  users: [
    {
      id: "mock-admin",
      name: "Administrador",
      email: "admin@dezorzi.com",
      role: "ADMIN" as const,
      companyId: null,
    },
    {
      id: "mock-consultant",
      name: "Consultor",
      email: "consultant@dezorzi.com",
      role: "CONSULTANT" as const,
      companyId: null,
    },
  ],
  candidates: [
    {
      id: "mock-candidate-1",
      name: "João Silva",
      email: "joao@exemplo.com",
      status: "PENDING" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
      companyId: null,
      projectId: null,
      assessmentSentAt: null,
      assessmentCompletedAt: null,
      assessmentLink: null,
      createdById: null,
    },
  ],
  companies: [
    {
      id: "mock-company-1",
      name: "Dezorzi Consultoria",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      logoUrl: null,
      primaryColor: null,
    },
  ],
  projects: [
    {
      id: "mock-project-1",
      name: "Projeto Piloto",
      description: "Projeto inicial para teste da plataforma",
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      companyId: "mock-company-1",
    },
  ],
}

export function getMockData(type: keyof typeof mockData) {
  return mockData[type]
}
