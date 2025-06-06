import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../lib/auth"
import { getMockData, createMockCandidate } from "../../../lib/db-fallback"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 })
    }

    const { name, email, projectId, companyId } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ message: "Nome e email são obrigatórios" }, { status: 400 })
    }

    // Criar candidato usando dados mock
    const candidate = createMockCandidate({
      name,
      email,
      projectId: projectId || null,
      companyId: companyId || null,
      createdById: session.user.id,
    })

    return NextResponse.json(candidate, { status: 201 })
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

    // Retornar dados mock
    const candidates = getMockData("candidates")
    return NextResponse.json(candidates)
  } catch (error) {
    console.error("Erro ao buscar candidatos:", error)
    return NextResponse.json({ message: "Erro ao buscar candidatos" }, { status: 500 })
  }
}
