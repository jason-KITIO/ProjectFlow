// src/data/projects.ts
import { Project } from "@/lib/types";

export const initialProjects: Project[] = [
  {
    id: "1",
    name: "Refonte du site web",
    description:
      "Refonte complète du site web de l'entreprise avec un design moderne et une UX améliorée",
    status: "En cours",
    progress: 75,
    startDate: "2024-01-01",
    endDate: "2024-02-15",
    team: ["JD", "SM", "AB"],
    priority: "Élevée",
  },
  {
    id: "2",
    name: "Développement application mobile",
    description: "Application mobile native pour plateformes iOS et Android",
    status: "En cours",
    progress: 45,
    startDate: "2024-01-15",
    endDate: "2024-03-01",
    team: ["JD", "KL", "MN"],
    priority: "Élevée",
  },
  {
    id: "3",
    name: "Campagne marketing",
    description: "Campagne marketing du T1 pour le lancement de produit",
    status: "Révision",
    progress: 90,
    startDate: "2024-01-01",
    endDate: "2024-01-30",
    team: ["OP", "QR"],
    priority: "Moyenne",
  },
];
