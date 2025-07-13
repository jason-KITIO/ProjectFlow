// src/app/project/gantt/page.tsx
"use client"

import { useGanttChart } from "@/hooks/useGanttChart"
import GanttHeader from "@/components/gantt/GanttHeader"
import GanttChartDisplay from "@/components/gantt/GanttChartDisplay"
import GanttLegend from "@/components/gantt/GanttLegend"

export default function GanttPage() {
  const {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    zoomLevel,
    setZoomLevel,
    loading,
    filteredProjects,
    getTimelineHeaders,
    getTaskPosition,
    getPriorityColor,
    handleExport,
    overallDateRange,
  } = useGanttChart()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p className="ml-2 text-gray-700">Chargement du diagramme de Gantt...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <GanttHeader
        projects={projects}
        selectedProjectId={selectedProjectId}
        onProjectChange={setSelectedProjectId}
        zoomLevel={zoomLevel}
        onZoomChange={setZoomLevel}
        onExport={handleExport}
      />

      {/* Gantt Chart */}
      <GanttChartDisplay
        filteredProjects={filteredProjects}
        getTimelineHeaders={getTimelineHeaders}
        getTaskPosition={getTaskPosition}
        getPriorityColor={getPriorityColor}
        overallDateRange={overallDateRange}
      />

      {/* Legend */}
      <GanttLegend />
    </div>
  )
}