import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// src/lib/utils.ts
export const getStatusColor = (status: string) => {
  switch (status) {
    case "Planification":
      return "bg-gray-100 text-gray-800";
    case "En cours":
      return "bg-blue-100 text-blue-800";
    case "Révision":
      return "bg-yellow-100 text-yellow-800";
    case "Terminé":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "Élevée":
      return "bg-red-100 text-red-800";
    case "Moyenne":
      return "bg-yellow-100 text-yellow-800";
    case "Basse":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

// src/lib/utils.ts
import {
  Zap,
  Plus,
  Clock,
  Bell,
  UserPlus,
  Mail,
  CheckCircle,
} from "lucide-react";
import { actionTypes, triggerTypes } from "./constants";

export const getActionIcon = (actionType: string) => {
  switch (actionType) {
    case "send_notification":
      return <Bell className="h-4 w-4" />;
    case "send_email":
      return <Mail className="h-4 w-4" />;
    case "assign_task":
      return <UserPlus className="h-4 w-4" />;
    case "update_status":
      return <CheckCircle className="h-4 w-4" />;
    case "create_task":
      return <Plus className="h-4 w-4" />;
    default:
      return <Zap className="h-4 w-4" />;
  }
};

export const getTriggerIcon = (triggerType: string) => {
  switch (triggerType) {
    case "due_date_approaching":
      return <Clock className="h-4 w-4" />;
    case "task_status_change":
      return <CheckCircle className="h-4 w-4" />;
    default:
      return <Zap className="h-4 w-4" />;
  }
};

export function getLabelByValue(value: string, type: "trigger" | "action") {
  const types = type === "trigger" ? triggerTypes : actionTypes;
  return types.find((item) => item.value === value)?.label || value;
}

import { File, ImageIcon, Video, Music, Archive, FileText } from "lucide-react" // Importez les icônes

// Fonction pour obtenir l'icône du fichier
export const getFileIcon = (mimeType: string | null) => {
  if (!mimeType) return <File className="h-8 w-8" />

  if (mimeType.startsWith("image/")) return <ImageIcon className="h-8 w-8 text-green-600" />
  if (mimeType.startsWith("video/")) return <Video className="h-8 w-8 text-purple-600" />
  if (mimeType.startsWith("audio/")) return <Music className="h-8 w-8 text-blue-600" />
  // Plus précis pour les documents
  if (mimeType.includes("pdf")) return <FileText className="h-8 w-8 text-red-600" />
  if (mimeType.includes("document") || mimeType.includes("text")) return <FileText className="h-8 w-8 text-blue-500" />
  if (mimeType.includes("spreadsheet")) return <FileText className="h-8 w-8 text-green-500" /> // Excel
  if (mimeType.includes("presentation")) return <FileText className="h-8 w-8 text-orange-500" /> // PowerPoint
  if (mimeType.includes("zip") || mimeType.includes("archive")) return <Archive className="h-8 w-8 text-yellow-600" />

  return <File className="h-8 w-8" />
}

// Fonction pour formater la taille du fichier
export const formatFileSize = (bytes: number | null) => {
  if (bytes === null || isNaN(bytes)) return "Taille inconnue" // Gérer null et NaN
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  if (bytes === 0) return "0 Byte"
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i]
}