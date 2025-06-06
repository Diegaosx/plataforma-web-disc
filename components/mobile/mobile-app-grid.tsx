"use client"

import type React from "react"

import Link from "next/link"
import { Users, FileText, Search, Bell, Building, BarChart3, Mail, Bookmark } from "lucide-react"

interface AppMenuItem {
  icon: React.ElementType
  label: string
  href: string
  color: string
}

export function MobileAppGrid() {
  const menuItems: AppMenuItem[] = [
    {
      icon: Search,
      label: "Consulta DISC",
      href: "/mobile/search",
      color: "text-blue-700",
    },
    {
      icon: Bookmark,
      label: "Favoritos",
      href: "/mobile/favorites",
      color: "text-blue-700",
    },
    {
      icon: Users,
      label: "Candidatos",
      href: "/mobile/candidates",
      color: "text-blue-700",
    },
    {
      icon: FileText,
      label: "Relatórios",
      href: "/mobile/reports",
      color: "text-blue-700",
    },
    {
      icon: Building,
      label: "Empresas",
      href: "/mobile/companies",
      color: "text-blue-700",
    },
    {
      icon: Bell,
      label: "Notificações",
      href: "/mobile/notifications",
      color: "text-blue-700",
    },
    {
      icon: Mail,
      label: "Enviar Links",
      href: "/mobile/send-links",
      color: "text-blue-700",
    },
    {
      icon: BarChart3,
      label: "Análises",
      href: "/mobile/analytics",
      color: "text-blue-700",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {menuItems.map((item, index) => (
        <Link key={index} href={item.href}>
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center h-32 transition-transform hover:scale-105">
            <div className="mb-3 p-3 rounded-full bg-blue-50">
              <item.icon className={`h-8 w-8 ${item.color}`} />
            </div>
            <span className="text-sm font-medium text-gray-700 text-center">{item.label}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
