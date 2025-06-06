import type React from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../lib/auth"
import { DashboardHeader } from "../../components/dashboard/header"
import { DashboardSidebar } from "../../components/dashboard/sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar userRole={session.user.role} />
      <div className="flex-1 flex flex-col">
        <DashboardHeader user={session.user} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
