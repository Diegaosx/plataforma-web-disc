"use client"

import { useState, useEffect } from "react"
import { Badge } from "../ui/badge"
import { Wifi, WifiOff, Sparkles, AlertCircle } from "lucide-react"

export function ChatStatus() {
  const [status, setStatus] = useState<"checking" | "online" | "offline" | "fallback">("checking")

  useEffect(() => {
    // Verificar status da API
    const checkApiStatus = async () => {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "test" }),
        })

        if (response.ok) {
          setStatus("online")
        } else {
          setStatus("fallback")
        }
      } catch (error) {
        setStatus("fallback")
      }
    }

    checkApiStatus()
  }, [])

  const getStatusConfig = () => {
    switch (status) {
      case "online":
        return {
          icon: Sparkles,
          text: "IA Avançada",
          color: "bg-green-500",
          variant: "default" as const,
        }
      case "fallback":
        return {
          icon: AlertCircle,
          text: "Modo Básico",
          color: "bg-yellow-500",
          variant: "secondary" as const,
        }
      case "offline":
        return {
          icon: WifiOff,
          text: "Offline",
          color: "bg-red-500",
          variant: "destructive" as const,
        }
      default:
        return {
          icon: Wifi,
          text: "Conectando...",
          color: "bg-gray-500",
          variant: "outline" as const,
        }
    }
  }

  const config = getStatusConfig()

  return (
    <Badge variant={config.variant} className="text-xs">
      <config.icon className="h-3 w-3 mr-1" />
      {config.text}
      <div className={`ml-2 h-2 w-2 ${config.color} rounded-full animate-pulse`} />
    </Badge>
  )
}
