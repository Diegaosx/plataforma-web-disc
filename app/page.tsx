import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../lib/auth"

export default async function Home() {
  try {
    const session = await getServerSession(authOptions)

    if (session) {
      redirect("/dashboard")
    }
  } catch (error) {
    console.error("Session error:", error)
  }

  // Redirecionar diretamente para login
  redirect("/login")
}
