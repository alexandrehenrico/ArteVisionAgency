"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { TrendingUp, TrendingDown, UserPlus, Activity, Clock } from "lucide-react"
import type { Receita, Despesa, Cliente } from "@/lib/types"

interface RecentActivitiesProps {
  receitas: Receita[]
  despesas: Despesa[]
  clientes: Cliente[]
  maxItems?: number
  className?: string
}

export function RecentActivities({ receitas, despesas, clientes, maxItems = 5, className }: RecentActivitiesProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInHours / 24)
    
    if (diffInHours < 1) return 'Agora mesmo'
    if (diffInHours < 24) return `${diffInHours}h atrás`
    if (diffInDays === 1) return 'Ontem'
    if (diffInDays < 7) return `${diffInDays} dias atrás`
    
    return new Intl.DateTimeFormat("pt-BR", {
      day: '2-digit',
      month: '2-digit'
    }).format(dateObj)
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'receita':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'despesa':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      case 'cliente':
        return <UserPlus className="h-4 w-4 text-blue-600" />
      default:
        return <Activity className="h-4 w-4 text-blue-600" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'receita':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'despesa':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'cliente':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  const getInitials = (nome: string) => {
    const words = nome.split(" ")
    if (words.length >= 2) {
      return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase()
    }
    return nome.charAt(0).toUpperCase()
  }

  // Combinar e ordenar atividades recentes
  const activities = [
    ...receitas.slice(0, 4).map((r) => ({
      type: "receita" as const,
      description: r.descricao,
      value: r.valor,
      date: r.data,
      category: r.categoria,
    })),
    ...despesas.slice(0, 4).map((d) => ({
      type: "despesa" as const,
      description: d.descricao,
      value: d.valor,
      date: d.data,
      category: d.categoria,
    })),
    ...clientes.slice(0, 3).map((c) => ({
      type: "cliente" as const,
      description: c.nome,
      value: 0,
      date: c.dataRegistro,
      category: c.servico,
    })),
  ]
    .sort((a, b) => {
      const dateA = typeof a.date === 'string' ? new Date(a.date) : a.date
      const dateB = typeof b.date === 'string' ? new Date(b.date) : b.date
      return dateB.getTime() - dateA.getTime()
    })
    .slice(0, maxItems)

  if (activities.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Activity className="h-8 w-8 text-blue-400" />
          </div>
          <h3 className="font-medium text-blue-900 mb-2">Nenhuma atividade ainda</h3>
          <p className="text-sm text-muted-foreground max-w-48">
            As atividades recentes aparecerão aqui conforme você usa o sistema
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${className || ''}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Activity className="h-5 w-5 text-blue-700" />
          </div>
          Atividades Recentes
          <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-700">
            {activities.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div 
              key={`${activity.type}-${index}`} 
              className="group flex items-center gap-4 p-3 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl border border-blue-200 transition-all duration-200"
            >
              {/* Ícone/Avatar */}
              <div className="flex-shrink-0">
                {activity.type === 'cliente' ? (
                  <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                    <AvatarFallback className="text-xs font-semibold bg-gradient-to-br from-blue-800 to-black text-white">
                      {getInitials(activity.description)}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="w-10 h-10 bg-white rounded-full border-2 border-blue-200 flex items-center justify-center shadow-sm">
                    {getActivityIcon(activity.type)}
                  </div>
                )}
              </div>

              {/* Conteúdo */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge 
                    variant="outline" 
                    className={`text-xs font-medium ${getActivityColor(activity.type)}`}
                  >
                    {activity.type === "receita" ? "Receita" : activity.type === "despesa" ? "Despesa" : "Novo Cliente"}
                  </Badge>
                  
                  {index === 0 && (
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      Mais recente
                    </Badge>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm text-blue-900 truncate">
                      {activity.description}
                    </p>
                    {activity.category && (
                      <p className="text-xs text-muted-foreground truncate">
                        {activity.category}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    {activity.type !== "cliente" && (
                      <span
                        className={`text-sm font-bold ${activity.type === "receita" ? "text-green-600" : "text-red-600"}`}
                      >
                        {activity.type === "receita" ? "+" : "-"}
                        {formatCurrency(activity.value)}
                      </span>
                    )}
                    
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(activity.date)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}