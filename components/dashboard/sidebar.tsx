"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../../lib/utils"
import { Users, Building, FileText, Settings, Mail, FolderKanban, Home, TrendingUp } from "lucide-react"
import type { Role } from "@prisma/client"

interface SidebarProps {
  userRole: Role
}

export function DashboardSidebar({ userRole }: SidebarProps) {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
      roles: ["ADMIN", "CONSULTANT", "CLIENT"],
    },
    {
      title: "Candidatos",
      href: "/dashboard/candidates",
      icon: Users,
      roles: ["ADMIN", "CONSULTANT", "CLIENT"],
    },
    {
      title: "Projetos",
      href: "/dashboard/projects",
      icon: FolderKanban,
      roles: ["ADMIN", "CONSULTANT"],
    },
    {
      title: "Empresas",
      href: "/dashboard/companies",
      icon: Building,
      roles: ["ADMIN", "CONSULTANT"],
    },
    {
      title: "Relatórios",
      href: "/dashboard/reports",
      icon: FileText,
      roles: ["ADMIN", "CONSULTANT", "CLIENT"],
    },
    {
      title: "Envio de Links",
      href: "/dashboard/send-links",
      icon: Mail,
      roles: ["ADMIN", "CONSULTANT"],
    },
    {
      title: "Análises",
      href: "/dashboard/analytics",
      icon: TrendingUp,
      roles: ["ADMIN", "CONSULTANT"],
    },
    {
      title: "Configurações",
      href: "/dashboard/settings",
      icon: Settings,
      roles: ["ADMIN", "CONSULTANT", "CLIENT"],
    },
  ]

  const filteredNavItems = navItems.filter((item) => item.roles.includes(userRole))

  return (
    <aside className="w-64 border-r bg-white hidden md:block shadow-sm">
      <div className="h-16 border-b flex items-center px-6 bg-gradient-to-r from-blue-600 to-blue-700">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-blue-600 font-bold shadow-sm">
            D
          </div>
          <span className="font-semibold text-white">Dezorzi DISC</span>
        </Link>
      </div>
      <nav className="p-4 space-y-1">
        {filteredNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all hover:bg-gray-100",
              pathname === item.href
                ? "bg-blue-50 text-blue-700 font-medium border-r-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900",
            )}
          >
            <item.icon className={cn("h-4 w-4", pathname === item.href ? "text-blue-600" : "text-gray-400")} />
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
