// src/data/time-tracking/fakeTasksProjects.ts
import { Project, Task } from "@/lib/types";

export const fakeProjects: Project[] = [
  {
    id: "proj-1",
    name: "Refonte du site web",
    description: "",
    status: "Planification",
    progress: 0,
    startDate: "",
    endDate: "",
    team: [],
    priority: "Basse",
  },
  {
    id: "proj-2",
    name: "Développement application mobile",
    description: "",
    status: "Planification",
    progress: 0,
    startDate: "",
    endDate: "",
    team: [],
    priority: "Basse",
  },
  {
    id: "proj-3",
    name: "Campagne marketing Q3",
    description: "",
    status: "Planification",
    progress: 0,
    startDate: "",
    endDate: "",
    team: [],
    priority: "Basse",
  },
  {
    id: "proj-4",
    name: "Opérations internes",
    description: "",
    status: "Planification",
    progress: 0,
    startDate: "",
    endDate: "",
    team: [],
    priority: "Basse",
  },
];

export const fakeTasks: Task[] = [
  {
    id: "task-1",
    title: "Conception de la nouvelle page d'accueil",
    project_id: "proj-1",
  },
  { id: "task-2", title: "Développement du backend API", project_id: "proj-1" },
  {
    id: "task-3",
    title: "Mise en œuvre de l'interface utilisateur iOS",
    project_id: "proj-2",
  },
  {
    id: "task-4",
    title: "Analyse des données marketing",
    project_id: "proj-3",
  },
  {
    id: "task-5",
    title: "Réunion d'équipe hebdomadaire",
    project_id: "proj-4",
  },
  {
    id: "task-6",
    title: "Rédaction de spécifications techniques",
    project_id: null,
  }, // Task without project
];

// Helper to attach project to task for consistent structure
export const getFakeTaskWithProject = (taskId: string | null): Task | null => {
  if (!taskId) return null;
  const task = fakeTasks.find((t) => t.id === taskId);
  if (task) {
    return {
      ...task,
      project: fakeProjects.find((p) => p.id === task.project_id),
    };
  }
  return null;
};
