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
          // Importar Prisma dinamicamente
          const { prisma } = await import("./prisma")

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          })

          if (!user || !user.password) {
            return null
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

          // Fallback para usuários mock em desenvolvimento
          if (process.env.NODE_ENV === "development") {
            const mockUsers = [
              {
                id: "mock-admin",
                email: "admin@dezorzi.com",
                password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // admin123
                name: "Administrador",
                role: "ADMIN" as const,
                companyId: null,
              },
              {
                id: "mock-consultant",
                email: "consultant@dezorzi.com",
                password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // consultant123
                name: "Consultor",
                role: "CONSULTANT" as const,
                companyId: null,
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
