// src/components/reports/TeamPerformanceTable.tsx
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TeamMemberStats } from "@/lib/types"

interface TeamPerformanceTableProps {
  teamStats: TeamMemberStats[]
  formatDuration: (minutes: number) => string
}

const TeamPerformanceTable: React.FC<TeamPerformanceTableProps> = ({
  teamStats,
  formatDuration,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance de l'équipe</CardTitle>
        <CardDescription>Contributions individuelles des membres de l'équipe</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {teamStats
          .sort((a, b) => b.completedTasks - a.completedTasks)
          .map((member) => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">{member.name}</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {member.activeProjects} projets
                  </Badge>
                  <span className="text-xs text-muted-foreground">{member.completedTasks} tâches terminées</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{formatDuration(member.totalTime)}</p>
                <p className="text-xs text-muted-foreground">temps enregistré</p>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  )
}

export default TeamPerformanceTable