export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: "admin" | "editor" | "viewer"
          department: string | null
          phone: string | null
          location: string | null
          status: "active" | "inactive"
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: "admin" | "editor" | "viewer"
          department?: string | null
          phone?: string | null
          location?: string | null
          status?: "active" | "inactive"
        }
        Update: {
          full_name?: string | null
          avatar_url?: string | null
          role?: "admin" | "editor" | "viewer"
          department?: string | null
          phone?: string | null
          location?: string | null
          status?: "active" | "inactive"
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string | null
          status: "planning" | "in_progress" | "review" | "completed"
          priority: "low" | "medium" | "high"
          progress: number
          start_date: string | null
          end_date: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          description?: string | null
          status?: "planning" | "in_progress" | "review" | "completed"
          priority?: "low" | "medium" | "high"
          progress?: number
          start_date?: string | null
          end_date?: string | null
          created_by?: string | null
        }
        Update: {
          name?: string
          description?: string | null
          status?: "planning" | "in_progress" | "review" | "completed"
          priority?: "low" | "medium" | "high"
          progress?: number
          start_date?: string | null
          end_date?: string | null
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          status: "todo" | "in_progress" | "review" | "done"
          priority: "low" | "medium" | "high"
          project_id: string | null
          assigned_to: string | null
          created_by: string | null
          due_date: string | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          title: string
          description?: string | null
          status?: "todo" | "in_progress" | "review" | "done"
          priority?: "low" | "medium" | "high"
          project_id?: string | null
          assigned_to?: string | null
          created_by?: string | null
          due_date?: string | null
        }
        Update: {
          title?: string
          description?: string | null
          status?: "todo" | "in_progress" | "review" | "done"
          priority?: "low" | "medium" | "high"
          assigned_to?: string | null
          due_date?: string | null
          completed_at?: string | null
        }
      }
      time_entries: {
        Row: {
          id: string
          task_id: string | null
          user_id: string
          description: string | null
          start_time: string
          end_time: string | null
          duration: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          task_id?: string | null
          user_id: string
          description?: string | null
          start_time: string
          end_time?: string | null
          duration?: number | null
        }
        Update: {
          description?: string | null
          end_time?: string | null
          duration?: number | null
        }
      }
      files: {
        Row: {
          id: string
          name: string
          file_path: string
          file_size: number | null
          mime_type: string | null
          project_id: string | null
          task_id: string | null
          uploaded_by: string | null
          created_at: string
        }
        Insert: {
          name: string
          file_path: string
          file_size?: number | null
          mime_type?: string | null
          project_id?: string | null
          task_id?: string | null
          uploaded_by?: string | null
        }
        Update: {
          name?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string | null
          type: "info" | "success" | "warning" | "error"
          read: boolean
          related_id: string | null
          related_type: string | null
          created_at: string
        }
        Insert: {
          user_id: string
          title: string
          message?: string | null
          type?: "info" | "success" | "warning" | "error"
          read?: boolean
          related_id?: string | null
          related_type?: string | null
        }
        Update: {
          read?: boolean
        }
      }
    }
  }
}
