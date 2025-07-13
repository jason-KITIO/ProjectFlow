// src/app/calendar/page.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useCalendarEvents } from "@/hooks/useCalendarEvents" // Importez le nouveau hook
import CalendarGrid from "@/components/calendar/CalendarGrid" // Importez le composant de grille
import UpcomingEventsCard from "@/components/calendar/UpcomingEventsCard" // Importez le composant d'événements à venir

export default function CalendarPage() {
  const {
    currentDate,
    navigateMonth,
    daysInMonth,
    firstDay,
    monthNames,
    dayNames,
    getEventsForDate,
    formatDate,
    getEventTypeColor,
    upcomingEvents,
    loading,
    addEvent, // Exposer les fonctions CRUD si besoin pour un futur formulaire "Ajouter un événement"
    updateEvent,
    deleteEvent,
  } = useCalendarEvents()

  // Exemple de fonction pour ajouter un événement (à lier à un formulaire/dialogue)
  const handleAddEvent = () => {
    // Ici, vous ouvririez un dialogue et collecteriez les données de l'utilisateur
    // Pour l'exemple, ajoutons un événement factice
    addEvent({
      title: "Nouvel événement de test",
      date: formatDate(currentDate.getFullYear(), currentDate.getMonth(), 1), // Premier jour du mois actuel
      type: "tâche",
      project: "Projet de Test",
      priority: "Basse",
    });
  };


  return (
    <div className="space-y-6 p-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendrier</h1>
          <p className="text-muted-foreground">Consultez les plannings de projets, les échéances et les événements.</p>
        </div>
        <Button onClick={handleAddEvent}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un événement
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Composant de grille du calendrier */}
        <CalendarGrid
          currentDate={currentDate}
          navigateMonth={navigateMonth}
          daysInMonth={daysInMonth}
          firstDay={firstDay}
          monthNames={monthNames}
          dayNames={dayNames}
          getEventsForDate={getEventsForDate}
          formatDate={formatDate}
          getEventTypeColor={getEventTypeColor}
        />

        {/* Composant des événements à venir */}
        <UpcomingEventsCard
          upcomingEvents={upcomingEvents}
          getEventTypeColor={getEventTypeColor}
        />
      </div>
    </div>
  )
}