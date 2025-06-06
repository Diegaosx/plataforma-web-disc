import type { Role } from "@prisma/client"
import "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    role: Role
    companyId?: string | null
  }

  interface Session {
    user: User
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: Role
    companyId?: string | null
  }
}
