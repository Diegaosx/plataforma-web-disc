import * as bcrypt from "bcryptjs"

async function generateHash() {
  const password = "admin123"
  // Usando 10 rounds para o salt (padrão)
  const hash = await bcrypt.hash(password, 10)
  console.log(`Hash para '${password}': ${hash}`)
}

generateHash()
