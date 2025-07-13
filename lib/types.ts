// src/lib/types.ts
export interface Project {
  id: string;
  name: string;
  description: string;
  status: "Planification" | "En cours" | "Révision" | "Terminé";
  progress: number;
  startDate: string;
  endDate: string;
  team: string[];
  priority: "Basse" | "Moyenne" | "Élevée";
}

export type ProjectFormData = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  priority: "Basse" | "Moyenne" | "Élevée";
};

// src/lib/types.ts
export interface AutomationRule {
  id: string;
  name: string;
  description: string | null;
  trigger_type: string;
  trigger_conditions: any;
  action_type: string;
  action_parameters: any;
  active: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface AutomationFormData {
  name: string;
  description: string;
  triggerType: string;
  actionType: string;
  triggerConditions: any;
  actionParameters: any;
}

// src/lib/types.ts
// Ajoutez cette interface à votre fichier types.ts existant
export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // Format: YYYY-MM-DD
  type: "projet" | "tâche" | "réunion" | "date limite"; // Types traduits
  project?: string; // Nom du projet associé
  priority?: "Basse" | "Moyenne" | "Élevée"; // Priorités traduites
}

// src/lib/types.ts

// Pour les fichiers
export interface FileItem {
  id: string;
  name: string;
  file_path: string; // Chemin simulé, ou URL de blob pour le download
  file_size: number | null;
  mime_type: string | null;
  project_id: string | null;
  task_id: string | null;
  uploaded_by: string | null;
  created_at: string;
  project?: {
    id: string; // Ajout de l'ID pour la liaison dans les Select
    name: string;
  };
  task?: {
    id: string; // Ajout de l'ID pour la liaison dans les Select
    title: string;
  };
  uploader?: {
    id: string; // Ajout de l'ID pour la liaison dans les Select
    full_name: string;
  };
}

// Interfaces pour simuler les relations (si vous n'avez pas déjà des types plus complets ailleurs)
export interface ProjectRelation {
  id: string;
  name: string;
}

export interface TaskRelation {
  id: string;
  title: string;
}

export interface UploaderRelation {
  id: string;
  full_name: string;
}

// src/lib/types.ts

// Notification interface
export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string | null;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  related_id: string | null;
  related_type: string | null;
  created_at: string;
}

// Notification settings interface
export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  taskAssignments: boolean;
  projectUpdates: boolean;
  deadlineReminders: boolean;
  teamMessages: boolean;
  weeklyReports: boolean;
}
// src/lib/types.ts

// Existing Notification types would also be here
// ... (previous Notification interfaces) ...

// PERT Node interface
export interface PertNode {
  id: string
  name: string
  duration: number
  earliestStart: number
  earliestFinish: number
  latestStart: number
  latestFinish: number
  slack: number
  dependencies: string[]
  position: { x: number; y: number }
  isCritical: boolean
}

// PERT Project interface
export interface PertProject {
  id: string
  name: string
  nodes: PertNode[]
  criticalPath: string[]
}
// src/lib/types.ts

// Existing Pert and Notification types would also be here
// ... (previous Pert and Notification interfaces) ...

// Gantt Task interface
export interface GanttTask {
  id: string
  name: string
  startDate: Date
  endDate: Date
  progress: number
  dependencies: string[]
  assignee: string
  priority: "Low" | "Medium" | "High"
  project: string // Name of the parent project
}

// Gantt Project interface
export interface GanttProject {
  id: string
  name: string
  tasks: GanttTask[]
  color: string // Color associated with the project for visualization
}
// src/lib/types.ts

// Existing Pert and Gantt types would also be here
// ... (previous Pert, Gantt, and Notification interfaces) ...

// Reports Interfaces
export interface ProjectStats {
  id: string
  name: string
  status: string // e.g., "planning", "in_progress", "review", "completed"
  progress: number // 0-100
  totalTasks: number
  completedTasks: number
  totalTime: number // in minutes
  teamSize: number
}

export interface TeamMemberStats {
  id: string
  name: string
  completedTasks: number
  totalTime: number // in minutes
  activeProjects: number
}

// src/lib/types.ts

// Existing interfaces (e.g., Project, ProjectStats, TeamMemberStats)
// ...

// User Profile Interface
export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
  department: string | null;
  phone: string | null;
  location: string | null;
}

// User Preferences Interface (new, for consistent structure)
export interface UserPreferences {
  theme: "light" | "dark" | "system"; // Added 'system' for completeness
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyReports: boolean;
  taskReminders: boolean;
  projectUpdates: boolean;
}
// src/lib/types.ts

// Existing interfaces (e.g., Project, ProjectStats, TeamMemberStats, UserProfile, UserPreferences)
// ...

// Team Member Interface
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  department: string;
  status: "Active" | "Inactive";
  joinDate: string;
  avatar?: string | null; // Changed to allow null
  phone?: string | null; // Changed to allow null
  location?: string | null; // Changed to allow null
  projects: string[];
}// src/lib/types.ts

// Existing interfaces (e.g., TeamMember)
// ...

// Project Interface (for time tracking context)
export interface Project {
  id: string;
  name: string;
}

// Task Interface (for time tracking context)
export interface Task {
  id: string;
  title: string;
  project_id: string | null;
  project?: Project; // Nested project data via foreign key join
}

// Time Entry Interface
export interface TimeEntry {
  id: string;
  task_id: string | null;
  user_id: string;
  description: string | null;
  start_time: string; // ISO string
  end_time: string | null; // ISO string
  duration: number | null; // Duration in minutes
  created_at: string; // ISO string
  task?: Task | null; // Nested task data via foreign key join
}

// Active Timer Interface
export interface ActiveTimer {
  taskId: string | null;
  description: string;
  startTime: Date;
}