// src/data/reports/initialReportsData.ts
import { ProjectStats, TeamMemberStats } from "@/lib/types"

export const initialProjectStats: ProjectStats[] = [
  {
    id: "proj1",
    name: "Application Web E-commerce",
    status: "in_progress",
    progress: 75,
    totalTasks: 20,
    completedTasks: 15,
    totalTime: 12000, // 200 hours
    teamSize: 5,
  },
  {
    id: "proj2",
    name: "Refonte du site vitrine",
    status: "completed",
    progress: 100,
    totalTasks: 10,
    completedTasks: 10,
    totalTime: 4800, // 80 hours
    teamSize: 3,
  },
  {
    id: "proj3",
    name: "Application mobile de fitness",
    status: "planning",
    progress: 10,
    totalTasks: 15,
    completedTasks: 0,
    totalTime: 600, // 10 hours
    teamSize: 4,
  },
  {
    id: "proj4",
    name: "Système de gestion des stocks",
    status: "in_progress",
    progress: 50,
    totalTasks: 25,
    completedTasks: 12,
    totalTime: 9000, // 150 hours
    teamSize: 6,
  },
  {
    id: "proj5",
    name: "Développement API interne",
    status: "review",
    progress: 90,
    totalTasks: 12,
    completedTasks: 11,
    totalTime: 7200, // 120 hours
    teamSize: 2,
  },
]

export const initialTeamMemberStats: TeamMemberStats[] = [
  {
    id: "user1",
    name: "Alice Dupont",
    completedTasks: 35,
    totalTime: 9000, // 150 hours
    activeProjects: 3,
  },
  {
    id: "user2",
    name: "Bob Martin",
    completedTasks: 28,
    totalTime: 7500, // 125 hours
    activeProjects: 2,
  },
  {
    id: "user3",
    name: "Claire Moreau",
    completedTasks: 42,
    totalTime: 10500, // 175 hours
    activeProjects: 4,
  },
  {
    id: "user4",
    name: "David Dubois",
    completedTasks: 18,
    totalTime: 6000, // 100 hours
    activeProjects: 2,
  },
  {
    id: "user5",
    name: "Émilie Leclerc",
    completedTasks: 22,
    totalTime: 6800, // 113.33 hours
    activeProjects: 1,
  },
]