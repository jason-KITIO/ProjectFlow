// src/hooks/useCalendarEvents.ts
import { useState, useEffect, useMemo, useCallback } from "react"
import { CalendarEvent } from "@/lib/types"
import { initialCalendarEvents } from "@/data/calendar/initialCalendarEvents" // Importez les fausses données
import { toast } from "sonner" // Pour les notifications

export const useCalendarEvents = () => {
  // currentDate est initialisé à la date actuelle par défaut.
  // Pour la démonstration, nous fixons l'année et le mois à juillet 2025.
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    // Fixe la date à Juillet 2025 pour la démo, en gardant le jour actuel si possible
    const fixedDate = new Date(2025, 6, today.getDate()); // 6 est l'index de juillet (0-based)
    return fixedDate;
  });

  const [events, setEvents] = useState<CalendarEvent[]>(initialCalendarEvents)
  const [loading, setLoading] = useState(false) // Pour simuler le chargement d'API

  // Simule le chargement des données (à adapter pour une vraie API comme Supabase)
  useEffect(() => {
    setLoading(true)
    // Ici, vous feriez un appel API pour charger les événements pour le mois/année actuel
    const timer = setTimeout(() => {
      // Pour l'instant, on utilise juste les données initiales statiques
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [currentDate]) // Re-charger si le mois change

  const getDaysInMonth = useCallback((date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }, [])

  const getFirstDayOfMonth = useCallback((date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }, [])

  const getEventsForDate = useCallback((date: string) => {
    return events.filter((event) => event.date === date)
  }, [events]) // Recalculer si les événements changent

  const formatDate = useCallback((year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }, [])

  const navigateMonth = useCallback((direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }, [])

  const getEventTypeColor = useCallback((type: string) => {
    switch (type) {
      case "projet":
        return "bg-blue-100 text-blue-800"
      case "tâche":
        return "bg-green-100 text-green-800"
      case "réunion":
        return "bg-purple-100 text-purple-800"
      case "date limite":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }, [])

  const daysInMonth = useMemo(() => getDaysInMonth(currentDate), [currentDate, getDaysInMonth])
  const firstDay = useMemo(() => getFirstDayOfMonth(currentDate), [currentDate, getFirstDayOfMonth])
  const monthNames = useMemo(() => [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
  ], [])
  const dayNames = useMemo(() => ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"], [])

  const upcomingEvents = useMemo(() => {
    // Filtrer les événements futurs ou d'aujourd'hui, trier par date et prendre les 5 prochains
    return events
      .filter((event) => new Date(event.date) >= new Date(new Date().setHours(0,0,0,0)))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5)
  }, [events])

  // --- Opérations CRUD (simulées) ---
  const addEvent = (newEvent: Omit<CalendarEvent, 'id'>) => {
    const eventToAdd: CalendarEvent = {
      ...newEvent,
      id: `cal-${Date.now()}` // Génère un ID unique
    }
    setEvents(prev => [...prev, eventToAdd])
    toast.success(`Événement '${newEvent.title}' ajouté !`)
  }

  const updateEvent = (updatedEvent: CalendarEvent) => {
    setEvents(prev => prev.map(event =>
      event.id === updatedEvent.id ? updatedEvent : event
    ))
    toast.success(`Événement '${updatedEvent.title}' mis à jour !`)
  }

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id))
    toast.success("Événement supprimé !")
  }

  return {
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
    events, // Exposer les événements si d'autres composants en ont besoin
    addEvent,
    updateEvent,
    deleteEvent,
  }
}