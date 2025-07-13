// src/components/reports/ReportsHeader.tsx
import React from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download } from "lucide-react"

interface ReportsHeaderProps {
  timeRange: string
  onTimeRangeChange: (value: string) => void
  onExportReport: () => void
}

const ReportsHeader: React.FC<ReportsHeaderProps> = ({
  timeRange,
  onTimeRangeChange,
  onExportReport,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Rapports</h1>
        <p className="text-muted-foreground">Analysez la progression du projet et les performances de l'équipe</p>
      </div>
      <div className="flex items-center space-x-2">
        <Select value={timeRange} onValueChange={onTimeRangeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sélectionner une période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Derniers 7 jours</SelectItem>
            <SelectItem value="30">Derniers 30 jours</SelectItem>
            <SelectItem value="90">Derniers 90 jours</SelectItem>
            <SelectItem value="365">Dernière année</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={onExportReport}>
          <Download className="mr-2 h-4 w-4" />
          Exporter le rapport
        </Button>
      </div>
    </div>
  )
}

export default ReportsHeader