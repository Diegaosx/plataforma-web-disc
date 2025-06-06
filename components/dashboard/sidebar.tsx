"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../../lib/utils"
import { BarChart3, Users, Building, FileText, Settings, Mail, FolderKanban, Home } from "lucide-react"
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
      icon: BarChart3,
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
    <aside className="w-64 border-r bg-white hidden md:block">
      <div className="h-16 border-b flex items-center px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold">D</div>
          <span className="font-semibold">Dezorzi</span>
        </Link>
      </div>
      <nav className="p-4 space-y-1">
        {filteredNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              pathname === item.href
                ? "bg-gray-100 text-gray-900 font-medium"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
