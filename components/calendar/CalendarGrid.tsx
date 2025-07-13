// src/components/calendar/CalendarGrid.tsx
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { CalendarEvent } from "@/lib/types" // Importer l'interface

interface CalendarGridProps {
  currentDate: Date
  navigateMonth: (direction: "prev" | "next") => void
  daysInMonth: number
  firstDay: number
  monthNames: string[]
  dayNames: string[]
  getEventsForDate: (date: string) => CalendarEvent[]
  formatDate: (year: number, month: number, day: number) => string
  getEventTypeColor: (type: string) => string
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  navigateMonth,
  daysInMonth,
  firstDay,
  monthNames,
  dayNames,
  getEventsForDate,
  formatDate,
  getEventTypeColor,
}) => {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {dayNames.map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {/* Cellules vides pour les jours avant le premier jour du mois */}
          {Array.from({ length: firstDay }, (_, i) => (
            <div key={`empty-${i}`} className="p-2 h-24"></div>
          ))}

          {/* Jours du mois */}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1
            const dateString = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day)
            const dayEvents = getEventsForDate(dateString)
            const today = new Date()
            const isToday =
              today.getFullYear() === currentDate.getFullYear() &&
              today.getMonth() === currentDate.getMonth() &&
              today.getDate() === day

            return (
              <div
                key={day}
                className={`p-1 h-24 border rounded-lg ${isToday ? "bg-blue-50 border-blue-200" : "border-gray-200"} hover:bg-gray-50 flex flex-col`}
              >
                <div className={`text-sm font-medium mb-1 ${isToday ? "text-blue-600" : ""}`}>{day}</div>
                <div className="space-y-1 overflow-y-auto custom-scrollbar">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 rounded truncate ${getEventTypeColor(event.type)}`}
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-muted-foreground mt-1">+{dayEvents.length - 2} de plus</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default CalendarGrid