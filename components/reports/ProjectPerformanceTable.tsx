// src/components/reports/ProjectPerformanceTable.tsx
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ProjectStats } from "@/lib/types"

interface ProjectPerformanceTableProps {
  projectStats: ProjectStats[]
  formatDuration: (minutes: number) => string
}

const ProjectPerformanceTable: React.FC<ProjectPerformanceTableProps> = ({
  projectStats,
  formatDuration,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance du projet</CardTitle>
        <CardDescription>Progression et statut d'achèvement de tous les projets</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {projectStats.map((project) => (
          <div key={project.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">{project.name}</p>
                <div className="flex items-center space-x-2">
                  <Badge variant={project.status === "completed" ? "default" : "secondary"}>
                    {project.status.replace("_", " ")}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {project.completedTasks}/{project.totalTasks} tâches
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{project.progress}%</p>
                <p className="text-xs text-muted-foreground">{formatDuration(project.totalTime)}</p>
              </div>
            </div>
            <Progress value={project.progress} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default ProjectPerformanceTable