import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../lib/auth"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 })
    }

    const { name, email, projectId, companyId, createdById } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ message: "Nome e email são obrigatórios" }, { status: 400 })
    }

    try {
      const { prisma } = await import("../../../lib/prisma")

      const candidate = await prisma.candidate.create({
        data: {
          name,
          email,
          projectId: projectId || null,
          companyId: companyId || null,
          createdById: createdById || session.user.id,
          status: "PENDING",
        },
      })

      return NextResponse.json(candidate, { status: 201 })
    } catch (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json({ message: "Erro de banco de dados" }, { status: 500 })
    }
  } catch (error) {
    console.error("Erro ao criar candidato:", error)
    return NextResponse.json({ message: "Erro ao criar candidato" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 })
    }

    try {
      const { prisma } = await import("../../../lib/prisma")

      const candidates = await prisma.candidate.findMany({
        orderBy: {
          createdAt: "desc",
        },
      })

      return NextResponse.json(candidates)
    } catch (dbError) {
      console.error("Database error:", dbError)
      // Retornar dados mock em caso de erro
      const { getMockData } = await import("../../../lib/db-fallback")
      return NextResponse.json(getMockData("candidates"))
    }
  } catch (error) {
    console.error("Erro ao buscar candidatos:", error)
    return NextResponse.json({ message: "Erro ao buscar candidatos" }, { status: 500 })
  }
}
