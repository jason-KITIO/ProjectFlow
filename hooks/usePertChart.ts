// src/hooks/usePertChart.ts
import { useState, useMemo, useEffect } from "react"
import { PertNode, PertProject } from "@/lib/types"
import { initialPertProjects } from "@/data/pert/initialPertProjects"

export const usePertChart = () => {
  const [projects, setProjects] = useState<PertProject[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [loading, setLoading] = useState(true)

  // Simulate fetching projects on mount
  useEffect(() => {
    setLoading(true)
    // Simulate API call delay
    const timer = setTimeout(() => {
      setProjects(initialPertProjects)
      if (initialPertProjects.length > 0) {
        setSelectedProjectId(initialPertProjects[0].id)
      }
      setLoading(false)
    }, 500) // 0.5 second delay
    return () => clearTimeout(timer)
  }, [])

  const currentProject = useMemo(
    () => projects.find((p) => p.id === selectedProjectId),
    [projects, selectedProjectId]
  )

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(2, prev + 0.2))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(0.5, prev - 0.2))
  }

  const handleResetZoom = () => {
    setZoomLevel(1)
  }

  // This function would be for a simulated export
  const handleExport = () => {
    alert("Export feature coming soon! (Simulated)")
    // In a real application, you'd generate a file (e.g., PDF, PNG, JSON) here.
  }

  const getConnectionPath = (from: PertNode, to: PertNode) => {
    const startX = from.position.x + 120 // Node width
    const startY = from.position.y + 40 // Node height / 2
    const endX = to.position.x
    const endY = to.position.y + 40

    // Create a curved path for better visualization
    const controlPointX = startX + (endX - startX) * 0.5; // Midpoint X
    const controlPointY = startY; // Keep Y close to startY for a gentle curve
    
    // Adjust control point if nodes are vertically aligned or close
    if (Math.abs(startY - endY) > 50 && startX < endX) {
      // If nodes are far apart vertically, create a more pronounced S-curve or step
      // Simple cubic bezier for more control (startX, startY) C (cx1, cy1) (cx2, cy2) (endX, endY)
      const cx1 = startX + (endX - startX) / 3;
      const cy1 = startY;
      const cx2 = startX + 2 * (endX - startX) / 3;
      const cy2 = endY;
      return `M ${startX} ${startY} C ${cx1} ${cy1} ${cx2} ${cy2} ${endX} ${endY}`;
    } else {
      // For general cases or horizontal flow, use quadratic bezier
      return `M ${startX} ${startY} Q ${controlPointX} ${controlPointY} ${endX} ${endY}`;
    }
  }


  const calculateProjectStats = useMemo(() => {
    if (!currentProject) return null

    const totalDuration = Math.max(...currentProject.nodes.map((n) => n.earliestFinish))
    const criticalPathDuration = currentProject.criticalPath.reduce((sum, nodeId) => {
      const node = currentProject.nodes.find((n) => n.id === nodeId)
      return sum + (node?.duration || 0)
    }, 0)
    const totalNodes = currentProject.nodes.length
    const criticalNodes = currentProject.nodes.filter((n) => n.isCritical).length

    return {
      totalDuration,
      criticalPathDuration,
      totalNodes,
      criticalNodes,
      efficiency: totalDuration > 0 ? Math.round((criticalPathDuration / totalDuration) * 100) : 0,
    }
  }, [currentProject])

  return {
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
  }
}