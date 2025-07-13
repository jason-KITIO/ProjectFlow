// src/hooks/useGanttChart.ts
import { useState, useMemo, useEffect, useCallback } from "react"
import { GanttProject, GanttTask } from "@/lib/types"
import { initialGanttProjects } from "@/data/gantt/initialGanttProjects"

type ZoomLevel = "days" | "weeks" | "months"

export const useGanttChart = () => {
  const [projects, setProjects] = useState<GanttProject[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState<string>("all")
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>("weeks")
  const [loading, setLoading] = useState(true)

  // Determine the overall date range based on all tasks
  const overallDateRange = useMemo(() => {
    let minDate: Date | null = null
    let maxDate: Date | null = null

    projects.forEach((project) => {
      project.tasks.forEach((task) => {
        if (!minDate || task.startDate < minDate) {
          minDate = task.startDate
        }
        if (!maxDate || task.endDate > maxDate) {
          maxDate = task.endDate
        }
      })
    })

    // Default range if no projects/tasks are loaded yet
    const defaultStart = new Date("2024-01-01")
    const defaultEnd = new Date("2024-03-31")

    return {
      start: minDate || defaultStart,
      end: maxDate || defaultEnd,
    }
  }, [projects])

  // Simulate fetching projects on mount
  useEffect(() => {
    setLoading(true)
    // Simulate API call delay
    const timer = setTimeout(() => {
      setProjects(initialGanttProjects)
      setLoading(false)
    }, 500) // 0.5 second delay
    return () => clearTimeout(timer)
  }, [])

  const filteredProjects = useMemo(() => {
    return selectedProjectId === "all" ? projects : projects.filter((p) => p.id === selectedProjectId)
  }, [projects, selectedProjectId])

  const allTasks = useMemo(() => {
    return filteredProjects.flatMap((p) => p.tasks)
  }, [filteredProjects])

  const getDaysBetween = useCallback((start: Date, end: Date): number => {
    // Ensure both dates are at the start of the day for accurate day count
    const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    const diffTime = Math.abs(e.getTime() - s.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }, []);

  const getTaskPosition = useCallback((task: GanttTask) => {
    // We base the position on the overall date range for consistent scaling
    const totalDaysInView = getDaysBetween(overallDateRange.start, overallDateRange.end);
    
    // Calculate start offset relative to the view range start
    const startOffsetDays = getDaysBetween(overallDateRange.start, task.startDate);
    
    // Calculate task duration in days
    const taskDurationDays = getDaysBetween(task.startDate, task.endDate) || 1; // Ensure at least 1 day for calculation

    // Calculate left and width percentages
    const left = (startOffsetDays / totalDaysInView) * 100;
    const width = (taskDurationDays / totalDaysInView) * 100;

    // Clamp values to ensure they stay within 0-100%
    return { left: `${Math.max(0, left)}%`, width: `${Math.min(100 - left, width)}%` };
  }, [getDaysBetween, overallDateRange]);


  const getTimelineHeaders = useCallback(() => {
    const headers: string[] = []
    const currentDate = new Date(overallDateRange.start)
    currentDate.setHours(0, 0, 0, 0); // Normalize to start of day

    const endDate = new Date(overallDateRange.end)
    endDate.setHours(23, 59, 59, 999); // Normalize to end of day

    if (zoomLevel === "days") {
      while (currentDate <= endDate) {
        headers.push(currentDate.toLocaleDateString("fr-FR", { day: "numeric", month: "short" }))
        currentDate.setDate(currentDate.getDate() + 1)
      }
    } else if (zoomLevel === "weeks") {
      // Find the first Monday (or start of week) before or at overallDateRange.start
      const firstDayOfWeek = new Date(currentDate);
      firstDayOfWeek.setDate(currentDate.getDate() - (currentDate.getDay() + 6) % 7); // Adjust to Monday (0 for Sunday, 1 for Monday...)
      
      let weekCounter = 1;
      while (firstDayOfWeek <= endDate) {
        headers.push(`Semaine ${weekCounter++}`)
        firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 7)
      }
    } else {
      // Normalize to the start of the month
      currentDate.setDate(1)
      while (currentDate <= endDate) {
        headers.push(currentDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" }))
        currentDate.setMonth(currentDate.getMonth() + 1)
      }
    }
    return headers
  }, [overallDateRange, zoomLevel])

  const getPriorityColor = useCallback((priority: string) => {
    switch (priority) {
      case "High":
        return "border-l-red-500"
      case "Medium":
        return "border-l-yellow-500"
      case "Low":
        return "border-l-green-500"
      default:
        return "border-l-gray-500"
    }
  }, [])

  // This function would be for a simulated export
  const handleExport = () => {
    alert("Fonctionnalité d'exportation bientôt disponible ! (Simulée)")
    // In a real application, you'd generate a file (e.g., PDF, PNG, JSON) here.
  }

  return {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    zoomLevel,
    setZoomLevel,
    loading,
    filteredProjects,
    allTasks,
    getDaysBetween, // Potentially useful for other calculations
    getTaskPosition,
    getTimelineHeaders,
    getPriorityColor,
    handleExport,
    overallDateRange, // Expose the calculated date range
  }
}