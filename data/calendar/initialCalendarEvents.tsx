// src/data/calendar/initialCalendarEvents.ts
import { CalendarEvent } from "@/lib/types"

// Fonction utilitaire pour obtenir la date formatée pour le mois et l'année actuels (Juillet 2025)
const getFormattedDate = (day: number) => {
  const year = 2025; // Année fixe pour la démo
  const month = 7; // Mois fixe (Juillet = 7)
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

export const initialCalendarEvents: CalendarEvent[] = [
  {
    id: "cal-1",
    title: "Lancement Refonte Site Web",
    date: getFormattedDate(15), // 15 juillet 2025
    type: "projet",
    project: "Refonte Site Web",
    priority: "Élevée",
  },
  {
    id: "cal-2",
    title: "Réunion Revue Design",
    date: getFormattedDate(18), // 18 juillet 2025
    type: "réunion",
    project: "Refonte Site Web",
    priority: "Moyenne",
  },
  {
    id: "cal-3",
    title: "Maquette Page d'Accueil Due",
    date: getFormattedDate(25), // 25 juillet 2025
    type: "date limite",
    project: "Refonte Site Web",
    priority: "Élevée",
  },
  {
    id: "cal-4",
    title: "Planification App Mobile",
    date: getFormattedDate(20), // 20 juillet 2025
    type: "projet",
    project: "Développement App Mobile",
    priority: "Élevée",
  },
  {
    id: "cal-5",
    title: "Lancement Campagne Marketing",
    date: getFormattedDate(30), // 30 juillet 2025
    type: "date limite",
    project: "Campagne Marketing",
    priority: "Élevée",
  },
  {
    id: "cal-6",
    title: "Réunion d'équipe hebdomadaire",
    date: getFormattedDate(7), // 7 juillet 2025
    type: "réunion",
    priority: "Moyenne",
  },
  {
    id: "cal-7",
    title: "Présentation client Alpha",
    date: getFormattedDate(10), // 10 juillet 2025
    type: "réunion",
    project: "Projet Alpha",
    priority: "Élevée",
  },
  {
    id: "cal-8",
    title: "Rédaction Cahier des charges",
    date: getFormattedDate(12), // 12 juillet 2025
    type: "tâche",
    project: "Nouveau Projet X",
    priority: "Moyenne",
  },
];