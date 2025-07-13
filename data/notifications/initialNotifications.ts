// src/data/notifications/initialNotifications.ts
import { Notification } from "@/lib/types"

// Helper to get formatted date for demo purposes
const getFormattedDate = (minutesAgo: number) => {
  const date = new Date()
  date.setMinutes(date.getMinutes() - minutesAgo)
  return date.toISOString()
}

export const initialNotifications: Notification[] = [
  {
    id: "notif-1",
    user_id: "user-123", // Dummy user ID
    title: "Nouvelle tâche assignée",
    message: "La tâche 'Implémenter l'authentification' vous a été assignée.",
    type: "info",
    read: false,
    related_id: "task-abc",
    related_type: "task",
    created_at: getFormattedDate(10),
  },
  {
    id: "notif-2",
    user_id: "user-123",
    title: "Projet Alpha mis à jour",
    message: "Le statut du projet 'Refonte Site Web' est passé à 'En cours'.",
    type: "success",
    read: false,
    related_id: "project-xyz",
    related_type: "project",
    created_at: getFormattedDate(30),
  },
  {
    id: "notif-3",
    user_id: "user-123",
    title: "Rappel de date limite",
    message: "La tâche 'Finaliser le rapport Q2' est due demain.",
    type: "warning",
    read: false,
    related_id: "task-def",
    related_type: "task",
    created_at: getFormattedDate(60 * 2), // 2 hours ago
  },
  {
    id: "notif-4",
    user_id: "user-123",
    title: "Erreur de déploiement",
    message: "Le déploiement de la branche 'feature/v2' a échoué.",
    type: "error",
    read: true,
    related_id: "deploy-ghi",
    related_type: "deployment",
    created_at: getFormattedDate(60 * 5), // 5 hours ago
  },
  {
    id: "notif-5",
    user_id: "user-123",
    title: "Message de l'équipe",
    message: "Alice a mentionné votre nom dans le canal #général.",
    type: "info",
    read: false,
    related_id: "chat-jkl",
    related_type: "message",
    created_at: getFormattedDate(15),
  },
  {
    id: "notif-6",
    user_id: "user-123",
    title: "Rapport hebdomadaire disponible",
    message: "Votre rapport d'activité de la semaine est prêt à être consulté.",
    type: "success",
    read: true,
    related_id: "report-mno",
    related_type: "report",
    created_at: getFormattedDate(60 * 24 * 1), // 1 day ago
  },
  {
    id: "notif-7",
    user_id: "user-123",
    title: "Nouvelle mise à jour logicielle",
    message: "La version 1.5.0 est maintenant disponible avec de nouvelles fonctionnalités.",
    type: "info",
    read: true,
    related_id: null,
    related_type: null,
    created_at: getFormattedDate(60 * 24 * 2), // 2 days ago
  },
];