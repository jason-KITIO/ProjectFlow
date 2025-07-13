// src/components/calendar/UpcomingEventsCard.tsx
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarEvent } from "@/lib/types" // Importer l'interface

interface UpcomingEventsCardProps {
  upcomingEvents: CalendarEvent[]
  getEventTypeColor: (type: string) => string
}

const UpcomingEventsCard: React.FC<UpcomingEventsCardProps> = ({ upcomingEvents, getEventTypeColor }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Événements à venir</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingEvents.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">Aucun événement à venir pour le moment.</p>
        ) : (
          upcomingEvents.map((event) => (
            <div key={event.id} className="space-y-2">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.project}</p>
                </div>
                <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString("fr-FR")}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

export default UpcomingEventsCard