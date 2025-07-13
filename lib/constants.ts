// src/lib/constants.ts
export const triggerTypes = [
  { value: "task_status_change", label: "Changement de statut de tâche" },
  { value: "due_date_approaching", label: "Approche de la date d'échéance" },
  { value: "project_status_change", label: "Changement de statut de projet" },
  { value: "task_assigned", label: "Tâche assignée" },
  { value: "project_created", label: "Projet créé" },
  { value: "time_tracked", label: "Temps suivi" },
]

export const actionTypes = [
  { value: "send_notification", label: "Envoyer une notification" },
  { value: "send_email", label: "Envoyer un e-mail" },
  { value: "assign_task", label: "Assigner une tâche" },
  { value: "update_status", label: "Mettre à jour le statut" },
  { value: "create_task", label: "Créer une tâche" },
  { value: "add_comment", label: "Ajouter un commentaire" },
]