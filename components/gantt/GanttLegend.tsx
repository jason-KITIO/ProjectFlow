// src/components/gantt/GanttLegend.tsx
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const GanttLegend: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Légende</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-l-4 border-l-red-500 bg-gray-300"></div>
            <span className="text-sm">Priorité Haute</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-l-4 border-l-yellow-500 bg-gray-300"></div>
            <span className="text-sm">Priorité Moyenne</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-l-4 border-l-green-500 bg-gray-300"></div>
            <span className="text-sm">Priorité Basse</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-white bg-opacity-30 border"></div>
            <span className="text-sm">Progrès</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default GanttLegend