// src/components/reports/ProjectStatusDistribution.tsx
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectStats } from "@/lib/types"

interface ProjectStatusDistributionProps {
  projectStats: ProjectStats[]
}

const ProjectStatusDistribution: React.FC<ProjectStatusDistributionProps> = ({ projectStats }) => {
  const statusCounts = projectStats.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const statuses = ["planning", "in_progress", "review", "completed"] // Define order

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribution du statut du projet</CardTitle>
        <CardDescription>Aperçu des statuts des projets au sein de votre organisation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-4">
          {statuses.map((status) => {
            const count = statusCounts[status] || 0
            const percentage = projectStats.length > 0 ? Math.round((count / projectStats.length) * 100) : 0

            return (
              <div key={status} className="text-center space-y-2">
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-sm text-muted-foreground capitalize">{status.replace("_", " ")}</div>
                <div className="text-xs text-muted-foreground">{percentage}%</div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectStatusDistribution