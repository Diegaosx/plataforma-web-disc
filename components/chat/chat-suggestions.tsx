"use client"

import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { MessageCircle, HelpCircle, BarChart3, Users } from "lucide-react"

interface ChatSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void
}

export function ChatSuggestions({ onSuggestionClick }: ChatSuggestionsProps) {
  const suggestions = [
    {
      icon: HelpCircle,
      text: "O que é a metodologia DISC?",
      category: "Metodologia",
    },
    {
      icon: BarChart3,
      text: "Como funciona a plataforma?",
      category: "Plataforma",
    },
    {
      icon: Users,
      text: "Quais são os perfis DISC?",
      category: "Perfis",
    },
    {
      icon: MessageCircle,
      text: "Como aplicar uma avaliação?",
      category: "Processo",
    },
  ]

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <h4 className="text-sm font-medium mb-3 text-gray-700">Perguntas frequentes:</h4>
        <div className="grid grid-cols-1 gap-2">
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="ghost"
              className="justify-start h-auto p-2 text-left"
              onClick={() => onSuggestionClick(suggestion.text)}
            >
              <suggestion.icon className="h-4 w-4 mr-2 text-blue-600" />
              <div>
                <div className="text-sm">{suggestion.text}</div>
                <div className="text-xs text-gray-500">{suggestion.category}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
