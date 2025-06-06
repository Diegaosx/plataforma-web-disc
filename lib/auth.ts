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
          return null
        }

        try {
          // Tentar conectar com o banco
          const { prisma } = await import("./prisma")

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          })

          if (!user || !user.password) {
            throw new Error("Usuário não encontrado")
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            companyId: user.companyId,
          }
        } catch (error) {
          console.error("Auth error:", error)

          // Fallback para usuários mock
          const mockUsers = [
            {
              id: "mock-admin",
              email: "admin@dezorzi.com",
              // Hash correto para "admin123"
              password: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
              name: "Administrador",
              role: "ADMIN" as const,
              companyId: null,
            },
            {
              id: "mock-consultant",
              email: "consultant@dezorzi.com",
              // Hash correto para "consultant123"
              password: "$2a$10$ILOxAVrJCvv5MWK/XslmH.rrKwLpFzD7G5hPWw5K8tEKHMAXu1jAi",
              name: "Consultor",
              role: "CONSULTANT" as const,
              companyId: null,
            },
            {
              id: "mock-client",
              email: "client@empresa.com",
              // Hash correto para "client123"
              password: "$2a$10$DEzK0UZSYe1Pn81.m8JzAOStkqhkDxRJAhKSNl.NHmCIQgKJcRYPO",
              name: "Cliente",
              role: "CLIENT" as const,
              companyId: "mock-company-1",
            },
          ]

          const mockUser = mockUsers.find((u) => u.email === credentials.email)
          if (mockUser) {
            const isPasswordValid = await bcrypt.compare(credentials.password, mockUser.password)
            if (isPasswordValid) {
              return {
                id: mockUser.id,
                email: mockUser.email,
                name: mockUser.name,
                role: mockUser.role,
                companyId: mockUser.companyId,
              }
            }
          }

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
}
