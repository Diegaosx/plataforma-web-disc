import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "../components/providers"
import { EnhancedFloatingChat } from "../components/chat/enhanced-floating-chat"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Plataforma DISC | Dezorzi Consultoria",
  description: "Plataforma de avaliação de perfil comportamental DISC",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>
          {children}
          <EnhancedFloatingChat />
        </Providers>
      </body>
    </html>
  )
}
