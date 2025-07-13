// src/components/pert/PertChartDiagram.tsx
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Network } from "lucide-react"
import { PertProject, PertNode } from "@/lib/types" // Assuming types are defined here

interface PertChartDiagramProps {
  currentProject: PertProject | null
  zoomLevel: number
  getConnectionPath: (from: PertNode, to: PertNode) => string
}

const PertChartDiagram: React.FC<PertChartDiagramProps> = ({
  currentProject,
  zoomLevel,
  getConnectionPath,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="h-5 w-5" />
          {currentProject?.name} - Réseau PERT
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto border rounded-lg" style={{ height: "600px" }}>
          <div
            className="relative bg-gray-50"
            style={{
              width: "1000px", // Fixed width, adjust as needed or make dynamic
              height: "400px", // Fixed height, adjust as needed or make dynamic
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
                    <div>Durée: {node.duration}j</div>
                    {node.slack > 0 && <div className="text-orange-600">Marge: {node.slack}j</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PertChartDiagram