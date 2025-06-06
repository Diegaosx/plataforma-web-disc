import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function GET() {
  try {
    // Testar geração de hash
    const password = "admin123"
    const hash = await bcrypt.hash(password, 10)

    // Testar verificação de hash
    const isValid = await bcrypt.compare(password, hash)

    // Testar verificação com hash fixo
    const fixedHash = "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"
    const isFixedValid = await bcrypt.compare(password, fixedHash)

    return NextResponse.json({
      status: "ok",
      message: "API de teste de login funcionando!",
      hash,
      isValid,
      isFixedValid,
      fixedHash,
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: "Erro ao testar login",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
