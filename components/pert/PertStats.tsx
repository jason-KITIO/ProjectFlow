// src/components/pert/PertStats.tsx
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PertStatsProps {
  stats: {
    totalDuration: number
    criticalPathDuration: number
    totalNodes: number
    criticalNodes: number
    efficiency: number
  } | null
}

const PertStats: React.FC<PertStatsProps> = ({ stats }) => {
  if (!stats) return null

  return (
    <div className="grid gap-4 md:grid-cols-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Durée Totale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalDuration} jours</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Chemin Critique</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.criticalPathDuration} jours</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Activités Totales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalNodes}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Activités Critiques</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.criticalNodes}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Efficacité</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.efficiency}%</div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PertStats