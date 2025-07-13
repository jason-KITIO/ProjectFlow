// src/app/project/pert/page.tsx
"use client"

import { usePertChart } from "@/hooks/usePertChart"
import PertHeader from "@/components/pert/PertHeader"
import PertStats from "@/components/pert/PertStats"
import PertChartDiagram from "@/components/pert/PertChartDiagram"
import PertCriticalPath from "@/components/pert/PertCriticalPath"
import PertLegend from "@/components/pert/PertLegend"

export default function PertPage() {
  const {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    currentProject,
    zoomLevel,
    loading,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    handleExport,
    getConnectionPath,
    calculateProjectStats,
  } = usePertChart()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <PertHeader
        projects={projects}
        selectedProjectId={selectedProjectId}
        onProjectChange={setSelectedProjectId}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetZoom={handleResetZoom}
        onExport={handleExport}
      />

      {/* Project Stats */}
      <PertStats stats={calculateProjectStats} />

      {/* PERT Diagram */}
      <PertChartDiagram
        currentProject={currentProject}
        zoomLevel={zoomLevel}
        getConnectionPath={getConnectionPath}
      />

      {/* Critical Path Analysis */}
      <PertCriticalPath currentProject={currentProject} />

      {/* Legend */}
      <PertLegend />
    </div>
  )
}