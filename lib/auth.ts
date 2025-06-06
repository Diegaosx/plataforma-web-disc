import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Usuários fixos para EasyPanel (sem dependência de banco)
const EASYPANEL_USERS = [
  {
    id: "easypanel-admin",
    email: "admin@dezorzi.com",
    password: "admin123",
    name: "Administrador",
    role: "ADMIN" as const,
    companyId: null,
  },
  {
    id: "easypanel-consultant",
    email: "consultant@dezorzi.com",
    password: "consultant123",
    name: "Consultor",
    role: "CONSULTANT" as const,
    companyId: null,
  },
  {
    id: "easypanel-client",
    email: "client@empresa.com",
    password: "client123",
    name: "Cliente",
    role: "CLIENT" as const,
    companyId: "company-1",
  },
]

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

        // Verificar usuários do EasyPanel (sempre disponível)
        const user = EASYPANEL_USERS.find((u) => u.email === credentials.email && u.password === credentials.password)

        if (user) {
          console.log("✅ Login bem-sucedido com usuário EasyPanel:", user.email)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            companyId: user.companyId,
          }
        }

        console.log("❌ Credenciais inválidas para:", credentials.email)
        return null
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
  debug: false, // Desativar logs em produção
}
