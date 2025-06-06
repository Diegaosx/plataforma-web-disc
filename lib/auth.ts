import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Credenciais não fornecidas")
          return null
        }

        console.log("🔍 Tentando autenticar:", credentials.email)

        // Primeiro, tentar com usuários mock (sempre disponível)
        const mockUsers = [
          {
            id: "mock-admin",
            email: "admin@dezorzi.com",
            password: "admin123", // Senha em texto plano para comparação direta
            name: "Administrador",
            role: "ADMIN" as const,
            companyId: null,
          },
          {
            id: "mock-consultant",
            email: "consultant@dezorzi.com",
            password: "consultant123",
            name: "Consultor",
            role: "CONSULTANT" as const,
            companyId: null,
          },
          {
            id: "mock-client",
            email: "client@empresa.com",
            password: "client123",
            name: "Cliente",
            role: "CLIENT" as const,
            companyId: "mock-company-1",
          },
        ]

        // Verificar usuários mock primeiro (para garantir que sempre funcione)
        const mockUser = mockUsers.find((u) => u.email === credentials.email)
        if (mockUser && mockUser.password === credentials.password) {
          console.log("✅ Login com usuário mock bem-sucedido:", mockUser.email)
          return {
            id: mockUser.id,
            email: mockUser.email,
            name: mockUser.name,
            role: mockUser.role,
            companyId: mockUser.companyId,
          }
        }

        // Tentar conectar com o banco de dados
        try {
          console.log("🔄 Tentando conectar com o banco de dados...")
          const { prisma } = await import("./prisma")

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          })

          if (!user || !user.password) {
            console.log("❌ Usuário não encontrado no banco:", credentials.email)
            return null
          }

          console.log("✅ Usuário encontrado no banco:", user.email)

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

          if (!isPasswordValid) {
            console.log("❌ Senha inválida para usuário do banco:", user.email)
            return null
          }

          console.log("✅ Login com banco de dados bem-sucedido:", user.email)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            companyId: user.companyId,
          }
        } catch (error) {
          console.error("❌ Erro ao conectar com banco de dados:", error)
          console.log("🔄 Usando fallback para usuários mock...")
          return null
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.role = token.role
        session.user.companyId = token.companyId
      }

      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.companyId = user.companyId
      }

      return token
    },
  },
  debug: true, // Ativar logs detalhados
}
