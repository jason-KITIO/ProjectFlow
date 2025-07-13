// src/components/reports/OverviewCards.tsx
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, Clock, CheckCircle } from "lucide-react"

interface OverviewCardsProps {
  totalProjects: number
  activeProjects: number
  completedProjects: number
  completionRate: number
  totalTasks: number
  completedTasks: number
  totalTime: number
  totalTeamMembers: number
  formatDuration: (minutes: number) => string
}

const OverviewCards: React.FC<OverviewCardsProps> = ({
  totalProjects,
  activeProjects,
  completedProjects,
  completionRate,
  totalTasks,
  completedTasks,
  totalTime,
  totalTeamMembers,
  formatDuration,
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de projets</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProjects}</div>
          <p className="text-xs text-muted-foreground">
            {activeProjects} actifs, {completedProjects} terminés
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Achèvement des tâches</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completionRate}%</div>
          <p className="text-xs text-muted-foreground">
            {completedTasks} sur {totalTasks} tâches terminées
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Temps total enregistré</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatDuration(totalTime)}</div>
          <p className="text-xs text-muted-foreground">Sur tous les projets</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Membres de l'équipe</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTeamMembers}</div>
          <p className="text-xs text-muted-foreground">Contributeurs actifs</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default OverviewCards