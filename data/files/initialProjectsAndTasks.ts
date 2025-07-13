// src/data/files/initialProjectsAndTasks.ts
import { ProjectRelation, TaskRelation } from "@/lib/types"

export const dummyProjects: ProjectRelation[] = [
  { id: "proj-1", name: "Refonte Site Web" },
  { id: "proj-2", name: "Développement App Mobile" },
  { id: "proj-3", name: "Campagne Marketing" },
]

export const dummyTasks: TaskRelation[] = [
  { id: "task-1", title: "Rédaction rapport final" },
  { id: "task-2", title: "Préparation présentation" },
  { id: "task-3", title: "Développement frontend" },
  { id: "task-4", title: "Tests d'intégration" },
]

export const dummyUsers = [
  { id: "user-1", full_name: "Alice Dupont" },
  { id: "user-2", full_name: "Bob Martin" },
  { id: "user-3", full_name: "Charlie Leblanc" },
];