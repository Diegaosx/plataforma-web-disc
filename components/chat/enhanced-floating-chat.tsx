"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ScrollArea } from "../ui/scroll-area"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { ChatSuggestions } from "./chat-suggestions"
import { ChatStatus } from "./chat-status"
import { Send, X, Minimize2, Maximize2, User, Sparkles } from "lucide-react"
import { cn } from "../../lib/utils"
import Image from "next/image"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function EnhancedFloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Olá! 👋 Sou a assistente virtual da Dezorzi Consultoria.\n\nPosso ajudar você com:\n• Metodologia DISC\n• Nossa plataforma\n• Processo de avaliação\n• Perfis comportamentais\n\nComo posso ajudar você hoje?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue
    if (!textToSend.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: textToSend,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)
    setShowSuggestions(false)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-5),
        }),
      })

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Desculpe, estou com dificuldades técnicas. Mas posso ajudar com informações básicas sobre DISC! Tente perguntar sobre os perfis comportamentais ou nossa metodologia. 😊",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        {/* Texto "Chat Online!" */}
        <div className="absolute -top-12 right-0 bg-white px-3 py-1 rounded-full shadow-lg border-2 border-blue-200 animate-bounce">
          <span className="text-sm font-semibold text-blue-700">Chat Online!</span>
          <div className="absolute bottom-0 right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
        </div>

        {/* Bubble do Chat com imagem maior */}
        <Button
          onClick={() => setIsOpen(true)}
          className="h-20 w-20 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:scale-110 p-0 overflow-hidden border-4 border-white"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/images/chatbot-avatar.png"
              alt="Assistente Virtual"
              width={64}
              height={64}
              className="object-contain"
              priority
            />
          </div>
        </Button>

        {/* Indicador de status online */}
        <div className="absolute -top-1 -right-1 h-6 w-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center animate-pulse">
          <Sparkles className="h-3 w-3 text-white" />
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={cn("w-80 shadow-2xl transition-all duration-300 border-0", isMinimized ? "h-14" : "h-[500px]")}>
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src="/images/chatbot-avatar.png"
                  alt="Assistente Virtual"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white/30"
                />
                <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-400 rounded-full border border-white animate-pulse" />
              </div>
              <div>
                <CardTitle className="text-sm font-semibold">Assistente Dezorzi</CardTitle>
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs opacity-90">Especialista em DISC</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-6 w-6 text-white hover:bg-white/20"
              >
                {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 text-white hover:bg-white/20"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[440px]">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {showSuggestions && messages.length === 1 && (
                  <ChatSuggestions onSuggestionClick={handleSuggestionClick} />
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex items-start space-x-2",
                      message.role === "user" ? "justify-end" : "justify-start",
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="relative">
                        <Image
                          src="/images/chatbot-avatar.png"
                          alt="Assistente"
                          width={24}
                          height={24}
                          className="rounded-full mt-1"
                        />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-3 py-2 text-sm shadow-sm",
                        message.role === "user"
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                          : "bg-gray-50 text-gray-900 border",
                      )}
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                      <p
                        className={cn(
                          "text-xs mt-1 opacity-70",
                          message.role === "user" ? "text-blue-100" : "text-gray-500",
                        )}
                      >
                        {message.timestamp.toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {message.role === "user" && (
                      <Avatar className="h-6 w-6 mt-1">
                        <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                          <User className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start space-x-2">
                    <Image
                      src="/images/chatbot-avatar.png"
                      alt="Assistente"
                      width={24}
                      height={24}
                      className="rounded-full mt-1"
                    />
                    <div className="bg-gray-50 border rounded-lg px-3 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>

            <div className="p-4 border-t bg-gray-50/50">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Pergunte sobre DISC, nossa plataforma..."
                  disabled={isLoading}
                  className="flex-1 border-gray-200 focus:border-blue-500"
                />
                <Button
                  onClick={() => sendMessage()}
                  disabled={!inputValue.trim() || isLoading}
                  size="icon"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <ChatStatus />
                <p className="text-xs text-gray-500">Enter para enviar</p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
