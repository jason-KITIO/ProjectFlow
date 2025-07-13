// src/components/pert/PertHeader.tsx
import React from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { PertProject } from "@/lib/types" // Assuming PertProject is defined in lib/types

interface PertHeaderProps {
  projects: PertProject[]
  selectedProjectId: string | null
  onProjectChange: (projectId: string) => void
  onZoomIn: () => void
  onZoomOut: () => void
  onResetZoom: () => void
  onExport: () => void
}

const PertHeader: React.FC<PertHeaderProps> = ({
  projects,
  selectedProjectId,
  onProjectChange,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onExport,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Diagramme PERT</h1>
        <p className="text-muted-foreground">Visualisation de la technique d'évaluation et d'examen des programmes</p>
      </div>
      <div className="flex items-center space-x-2">
        <Select value={selectedProjectId || ""} onValueChange={onProjectChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sélectionner un projet" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" onClick={onZoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={onZoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={onResetZoom}>
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </div>
    </div>
  )
}

export default PertHeader