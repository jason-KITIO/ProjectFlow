// src/data/time-tracking/initialTimeEntries.ts
import { TimeEntry } from "@/lib/types";
import { getFakeTaskWithProject } from "./fakeTasksProjects";

const userId = "your-mock-user-id"; // Replace with a consistent mock user ID for testing

export const initialTimeEntries: TimeEntry[] = [
  {
    id: "entry-1",
    task_id: "task-1",
    user_id: userId,
    description: "Travail sur le wireframe de la page d'accueil.",
    start_time: new Date(2025, 6, 11, 9, 0).toISOString(), // July 11, 9:00 AM
    end_time: new Date(2025, 6, 11, 10, 30).toISOString(), // July 11, 10:30 AM
    duration: 90, // minutes
    created_at: new Date(2025, 6, 11, 10, 30).toISOString(),
    task: getFakeTaskWithProject("task-1"),
  },
  {
    id: "entry-2",
    task_id: "task-5",
    user_id: userId,
    description: "Participation à la réunion de planification hebdomadaire.",
    start_time: new Date(2025, 6, 11, 11, 0).toISOString(),
    end_time: new Date(2025, 6, 11, 12, 0).toISOString(),
    duration: 60,
    created_at: new Date(2025, 6, 11, 12, 0).toISOString(),
    task: getFakeTaskWithProject("task-5"),
  },
  {
    id: "entry-3",
    task_id: "task-3",
    user_id: userId,
    description: "Correction de bugs sur l'écran de connexion iOS.",
    start_time: new Date(2025, 6, 10, 14, 0).toISOString(), // July 10
    end_time: new Date(2025, 6, 10, 16, 0).toISOString(),
    duration: 120,
    created_at: new Date(2025, 6, 10, 16, 0).toISOString(),
    task: getFakeTaskWithProject("task-3"),
  },
  {
    id: "entry-4",
    task_id: null, // No task assigned
    user_id: userId,
    description: "Réponse aux e-mails et organisation de la journée.",
    start_time: new Date(2025, 6, 10, 8, 30).toISOString(),
    end_time: new Date(2025, 6, 10, 9, 0).toISOString(),
    duration: 30,
    created_at: new Date(2025, 6, 10, 9, 0).toISOString(),
    task: null,
  },
  {
    id: "entry-5",
    task_id: "task-4",
    user_id: userId,
    description: "Préparation du rapport mensuel de marketing.",
    start_time: new Date(2025, 6, 8, 9, 0).toISOString(), // July 8 (previous week)
    end_time: new Date(2025, 6, 8, 13, 0).toISOString(),
    duration: 240,
    created_at: new Date(2025, 6, 8, 13, 0).toISOString(),
    task: getFakeTaskWithProject("task-4"),
  },
];
