// src/components/gantt/GanttChartDisplay.tsx
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import { GanttProject, GanttTask } from "@/lib/types"

interface GanttChartDisplayProps {
  filteredProjects: GanttProject[]
  getTimelineHeaders: () => string[]
  getTaskPosition: (task: GanttTask) => { left: string; width: string }
  getPriorityColor: (priority: string) => string
  // It might be useful to pass the overallDateRange or min/max dates if needed for rendering specific timeline marks
  overallDateRange: { start: Date; end: Date };
}

const GanttChartDisplay: React.FC<GanttChartDisplayProps> = ({
  filteredProjects,
  getTimelineHeaders,
  getTaskPosition,
  getPriorityColor,
  overallDateRange
}) => {
  const timelineHeaders = getTimelineHeaders()
  
  // Calculate the number of cells needed for the timeline based on zoom level and date range
  const calculateTimelineCells = () => {
    const start = overallDateRange.start;
    const end = overallDateRange.end;
    let numCells = 0;
    const tempDate = new Date(start);

    if (getTimelineHeaders().length === 0) return 1; // Prevent division by zero if headers are empty

    if (timelineHeaders[0].startsWith("Semaine")) { // Weeks
      tempDate.setDate(start.getDate() - (start.getDay() + 6) % 7); // Go to start of the week (Monday)
      while (tempDate <= end) {
        numCells++;
        tempDate.setDate(tempDate.getDate() + 7);
      }
    } else if (timelineHeaders[0].includes(".")) { // Days (e.g., "15 juil.")
      while (tempDate <= end) {
        numCells++;
        tempDate.setDate(tempDate.getDate() + 1);
      }
    } else { // Months
      tempDate.setDate(1); // Go to start of the month
      while (tempDate <= end) {
        numCells++;
        tempDate.setMonth(tempDate.getMonth() + 1);
      }
    }
    // Ensure we have at least 1 cell to avoid issues
    return Math.max(1, numCells);
  };

  const dynamicGridCols = calculateTimelineCells();

  // Determine an appropriate min-width for the timeline based on the number of cells
  // This is a heuristic and might need fine-tuning
  const minTimelineWidth = dynamicGridCols * (
    timelineHeaders[0].startsWith("Semaine") ? 100 : // Larger for weeks/months
    timelineHeaders[0].includes(".") ? 50 : 150 // Smaller for days
  );


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Chronologie du projet
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {/* Adjusted min-width for the overall Gantt chart container */}
          <div className="min-w-[800px] pb-4" style={{ minWidth: `${300 + minTimelineWidth}px` }}> {/* Base width + dynamic timeline width */}
            {/* Timeline Header */}
            <div className="grid gap-1 mb-4 p-2 bg-gray-50 rounded" 
                 style={{ gridTemplateColumns: `minmax(250px, 3fr) minmax(80px, 1fr) minmax(80px, 1fr) repeat(${dynamicGridCols}, minmax(50px, 1fr))` }}>
              <div className="font-semibold text-sm">Tâche</div>
              <div className="font-semibold text-sm text-center">Assigné à</div>
              <div className="font-semibold text-sm text-center">Progrès</div>
              {timelineHeaders.map((header, index) => (
                <div key={index} className="text-xs text-center font-medium">
                  {header}
                </div>
              ))}
            </div>

            {/* Tasks */}
            <div className="space-y-2">
              {filteredProjects.map((project) => (
                <div key={project.id} className="space-y-1">
                  {/* Project Header */}
                  <div className="grid gap-1 p-2 bg-gray-100 rounded"
                       style={{ gridTemplateColumns: `minmax(250px, 3fr) minmax(80px, 1fr) minmax(80px, 1fr) repeat(${dynamicGridCols}, minmax(50px, 1fr))` }}>
                    <div className="font-semibold text-sm flex items-center">
                      <div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: project.color }} />
                      {project.name}
                    </div>
                    <div className="col-span-3"></div> {/* Span remaining columns for project name */}
                  </div>

                  {/* Project Tasks */}
                  {project.tasks.map((task) => {
                    const position = getTaskPosition(task)
                    return (
                      <div key={task.id} className="grid gap-1 p-2 hover:bg-gray-50 rounded"
                           style={{ gridTemplateColumns: `minmax(250px, 3fr) minmax(80px, 1fr) minmax(80px, 1fr) repeat(${dynamicGridCols}, minmax(50px, 1fr))` }}>
                        <div className="text-sm flex items-center pl-4">{task.name}</div>
                        <div className="text-center">
                          <Badge variant="outline" className="text-xs">
                            {task.assignee}
                          </Badge>
                        </div>
                        <div className="text-center">
                          <span className="text-xs">{task.progress}%</span>
                        </div>
                        <div className="relative h-8 flex items-center col-span-full" style={{ gridColumnStart: 4, gridColumnEnd: `span ${dynamicGridCols}` }}>
                            {/* Background bar representing total duration space */}
                            <div className="absolute inset-0 bg-gray-200 rounded h-6"></div>
                            {/* Actual task bar */}
                            <div
                                className={`absolute h-6 rounded border-l-4 ${getPriorityColor(task.priority)} flex items-center overflow-hidden`}
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
                                <span className="text-xs text-white font-medium px-2 truncate"
                                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }} // Add text shadow for better readability
                                >
                                    {task.name}
                                </span>
                            </div>
                            {/* Dependencies lines would go here if implemented as SVG or similar */}
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
  )
}

export default GanttChartDisplay