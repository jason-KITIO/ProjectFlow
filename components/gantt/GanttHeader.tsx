// src/components/gantt/GanttHeader.tsx
import React from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download } from "lucide-react"
import { GanttProject } from "@/lib/types"

interface GanttHeaderProps {
  projects: GanttProject[]
  selectedProjectId: string
  onProjectChange: (projectId: string) => void
  zoomLevel: "days" | "weeks" | "months"
  onZoomChange: (zoom: "days" | "weeks" | "months") => void
  onExport: () => void
}

const GanttHeader: React.FC<GanttHeaderProps> = ({
  projects,
  selectedProjectId,
  onProjectChange,
  zoomLevel,
  onZoomChange,
  onExport,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Diagramme de Gantt</h1>
        <p className="text-muted-foreground">Visualisez les échéanciers et les dépendances des projets</p>
      </div>
      <div className="flex items-center space-x-2">
        <Select value={selectedProjectId} onValueChange={onProjectChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sélectionner un projet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les projets</SelectItem>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={zoomLevel} onValueChange={onZoomChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="days">Jours</SelectItem>
            <SelectItem value="weeks">Semaines</SelectItem>
            <SelectItem value="months">Mois</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </div>
    </div>
  )
}

export default GanttHeader