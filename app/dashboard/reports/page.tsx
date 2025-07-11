"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Users, Clock, CheckCircle, Download } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface ProjectStats {
  id: string
  name: string
  status: string
  progress: number
  totalTasks: number
  completedTasks: number
  totalTime: number
  teamSize: number
}

interface TeamMemberStats {
  id: string
  name: string
  completedTasks: number
  totalTime: number
  activeProjects: number
}

export default function ReportsPage() {
  const [projectStats, setProjectStats] = useState<ProjectStats[]>([])
  const [teamStats, setTeamStats] = useState<TeamMemberStats[]>([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30")

  const supabase = createClient()

  useEffect(() => {
    fetchReportData()
  }, [timeRange])

  const fetchReportData = async () => {
    try {
      setLoading(true)

      // Fetch project statistics
      const { data: projects, error: projectsError } = await supabase.from("projects").select(`
          id,
          name,
          status,
          progress,
          tasks(id, status),
          project_members(user_id),
          time_entries(duration)
        `)

      if (projectsError) {
        toast.error("Failed to fetch project data")
        return
      }

      // Process project stats
      const processedProjectStats: ProjectStats[] =
        projects?.map((project) => ({
          id: project.id,
          name: project.name,
          status: project.status,
          progress: project.progress,
          totalTasks: project.tasks?.length || 0,
          completedTasks: project.tasks?.filter((task: any) => task.status === "done").length || 0,
          totalTime: project.time_entries?.reduce((sum: number, entry: any) => sum + (entry.duration || 0), 0) || 0,
          teamSize: project.project_members?.length || 0,
        })) || []

      setProjectStats(processedProjectStats)

      // Fetch team member statistics
      const { data: users, error: usersError } = await supabase.from("users").select(`
          id,
          full_name,
          tasks!assigned_to(id, status),
          time_entries(duration),
          project_members(project_id)
        `)

      if (usersError) {
        toast.error("Failed to fetch team data")
        return
      }

      // Process team stats
      const processedTeamStats: TeamMemberStats[] =
        users?.map((user) => ({
          id: user.id,
          name: user.full_name || "Unknown",
          completedTasks: user.tasks?.filter((task: any) => task.status === "done").length || 0,
          totalTime: user.time_entries?.reduce((sum: number, entry: any) => sum + (entry.duration || 0), 0) || 0,
          activeProjects: user.project_members?.length || 0,
        })) || []

      setTeamStats(processedTeamStats)
    } catch (error) {
      toast.error("An error occurred while fetching report data")
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const getTotalStats = () => {
    const totalProjects = projectStats.length
    const activeProjects = projectStats.filter((p) => p.status === "in_progress").length
    const completedProjects = projectStats.filter((p) => p.status === "completed").length
    const totalTasks = projectStats.reduce((sum, p) => sum + p.totalTasks, 0)
    const completedTasks = projectStats.reduce((sum, p) => sum + p.completedTasks, 0)
    const totalTime = projectStats.reduce((sum, p) => sum + p.totalTime, 0)
    const totalTeamMembers = teamStats.length

    return {
      totalProjects,
      activeProjects,
      completedProjects,
      totalTasks,
      completedTasks,
      totalTime,
      totalTeamMembers,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
    }
  }

  const exportReport = () => {
    const stats = getTotalStats()
    const reportData = {
      generatedAt: new Date().toISOString(),
      timeRange: `${timeRange} days`,
      summary: stats,
      projects: projectStats,
      teamMembers: teamStats,
    }

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `project-report-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success("Report exported successfully!")
  }

  const stats = getTotalStats()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Analyze project progress and team performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportReport}>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeProjects} active, {stats.completedProjects} completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Task Completion</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {stats.completedTasks} of {stats.totalTasks} tasks completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Time Tracked</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(stats.totalTime)}</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTeamMembers}</div>
            <p className="text-xs text-muted-foreground">Active contributors</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Project Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Project Performance</CardTitle>
            <CardDescription>Progress and completion status of all projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {projectStats.map((project) => (
              <div key={project.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{project.name}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant={project.status === "completed" ? "default" : "secondary"}>
                        {project.status.replace("_", " ")}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {project.completedTasks}/{project.totalTasks} tasks
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{project.progress}%</p>
                    <p className="text-xs text-muted-foreground">{formatDuration(project.totalTime)}</p>
                  </div>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Individual team member contributions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamStats
              .sort((a, b) => b.completedTasks - a.completedTasks)
              .map((member) => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{member.name}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {member.activeProjects} projects
                      </Badge>
                      <span className="text-xs text-muted-foreground">{member.completedTasks} tasks completed</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatDuration(member.totalTime)}</p>
                    <p className="text-xs text-muted-foreground">time tracked</p>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>

      {/* Project Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Project Status Distribution</CardTitle>
          <CardDescription>Overview of project statuses across your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            {["planning", "in_progress", "review", "completed"].map((status) => {
              const count = projectStats.filter((p) => p.status === status).length
              const percentage = projectStats.length > 0 ? Math.round((count / projectStats.length) * 100) : 0

              return (
                <div key={status} className="text-center space-y-2">
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="text-sm text-muted-foreground capitalize">{status.replace("_", " ")}</div>
                  <div className="text-xs text-muted-foreground">{percentage}%</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
