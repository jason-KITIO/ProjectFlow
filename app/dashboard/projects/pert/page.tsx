"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Network, Download, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

interface PertNode {
  id: string
  name: string
  duration: number
  earliestStart: number
  earliestFinish: number
  latestStart: number
  latestFinish: number
  slack: number
  dependencies: string[]
  position: { x: number; y: number }
  isCritical: boolean
}

interface PertProject {
  id: string
  name: string
  nodes: PertNode[]
  criticalPath: string[]
}

export default function PertPage() {
  const [projects, setProjects] = useState<PertProject[]>([
    {
      id: "1",
      name: "Website Redesign",
      criticalPath: ["A", "B", "D"],
      nodes: [
        {
          id: "A",
          name: "Requirements Analysis",
          duration: 5,
          earliestStart: 0,
          earliestFinish: 5,
          latestStart: 0,
          latestFinish: 5,
          slack: 0,
          dependencies: [],
          position: { x: 100, y: 200 },
          isCritical: true,
        },
        {
          id: "B",
          name: "Design Phase",
          duration: 10,
          earliestStart: 5,
          earliestFinish: 15,
          latestStart: 5,
          latestFinish: 15,
          slack: 0,
          dependencies: ["A"],
          position: { x: 300, y: 200 },
          isCritical: true,
        },
        {
          id: "C",
          name: "Content Creation",
          duration: 8,
          earliestStart: 5,
          earliestFinish: 13,
          latestStart: 7,
          latestFinish: 15,
          slack: 2,
          dependencies: ["A"],
          position: { x: 300, y: 100 },
          isCritical: false,
        },
        {
          id: "D",
          name: "Development",
          duration: 15,
          earliestStart: 15,
          earliestFinish: 30,
          latestStart: 15,
          latestFinish: 30,
          slack: 0,
          dependencies: ["B", "C"],
          position: { x: 500, y: 200 },
          isCritical: true,
        },
        {
          id: "E",
          name: "Testing",
          duration: 5,
          earliestStart: 30,
          earliestFinish: 35,
          latestStart: 30,
          latestFinish: 35,
          slack: 0,
          dependencies: ["D"],
          position: { x: 700, y: 200 },
          isCritical: true,
        },
      ],
    },
    {
      id: "2",
      name: "Mobile App Development",
      criticalPath: ["F", "G", "I"],
      nodes: [
        {
          id: "F",
          name: "Market Research",
          duration: 7,
          earliestStart: 0,
          earliestFinish: 7,
          latestStart: 0,
          latestFinish: 7,
          slack: 0,
          dependencies: [],
          position: { x: 100, y: 200 },
          isCritical: true,
        },
        {
          id: "G",
          name: "UI/UX Design",
          duration: 12,
          earliestStart: 7,
          earliestFinish: 19,
          latestStart: 7,
          latestFinish: 19,
          slack: 0,
          dependencies: ["F"],
          position: { x: 300, y: 200 },
          isCritical: true,
        },
        {
          id: "H",
          name: "Backend Setup",
          duration: 10,
          earliestStart: 7,
          earliestFinish: 17,
          latestStart: 9,
          latestFinish: 19,
          slack: 2,
          dependencies: ["F"],
          position: { x: 300, y: 100 },
          isCritical: false,
        },
        {
          id: "I",
          name: "Frontend Development",
          duration: 20,
          earliestStart: 19,
          earliestFinish: 39,
          latestStart: 19,
          latestFinish: 39,
          slack: 0,
          dependencies: ["G", "H"],
          position: { x: 500, y: 200 },
          isCritical: true,
        },
      ],
    },
  ])

  const [selectedProject, setSelectedProject] = useState<string>("1")
  const [zoomLevel, setZoomLevel] = useState<number>(1)

  const currentProject = projects.find((p) => p.id === selectedProject)

  const getConnectionPath = (from: PertNode, to: PertNode) => {
    const startX = from.position.x + 120 // Node width
    const startY = from.position.y + 40 // Node height / 2
    const endX = to.position.x
    const endY = to.position.y + 40

    // Create a curved path
    const midX = (startX + endX) / 2
    return `M ${startX} ${startY} Q ${midX} ${startY} ${endX} ${endY}`
  }

  const calculateProjectStats = (project: PertProject) => {
    const totalDuration = Math.max(...project.nodes.map((n) => n.earliestFinish))
    const criticalPathDuration = project.criticalPath.reduce((sum, nodeId) => {
      const node = project.nodes.find((n) => n.id === nodeId)
      return sum + (node?.duration || 0)
    }, 0)
    const totalNodes = project.nodes.length
    const criticalNodes = project.nodes.filter((n) => n.isCritical).length

    return {
      totalDuration,
      criticalPathDuration,
      totalNodes,
      criticalNodes,
      efficiency: Math.round((criticalPathDuration / totalDuration) * 100),
    }
  }

  const stats = currentProject ? calculateProjectStats(currentProject) : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">PERT Chart</h1>
          <p className="text-muted-foreground">Program Evaluation and Review Technique visualization</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.2))}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.2))}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setZoomLevel(1)}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Project Stats */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDuration} days</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Path</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.criticalPathDuration} days</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalNodes}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.criticalNodes}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.efficiency}%</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* PERT Diagram */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            {currentProject?.name} - PERT Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto border rounded-lg" style={{ height: "600px" }}>
            <div
              className="relative bg-gray-50"
              style={{
                width: "1000px",
                height: "400px",
                transform: `scale(${zoomLevel})`,
                transformOrigin: "top left",
              }}
            >
              {/* SVG for connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {currentProject?.nodes.map((node) =>
                  node.dependencies.map((depId) => {
                    const depNode = currentProject.nodes.find((n) => n.id === depId)
                    if (!depNode) return null

                    const isCriticalConnection = node.isCritical && depNode.isCritical

                    return (
                      <path
                        key={`${depId}-${node.id}`}
                        d={getConnectionPath(depNode, node)}
                        stroke={isCriticalConnection ? "#EF4444" : "#6B7280"}
                        strokeWidth={isCriticalConnection ? "3" : "2"}
                        fill="none"
                        markerEnd="url(#arrowhead)"
                      />
                    )
                  }),
                )}

                {/* Arrow marker definition */}
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
                  </marker>
                </defs>
              </svg>

              {/* Nodes */}
              {currentProject?.nodes.map((node) => (
                <div
                  key={node.id}
                  className={`absolute border-2 rounded-lg p-3 bg-white shadow-md ${
                    node.isCritical ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                  style={{
                    left: `${node.position.x}px`,
                    top: `${node.position.y}px`,
                    width: "120px",
                    height: "80px",
                  }}
                >
                  <div className="text-center">
                    <div className="font-bold text-sm mb-1">{node.id}</div>
                    <div className="text-xs text-gray-600 mb-1 truncate" title={node.name}>
                      {node.name}
                    </div>
                    <div className="text-xs">
                      <div>Duration: {node.duration}d</div>
                      {node.slack > 0 && <div className="text-orange-600">Slack: {node.slack}d</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Critical Path Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Critical Path Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Critical Path:</h4>
              <div className="flex items-center space-x-2">
                {currentProject?.criticalPath.map((nodeId, index) => (
                  <div key={nodeId} className="flex items-center">
                    <Badge variant="destructive">{nodeId}</Badge>
                    {index < currentProject.criticalPath.length - 1 && <span className="mx-2">→</span>}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Activity Details:</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Activity</th>
                      <th className="text-left p-2">Name</th>
                      <th className="text-left p-2">Duration</th>
                      <th className="text-left p-2">ES</th>
                      <th className="text-left p-2">EF</th>
                      <th className="text-left p-2">LS</th>
                      <th className="text-left p-2">LF</th>
                      <th className="text-left p-2">Slack</th>
                      <th className="text-left p-2">Critical</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProject?.nodes.map((node) => (
                      <tr key={node.id} className="border-b">
                        <td className="p-2 font-medium">{node.id}</td>
                        <td className="p-2">{node.name}</td>
                        <td className="p-2">{node.duration}d</td>
                        <td className="p-2">{node.earliestStart}</td>
                        <td className="p-2">{node.earliestFinish}</td>
                        <td className="p-2">{node.latestStart}</td>
                        <td className="p-2">{node.latestFinish}</td>
                        <td className="p-2">{node.slack}d</td>
                        <td className="p-2">
                          {node.isCritical ? (
                            <Badge variant="destructive">Yes</Badge>
                          ) : (
                            <Badge variant="secondary">No</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
              <div className="w-4 h-4 border-2 border-red-500 bg-red-50"></div>
              <span className="text-sm">Critical Activity</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-gray-300 bg-white"></div>
              <span className="text-sm">Non-Critical Activity</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-1 bg-red-500"></div>
              <span className="text-sm">Critical Path</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-1 bg-gray-400"></div>
              <span className="text-sm">Dependency</span>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>
              <strong>ES:</strong> Earliest Start, <strong>EF:</strong> Earliest Finish
            </p>
            <p>
              <strong>LS:</strong> Latest Start, <strong>LF:</strong> Latest Finish
            </p>
            <p>
              <strong>Slack:</strong> Float time available for non-critical activities
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
