"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Menu, Bell, User, X } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"

interface MobileAppLayoutProps {
  children: React.ReactNode
}

export function MobileAppLayout({ children }: MobileAppLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-800 text-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={() => setMenuOpen(true)} className="text-white">
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-white flex items-center justify-center text-blue-700 font-bold">D</div>
              <h1 className="text-lg font-semibold">Dezorzi DISC</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-white relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity",
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setMenuOpen(false)}
      />

      {/* Side Menu */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 shadow-xl",
          menuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-4 bg-gradient-to-r from-blue-700 to-blue-800 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-white flex items-center justify-center text-blue-700 font-bold">D</div>
            <span className="font-semibold">Dezorzi DISC</span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)} className="text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/mobile" className="block px-4 py-2 rounded-md hover:bg-blue-50 text-blue-700 font-medium">
                Início
              </Link>
            </li>
            <li>
              <Link href="/mobile/candidates" className="block px-4 py-2 rounded-md hover:bg-blue-50 text-gray-700">
                Candidatos
              </Link>
            </li>
            <li>
              <Link href="/mobile/reports" className="block px-4 py-2 rounded-md hover:bg-blue-50 text-gray-700">
                Relatórios
              </Link>
            </li>
            <li>
              <Link href="/mobile/projects" className="block px-4 py-2 rounded-md hover:bg-blue-50 text-gray-700">
                Projetos
              </Link>
            </li>
            <li>
              <Link href="/mobile/companies" className="block px-4 py-2 rounded-md hover:bg-blue-50 text-gray-700">
                Empresas
              </Link>
            </li>
            <li>
              <Link href="/mobile/settings" className="block px-4 py-2 rounded-md hover:bg-blue-50 text-gray-700">
                Configurações
              </Link>
            </li>
            <li>
              <Link href="/login" className="block px-4 py-2 rounded-md hover:bg-red-50 text-red-600">
                Sair
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-xs p-2 text-center">
        © {new Date().getFullYear()} Dezorzi Consultoria - Todos os direitos reservados.
      </footer>
    </div>
  )
}
