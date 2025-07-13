"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BarChart3, CheckCircle, Clock, FolderOpen, Plus, Users, AlertCircle, Activity } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Active Projects",
      value: "12",
      change: "+2 from last month",
      icon: FolderOpen,
      color: "text-blue-600",
    },
    {
      title: "Completed Tasks",
      value: "248",
      change: "+12% from last week",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Team Members",
      value: "24",
      change: "+3 new members",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Hours Tracked",
      value: "1,240",
      change: "+8% this month",
      icon: Clock,
      color: "text-orange-600",
    },
  ]

  const recentProjects = [
    {
      name: "Website Redesign",
      progress: 75,
      status: "In Progress",
      dueDate: "2024-02-15",
      team: ["JD", "SM", "AB"],
    },
    {
      name: "Mobile App Development",
      progress: 45,
      status: "In Progress",
      dueDate: "2024-03-01",
      team: ["JD", "KL", "MN"],
    },
    {
      name: "Marketing Campaign",
      progress: 90,
      status: "Review",
      dueDate: "2024-01-30",
      team: ["OP", "QR"],
    },
  ]

  const upcomingTasks = [
    {
      title: "Review design mockups",
      project: "Website Redesign",
      priority: "High",
      dueDate: "Today",
    },
    {
      title: "Update project timeline",
      project: "Mobile App Development",
      priority: "Medium",
      dueDate: "Tomorrow",
    },
    {
      title: "Client presentation",
      project: "Marketing Campaign",
      priority: "High",
      dueDate: "Jan 28",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground">Bienvenue ! Voici l'état d'avancement de vos projets.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau projet
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Projects */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Your active projects and their progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.name} className="flex items-center space-x-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium leading-none">{project.name}</p>
                    <Badge variant={project.status === "In Progress" ? "default" : "secondary"}>{project.status}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={project.progress} className="flex-1" />
                    <span className="text-sm text-muted-foreground">{project.progress}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {project.team.map((member, index) => (
                        <Avatar key={index} className="h-6 w-6 border-2 border-background">
                          <AvatarFallback className="text-xs">{member}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">Due {project.dueDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Tasks that need your attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {task.priority === "High" ? (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  ) : (
                    <Activity className="h-4 w-4 text-blue-500" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className="text-xs text-muted-foreground">{task.project}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant={task.priority === "High" ? "destructive" : "secondary"} className="text-xs">
                      {task.priority}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to get you started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <FolderOpen className="h-6 w-6 mb-2" />
              Create Project
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <CheckCircle className="h-6 w-6 mb-2" />
              Add Task
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Users className="h-6 w-6 mb-2" />
              Invite Team
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <BarChart3 className="h-6 w-6 mb-2" />
              View Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
