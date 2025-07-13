// src/hooks/useReports.ts
import { useState, useEffect, useMemo, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { ProjectStats, TeamMemberStats } from "@/lib/types";
import { initialTeamMemberStats } from "@/data/reports/initialReportsData"; // Keep this for team mock data
import { initialProjects as mockInitialProjects } from "@/data/projects"; // Import the initial project data

export const useReports = () => {
  const [projectStats, setProjectStats] = useState<ProjectStats[]>([]);
  const [teamStats, setTeamStats] = useState<TeamMemberStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30"); // Default to last 30 days

  const supabase = createClient();

  // Helper to format duration from minutes to "Xh Ym"
  const formatDuration = useCallback((minutes: number): string => {
    if (minutes === 0) return "0m";
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60); // Round minutes
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  }, []);

  // Function to fetch and process data from Supabase or use fallback
  const fetchReportData = useCallback(async () => {
    setLoading(true);
    try {
      const days = parseInt(timeRange, 10);
      const dateLimit = new Date();
      dateLimit.setDate(dateLimit.getDate() - days);
      // const isoDateLimit = dateLimit.toISOString(); // Not directly used in the current processing, but good to keep if needed for date filtering in future Supabase queries

      // --- Attempt to fetch from Supabase ---
      const { data: projects, error: projectsError } = await supabase.from("projects").select(`
          id,
          name,
          status,
          progress,
          tasks(id, status),
          project_members(user_id),
          time_entries(duration, created_at)
        `);

      // 2. Fetch Team Member Statistics
      const { data: users, error: usersError } = await supabase.from("users").select(`
          id,
          full_name,
          tasks!assigned_to(id, status, created_at),
          time_entries(duration, created_at),
          project_members(project_id)
        `);

      let currentProjectStats: ProjectStats[] = [];
      let currentTeamStats: TeamMemberStats[] = [];

      // --- Process Project Stats ---
      if (projectsError) {
        toast.error("Échec de la récupération des données de projet depuis Supabase. Utilisation des données fictives.");
        console.error("Supabase project fetch error:", projectsError);
        // Fallback for projects: derive ProjectStats from mockInitialProjects
        currentProjectStats = mockInitialProjects.map((project) => ({
          id: project.id,
          name: project.name,
          status: project.status,
          progress: project.progress,
          // For mock data, these will be placeholders or calculated based on simple logic
          totalTasks: Math.floor(project.progress / 10) + 5, // Example heuristic
          completedTasks: Math.floor(project.progress / 10), // Example heuristic
          totalTime: Math.floor(project.progress * 60) + (Math.random() * 600), // Example heuristic
          teamSize: project.team.length,
        }));
      } else {
        // Process live Supabase project data
        currentProjectStats =
          projects?.map((project) => {
            const filteredTimeEntries = project.time_entries?.filter(
              (entry: any) => new Date(entry.created_at) >= dateLimit
            );
            return {
              id: project.id,
              name: project.name,
              status: project.status,
              progress: project.progress,
              totalTasks: project.tasks?.length || 0,
              completedTasks: project.tasks?.filter((task: any) => task.status === "done").length || 0,
              totalTime:
                filteredTimeEntries?.reduce((sum: number, entry: any) => sum + (entry.duration || 0), 0) || 0,
              teamSize: project.project_members?.length || 0,
            };
          }) || [];
      }
      setProjectStats(currentProjectStats);

      // --- Process Team Stats ---
      if (usersError) {
        toast.error("Échec de la récupération des données d'équipe depuis Supabase. Utilisation des données fictives.");
        console.error("Supabase user fetch error:", usersError);
        // Fallback for team members: use initialTeamMemberStats directly
        currentTeamStats = initialTeamMemberStats;
      } else {
        // Process live Supabase team data
        currentTeamStats =
          users?.map((user) => {
            const filteredTasks = user.tasks?.filter((task: any) => new Date(task.created_at) >= dateLimit);
            const filteredTimeEntries = user.time_entries?.filter((entry: any) => new Date(entry.created_at) >= dateLimit);
            return {
              id: user.id,
              name: user.full_name || "Inconnu",
              completedTasks: filteredTasks?.filter((task: any) => task.status === "done").length || 0,
              totalTime:
                filteredTimeEntries?.reduce((sum: number, entry: any) => sum + (entry.duration || 0), 0) || 0,
              activeProjects: user.project_members?.length || 0,
            };
          }) || [];
      }
      setTeamStats(currentTeamStats);

    } catch (error) {
      console.error("Erreur générale lors de la récupération des données de rapport:", error);
      toast.error("Une erreur inattendue est survenue lors de la récupération des données de rapport. Utilisation des données fictives.");
      // Ensure fallbacks are set even if a broader error occurs
      setProjectStats(mockInitialProjects.map((project) => ({
        id: project.id,
        name: project.name,
        status: project.status,
        progress: project.progress,
        totalTasks: Math.floor(project.progress / 10) + 5,
        completedTasks: Math.floor(project.progress / 10),
        totalTime: Math.floor(project.progress * 60) + (Math.random() * 600),
        teamSize: project.team.length,
      })));
      setTeamStats(initialTeamMemberStats);
    } finally {
      setLoading(false);
    }
  }, [timeRange, supabase]);

  useEffect(() => {
    // We keep the setTimeout for a brief loading simulation in development,
    // but in a production environment, you might remove it.
    const timer = setTimeout(() => {
      fetchReportData();
    }, 500);

    return () => clearTimeout(timer);
  }, [fetchReportData]);

  // Memoized total stats calculation remains the same
  const totalStats = useMemo(() => {
    const totalProjects = projectStats.length;
    const activeProjects = projectStats.filter((p) => p.status === "in_progress").length;
    const completedProjects = projectStats.filter((p) => p.status === "completed").length;
    const totalTasks = projectStats.reduce((sum, p) => sum + p.totalTasks, 0);
    const completedTasks = projectStats.reduce((sum, p) => sum + p.completedTasks, 0);
    const totalTime = projectStats.reduce((sum, p) => sum + p.totalTime, 0);
    const totalTeamMembers = teamStats.length;

    return {
      totalProjects,
      activeProjects,
      completedProjects,
      totalTasks,
      completedTasks,
      totalTime,
      totalTeamMembers,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
    };
  }, [projectStats, teamStats]);

  // Export report function remains the same
  const exportReport = useCallback(() => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      timeRange: `${timeRange} jours`,
      summary: totalStats,
      projects: projectStats,
      teamMembers: teamStats,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rapport-projet-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Rapport exporté avec succès !");
  }, [timeRange, totalStats, projectStats, teamStats]);

  return {
    projectStats,
    teamStats,
    loading,
    timeRange,
    setTimeRange,
    totalStats,
    formatDuration,
    exportReport,
  };
};