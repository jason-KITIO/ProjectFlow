// src/data/files/initialFiles.ts
import { FileItem } from "@/lib/types"

// Helper pour obtenir la date formatée pour les démos
const getFormattedDate = (daysAgo: number) => {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString()
}

export const initialFiles: FileItem[] = [
  {
    id: "file-1",
    name: "rapport_final_projet_alpha.pdf",
    file_path: "files/rapport_final_projet_alpha.pdf",
    file_size: 1524000, // 1.52 MB
    mime_type: "application/pdf",
    project_id: "proj-1", // ID du projet fictif
    task_id: "task-1", // ID de la tâche fictive
    uploaded_by: "user-1", // ID de l'utilisateur fictif
    created_at: getFormattedDate(5),
    project: { id: "proj-1", name: "Refonte Site Web" },
    task: { id: "task-1", title: "Rédaction rapport final" },
    uploader: { id: "user-1", full_name: "Alice Dupont" },
  },
  {
    id: "file-2",
    name: "image_design_mobile.png",
    file_path: "files/image_design_mobile.png",
    file_size: 890000, // 0.89 MB
    mime_type: "image/png",
    project_id: "proj-2",
    task_id: null,
    uploaded_by: "user-2",
    created_at: getFormattedDate(2),
    project: { id: "proj-2", name: "Développement App Mobile" },
    uploader: { id: "user-2", full_name: "Bob Martin" },
  },
  {
    id: "file-3",
    name: "video_presentation.mp4",
    file_path: "files/video_presentation.mp4",
    file_size: 12500000, // 12.5 MB
    mime_type: "video/mp4",
    project_id: "proj-1",
    task_id: "task-2",
    uploaded_by: "user-1",
    created_at: getFormattedDate(10),
    project: { id: "proj-1", name: "Refonte Site Web" },
    task: { id: "task-2", title: "Préparation présentation" },
    uploader: { id: "user-1", full_name: "Alice Dupont" },
  },
  {
    id: "file-4",
    name: "budget_previsionnel.xlsx",
    file_path: "files/budget_previsionnel.xlsx",
    file_size: 320000, // 0.32 MB
    mime_type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    project_id: null,
    task_id: null,
    uploaded_by: "user-3",
    created_at: getFormattedDate(1),
    uploader: { id: "user-3", full_name: "Charlie Leblanc" },
  },
  {
    id: "file-5",
    name: "notes_reunion.txt",
    file_path: "files/notes_reunion.txt",
    file_size: 12000, // 12 KB
    mime_type: "text/plain",
    project_id: "proj-2",
    task_id: null,
    uploaded_by: "user-2",
    created_at: getFormattedDate(3),
    project: { id: "proj-2", name: "Développement App Mobile" },
    uploader: { id: "user-2", full_name: "Bob Martin" },
  },
  {
    id: "file-6",
    name: "archive_photos.zip",
    file_path: "files/archive_photos.zip",
    file_size: 5800000, // 5.8 MB
    mime_type: "application/zip",
    project_id: "proj-1",
    task_id: null,
    uploaded_by: "user-1",
    created_at: getFormattedDate(7),
    project: { id: "proj-1", name: "Refonte Site Web" },
    uploader: { id: "user-1", full_name: "Alice Dupont" },
  },
];