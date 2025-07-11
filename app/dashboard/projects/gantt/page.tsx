"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download } from "lucide-react"

interface GanttTask {
  id: string
  name: string
  startDate: Date
  endDate: Date
  progress: number
  dependencies: string[]
  assignee: string
  priority: "Low" | "Medium" | "High"
  project: string
}

interface GanttProject {
  id: string
  name: string
  tasks: GanttTask[]
  color: string
}

export default function GanttPage() {
  const [projects, setProjects] = useState<GanttProject[]>([
    {
      id: "1",
      name: "Website Redesign",
      color: "#3B82F6",
      tasks: [
        {
          id: "1-1",
          name: "Design Phase",
          startDate: new Date("2024-01-01"),
          endDate: new Date("2024-01-15"),
          progress: 100,
          dependencies: [],
          assignee: "JD",
          priority: "High",
          project: "Website Redesign",
        },
        {
          id: "1-2",
          name: "Development Phase",
          startDate: new Date("2024-01-16"),
          endDate: new Date("2024-02-15"),
          progress: 60,
          dependencies: ["1-1"],
          assignee: "SM",
          priority: "High",
          project: "Website Redesign",
        },
        {
          id: "1-3",
          name: "Testing Phase",
          startDate: new Date("2024-02-10"),
          endDate: new Date("2024-02-25"),
          progress: 20,
          dependencies: ["1-2"],
          assignee: "AB",
          priority: "Medium",
          project: "Website Redesign",
        },
      ],
    },
    {
      id: "2",
      name: "Mobile App Development",
      color: "#10B981",
      tasks: [
        {
          id: "2-1",
          name: "Requirements Analysis",
          startDate: new Date("2024-01-15"),
          endDate: new Date("2024-01-30"),
          progress: 90,
          dependencies: [],
          assignee: "KL",
          priority: "High",
          project: "Mobile App Development",
        },
        {
          id: "2-2",
          name: "UI/UX Design",
          startDate: new Date("2024-02-01"),
          endDate: new Date("2024-02-20"),
          progress: 40,
          dependencies: ["2-1"],
          assignee: "JD",
          priority: "High",
          project: "Mobile App Development",
        },
        {
          id: "2-3",
          name: "Backend Development",
          startDate: new Date("2024-02-15"),
          endDate: new Date("2024-03-15"),
          progress: 10,
          dependencies: ["2-1"],
          assignee: "SM",
          priority: "High",
          project: "Mobile App Development",
        },
      ],
    },
  ])

  const [selectedProject, setSelectedProject] = useState<string>("all")
  const [zoomLevel, setZoomLevel] = useState<"days" | "weeks" | "months">("weeks")
  const [viewRange, setViewRange] = useState({
    start: new Date("2024-01-01"),
    end: new Date("2024-03-31"),
  })

  const getDaysBetween = (start: Date, end: Date) => {
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const getTaskPosition = (task: GanttTask) => {
    const totalDays = getDaysBetween(viewRange.start, viewRange.end)
    const startOffset = getDaysBetween(viewRange.start, task.startDate)
    const taskDuration = getDaysBetween(task.startDate, task.endDate)

    const left = (startOffset / totalDays) * 100
    const width = (taskDuration / totalDays) * 100

    return { left: `${Math.max(0, left)}%`, width: `${Math.min(100 - left, width)}%` }
  }

  const getTimelineHeaders = () => {
    const headers = []
    const current = new Date(viewRange.start)

    while (current <= viewRange.end) {
      if (zoomLevel === "days") {
        headers.push(current.toLocaleDateString("en-US", { month: "short", day: "numeric" }))
        current.setDate(current.getDate() + 1)
      } else if (zoomLevel === "weeks") {
        headers.push(`Week ${Math.ceil(current.getDate() / 7)}`)
        current.setDate(current.getDate() + 7)
      } else {
        headers.push(current.toLocaleDateString("en-US", { month: "long", year: "numeric" }))
        current.setMonth(current.getMonth() + 1)
      }
    }

    return headers
  }

  const getPriorityColor = (priority: string) => {
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
  }

  const filteredProjects = selectedProject === "all" ? projects : projects.filter((p) => p.id === selectedProject)

  const allTasks = filteredProjects.flatMap((p) => p.tasks)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gantt Chart</h1>
          <p className="text-muted-foreground">Visualize project timelines and dependencies</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={zoomLevel} onValueChange={(value: "days" | "weeks" | "months") => setZoomLevel(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="days">Days</SelectItem>
              <SelectItem value="weeks">Weeks</SelectItem>
              <SelectItem value="months">Months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Gantt Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Project Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Timeline Header */}
              <div className="grid grid-cols-12 gap-1 mb-4 p-2 bg-gray-50 rounded">
                <div className="col-span-3 font-semibold text-sm">Task</div>
                <div className="col-span-1 font-semibold text-sm text-center">Assignee</div>
                <div className="col-span-1 font-semibold text-sm text-center">Progress</div>
                <div className="col-span-7">
                  <div className="grid grid-cols-7 gap-1">
                    {getTimelineHeaders()
                      .slice(0, 7)
                      .map((header, index) => (
                        <div key={index} className="text-xs text-center font-medium">
                          {header}
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-2">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="space-y-1">
                    {/* Project Header */}
                    <div className="grid grid-cols-12 gap-1 p-2 bg-gray-100 rounded">
                      <div className="col-span-3 font-semibold text-sm flex items-center">
                        <div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: project.color }} />
                        {project.name}
                      </div>
                      <div className="col-span-9"></div>
                    </div>

                    {/* Project Tasks */}
                    {project.tasks.map((task) => {
                      const position = getTaskPosition(task)
                      return (
                        <div key={task.id} className="grid grid-cols-12 gap-1 p-2 hover:bg-gray-50 rounded">
                          <div className="col-span-3 text-sm flex items-center pl-4">{task.name}</div>
                          <div className="col-span-1 text-center">
                            <Badge variant="outline" className="text-xs">
                              {task.assignee}
                            </Badge>
                          </div>
                          <div className="col-span-1 text-center">
                            <span className="text-xs">{task.progress}%</span>
                          </div>
                          <div className="col-span-7 relative h-8 flex items-center">
                            <div className="absolute inset-0 bg-gray-200 rounded h-6"></div>
                            <div
                              className={`absolute h-6 rounded border-l-4 ${getPriorityColor(task.priority)} flex items-center`}
                              style={{
                                left: position.left,
                                width: position.width,
                                backgroundColor: project.color,
                                opacity: 0.8,
                              }}
                            >
                              <div
                                className="h-full bg-white bg-opacity-30 rounded-r"
                                style={{ width: `${task.progress}%` }}
                              />
                              <span className="text-xs text-white font-medium px-2 truncate">{task.name}</span>
                            </div>
                            {/* Dependencies lines would go here */}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-l-4 border-l-red-500 bg-gray-300"></div>
              <span className="text-sm">High Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-l-4 border-l-yellow-500 bg-gray-300"></div>
              <span className="text-sm">Medium Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-l-4 border-l-green-500 bg-gray-300"></div>
              <span className="text-sm">Low Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-white bg-opacity-30 border"></div>
              <span className="text-sm">Progress</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
