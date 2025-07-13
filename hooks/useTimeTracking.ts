// src/hooks/useTimeTracking.ts
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { TimeEntry, ActiveTimer, Task, Project } from "@/lib/types";
import { initialTimeEntries } from "@/data/time-tracking/initialTimeEntries";
import { fakeTasks, fakeProjects, getFakeTaskWithProject } from "@/data/time-tracking/fakeTasksProjects";

// Define the shape of the form data for manual time entry
interface TimeEntryFormData {
  taskId: string;
  description: string;
  startTime: string; // YYYY-MM-DDTHH:MM format for input type="datetime-local"
  endTime: string; // YYYY-MM-DDTHH:MM format
}

export const useTimeTracking = () => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [activeTimer, setActiveTimer] = useState<ActiveTimer | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // New state to indicate ongoing save operation
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const [formData, setFormData] = useState<TimeEntryFormData>({
    taskId: "",
    description: "",
    startTime: "",
    endTime: "",
  });

  const supabase = createClient();

  // Helper to format Date to YYYY-MM-DDTHH:MM for datetime-local input
  const formatDateTimeLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // --- Fetch Tasks and Projects ---
  const fetchTasksAndProjects = useCallback(async () => {
    try {
      // Fetch Tasks
      const { data: tasksData, error: tasksError } = await supabase.from("tasks").select("*");
      if (tasksError) {
        console.error("Supabase fetch tasks error:", tasksError);
        toast.error("Échec du chargement des tâches. Utilisation des données fictives.");
        setTasks(fakeTasks);
      } else {
        setTasks(tasksData || []);
      }

      // Fetch Projects
      const { data: projectsData, error: projectsError } = await supabase.from("projects").select("*");
      if (projectsError) {
        console.error("Supabase fetch projects error:", projectsError);
        toast.error("Échec du chargement des projets. Utilisation des données fictives.");
        setProjects(fakeProjects);
      } else {
        setProjects(projectsData || []);
      }
    } catch (error) {
      console.error("Erreur inattendue lors du chargement des tâches/projets:", error);
      toast.error("Erreur inattendue lors du chargement des tâches et projets.");
      setTasks(fakeTasks);
      setProjects(fakeProjects);
    }
  }, [supabase]);

  // --- Fetch Time Entries ---
  const fetchTimeEntries = useCallback(async () => {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast.info("Veuillez vous connecter pour voir vos entrées de temps.");
        setTimeEntries(initialTimeEntries); // Fallback for non-logged-in users
        return;
      }

      const { data, error } = await supabase
        .from("time_entries")
        .select(
          `
          id, task_id, user_id, description, start_time, end_time, duration, created_at,
          task:tasks(
            id, title, project_id,
            project:projects(
              id, name
            )
          )
        `
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase fetch time entries error:", error);
        toast.error("Échec de la récupération des entrées de temps. Utilisation des données fictives.");
        setTimeEntries(initialTimeEntries); // Fallback to fake data
        return;
      }

      if (data) {
        // Map Supabase data to TimeEntry interface
        const fetchedEntries: TimeEntry[] = data.map((item: any) => ({
          id: item.id,
          task_id: item.task_id,
          user_id: item.user_id,
          description: item.description,
          start_time: item.start_time,
          end_time: item.end_time,
          duration: item.duration,
          created_at: item.created_at,
          task: item.task
            ? {
                id: item.task.id,
                title: item.task.title,
                project_id: item.task.project_id,
                project: item.task.project || null,
              }
            : null,
        }));
        setTimeEntries(fetchedEntries);
      }
    } catch (error) {
      console.error("Une erreur inattendue est survenue lors de la récupération des entrées de temps:", error);
      toast.error("Une erreur inattendue est survenue. Chargement des données fictives.");
      setTimeEntries(initialTimeEntries); // Fallback on general error
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchTimeEntries();
    fetchTasksAndProjects(); // Fetch tasks and projects on mount
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [fetchTimeEntries, fetchTasksAndProjects]);

  // --- Start Timer ---
  const startTimer = useCallback((taskId: string | null = null, description = "") => {
    setActiveTimer({
      taskId,
      description,
      startTime: new Date(),
    });
    toast.success("Minuteur démarré !");
  }, []);

  // --- Pause Timer (Stop & Save) ---
  const pauseTimer = useCallback(async () => {
    if (!activeTimer) return;

    setSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Veuillez vous connecter pour enregistrer votre temps.");
      setSaving(false);
      return;
    }

    const duration = Math.floor((currentTime.getTime() - activeTimer.startTime.getTime()) / 1000 / 60); // in minutes
    if (duration < 1) {
      toast.info("Durée trop courte pour être enregistrée (moins d'une minute).");
      setActiveTimer(null);
      setSaving(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("time_entries")
        .insert({
          task_id: activeTimer.taskId,
          user_id: user.id,
          description: activeTimer.description,
          start_time: activeTimer.startTime.toISOString(),
          end_time: currentTime.toISOString(),
          duration,
        })
        .select()
        .single();

      if (error) {
        console.error("Supabase save time entry error:", error);
        toast.error("Échec de l'enregistrement de l'entrée de temps.");
        // Fallback: Add to local state
        const mockEntry: TimeEntry = {
          id: `mock-${Date.now()}`,
          task_id: activeTimer.taskId,
          user_id: user.id,
          description: activeTimer.description,
          start_time: activeTimer.startTime.toISOString(),
          end_time: currentTime.toISOString(),
          duration,
          created_at: new Date().toISOString(),
          task: getFakeTaskWithProject(activeTimer.taskId),
        };
        setTimeEntries((prev) => [mockEntry, ...prev]);
        setActiveTimer(null);
        return;
      }

      if (data) {
        // Re-fetch to get nested task/project data or manually construct it
        const savedEntry: TimeEntry = {
          ...data,
          task: data.task_id ? tasks.find(t => t.id === data.task_id) : null,
          // You might need to refetch to get the nested project data accurately if not directly returned
          // For simplicity, we'll refetch all entries after saving.
        };
        toast.success("Minuteur arrêté et temps enregistré !");
        setActiveTimer(null);
        fetchTimeEntries(); // Re-fetch all entries to ensure consistency
      }
    } catch (error) {
      console.error("Une erreur est survenue lors de l'enregistrement de l'entrée de temps:", error);
      toast.error("Une erreur est survenue lors de l'enregistrement.");
      // Fallback: Add to local state
      const mockEntry: TimeEntry = {
        id: `mock-${Date.now()}`,
        task_id: activeTimer.taskId,
        user_id: user.id,
        description: activeTimer.description,
        start_time: activeTimer.startTime.toISOString(),
        end_time: currentTime.toISOString(),
        duration,
        created_at: new Date().toISOString(),
        task: getFakeTaskWithProject(activeTimer.taskId),
      };
      setTimeEntries((prev) => [mockEntry, ...prev]);
      setActiveTimer(null);
    } finally {
      setSaving(false);
    }
  }, [activeTimer, currentTime, supabase, tasks, fetchTimeEntries]); // Added tasks to dependency array

  // --- Stop Timer (Cancel) ---
  const stopTimer = useCallback(() => {
    setActiveTimer(null);
    toast.info("Minuteur arrêté sans enregistrement.");
  }, []);

  // --- Handle Manual Time Entry Creation ---
  const handleCreateTimeEntry = useCallback(async () => {
    setSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Veuillez vous connecter pour créer une entrée de temps.");
      setSaving(false);
      return;
    }

    try {
      const startTime = new Date(formData.startTime);
      const endTime = new Date(formData.endTime);
      const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000 / 60);

      if (isNaN(startTime.getTime()) || isNaN(endTime.getTime()) || startTime >= endTime) {
        toast.error("Veuillez entrer des heures de début et de fin valides.");
        setSaving(false);
        return;
      }
      if (duration < 1) {
        toast.info("Durée trop courte pour être enregistrée (moins d'une minute).");
        setSaving(false);
        return;
      }

      const { data, error } = await supabase
        .from("time_entries")
        .insert({
          task_id: formData.taskId || null,
          user_id: user.id,
          description: formData.description,
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          duration,
        })
        .select()
        .single();

      if (error) {
        console.error("Supabase create time entry error:", error);
        toast.error("Échec de la création de l'entrée de temps.");
        // Fallback: Add to local state
        const mockEntry: TimeEntry = {
          id: `mock-${Date.now()}`,
          task_id: formData.taskId || null,
          user_id: user.id,
          description: formData.description,
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          duration,
          created_at: new Date().toISOString(),
          task: getFakeTaskWithProject(formData.taskId),
        };
        setTimeEntries((prev) => [mockEntry, ...prev]);
        setIsCreateDialogOpen(false);
        return;
      }

      if (data) {
        toast.success("Entrée de temps créée avec succès !");
        setIsCreateDialogOpen(false);
        fetchTimeEntries(); // Re-fetch to ensure consistency and nested data
      }
    } catch (error) {
      console.error("Une erreur est survenue lors de la création de l'entrée de temps:", error);
      toast.error("Une erreur est survenue lors de la création de l'entrée de temps.");
      // Fallback: Add to local state
      const mockEntry: TimeEntry = {
        id: `mock-${Date.now()}`,
        task_id: formData.taskId || null,
        user_id: user.id,
        description: formData.description,
        start_time: new Date(formData.startTime).toISOString(),
        end_time: new Date(formData.endTime).toISOString(),
        duration: Math.floor((new Date(formData.endTime).getTime() - new Date(formData.startTime).getTime()) / 1000 / 60),
        created_at: new Date().toISOString(),
        task: getFakeTaskWithProject(formData.taskId),
      };
      setTimeEntries((prev) => [mockEntry, ...prev]);
      setIsCreateDialogOpen(false);
    } finally {
      setSaving(false);
      setFormData({
        taskId: "",
        description: "",
        startTime: "",
        endTime: "",
      });
    }
  }, [formData, supabase, fetchTimeEntries]);

  // --- Delete Time Entry ---
  const deleteTimeEntry = useCallback(async (id: string) => {
    setSaving(true);
    try {
      const { error } = await supabase.from("time_entries").delete().eq("id", id);

      if (error) {
        console.error("Supabase delete time entry error:", error);
        toast.error("Échec de la suppression de l'entrée de temps.");
        return;
      }

      setTimeEntries((prev) => prev.filter((entry) => entry.id !== id));
      toast.success("Entrée de temps supprimée !");
    } catch (error) {
      console.error("Une erreur est survenue lors de la suppression de l'entrée de temps:", error);
      toast.error("Une erreur est survenue lors de la suppression de l'entrée de temps.");
    } finally {
      setSaving(false);
    }
  }, [supabase]);

  // --- Utility Functions ---
  const formatDuration = useCallback((minutes: number | null) => {
    if (minutes === null || minutes < 0) return "0m";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  }, []);

  const getActiveTimerDuration = useCallback(() => {
    if (!activeTimer) return "00:00:00";
    const diff = currentTime.getTime() - activeTimer.startTime.getTime();
    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, [activeTimer, currentTime]);

  const getTotalTimeToday = useCallback(() => {
    const today = new Date().toDateString();
    const todayEntries = timeEntries.filter((entry) => new Date(entry.created_at).toDateString() === today);
    const total = todayEntries.reduce((sum, entry) => sum + (entry.duration || 0), 0);
    return formatDuration(total);
  }, [timeEntries, formatDuration]);

  const getTotalTimeThisWeek = useCallback(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay()); // Go to Sunday
    startOfWeek.setHours(0, 0, 0, 0);

    const weekEntries = timeEntries.filter((entry) => new Date(entry.created_at) >= startOfWeek);
    const total = weekEntries.reduce((sum, entry) => sum + (entry.duration || 0), 0);
    return formatDuration(total);
  }, [timeEntries, formatDuration]);

  return {
    timeEntries,
    activeTimer,
    currentTime,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    loading,
    saving,
    formData,
    setFormData,
    tasks,
    projects,
    startTimer,
    pauseTimer,
    stopTimer,
    handleCreateTimeEntry,
    deleteTimeEntry,
    formatDuration,
    getActiveTimerDuration,
    getTotalTimeToday,
    getTotalTimeThisWeek,
    formatDateTimeLocal,
  };
};