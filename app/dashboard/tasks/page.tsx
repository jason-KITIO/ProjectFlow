"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Calendar, User, Flag, GripVertical } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in_progress" | "review" | "done"
  priority: "Low" | "Medium" | "High"
  assignee: string
  dueDate: string
  project: string
  subtasks: Subtask[]
}

interface Subtask {
  id: string
  title: string
  completed: boolean
}

interface DraggedTask {
  task: Task
  sourceColumn: string
}

const columns = [
  { id: "todo", title: "To Do", color: "bg-gray-100" },
  { id: "in_progress", title: "In Progress", color: "bg-blue-100" },
  { id: "review", title: "Review", color: "bg-yellow-100" },
  { id: "done", title: "Done", color: "bg-green-100" },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Design homepage mockup",
      description: "Create wireframes and mockups for the new homepage design",
      status: "in_progress",
      priority: "High",
      assignee: "JD",
      dueDate: "2024-01-25",
      project: "Website Redesign",
      subtasks: [
        { id: "1-1", title: "Create wireframes", completed: true },
        { id: "1-2", title: "Design mockups", completed: false },
        { id: "1-3", title: "Get feedback", completed: false },
      ],
    },
    {
      id: "2",
      title: "Implement user authentication",
      description: "Set up login and registration functionality",
      status: "todo",
      priority: "High",
      assignee: "SM",
      dueDate: "2024-01-30",
      project: "Mobile App Development",
      subtasks: [
        { id: "2-1", title: "Setup auth service", completed: false },
        { id: "2-2", title: "Create login form", completed: false },
      ],
    },
    {
      id: "3",
      title: "Write blog post",
      description: "Create content for the product launch announcement",
      status: "review",
      priority: "Medium",
      assignee: "AB",
      dueDate: "2024-01-28",
      project: "Marketing Campaign",
      subtasks: [],
    },
    {
      id: "4",
      title: "Setup CI/CD pipeline",
      description: "Configure automated deployment pipeline",
      status: "done",
      priority: "Medium",
      assignee: "KL",
      dueDate: "2024-01-20",
      project: "Website Redesign",
      subtasks: [],
    },
  ])

  const [draggedTask, setDraggedTask] = useState<DraggedTask | null>(null)
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium" as "Low" | "Medium" | "High",
    assignee: "JD",
    dueDate: "",
    project: "Website Redesign",
  })

  const supabase = createClient()

  const handleCreateTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      status: "todo",
      priority: formData.priority,
      assignee: formData.assignee,
      dueDate: formData.dueDate,
      project: formData.project,
      subtasks: [],
    }
    setTasks([...tasks, newTask])
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      assignee: "JD",
      dueDate: "",
      project: "Website Redesign",
    })
    setIsCreateDialogOpen(false)
    toast.success("Task created successfully!")
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
    toast.success("Task deleted!")
  }

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((subtask) =>
                subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask,
              ),
            }
          : task,
      ),
    )
  }

  // Drag and Drop handlers
  const handleDragStart = useCallback((e: React.DragEvent, task: Task) => {
    setDraggedTask({ task, sourceColumn: task.status })
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/html", e.currentTarget.outerHTML)

    // Add drag styling
    const target = e.currentTarget as HTMLElement
    target.style.opacity = "0.5"
    target.style.transform = "rotate(5deg) scale(1.05)"
    target.style.zIndex = "1000"
  }, [])

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement
    target.style.opacity = "1"
    target.style.transform = "none"
    target.style.zIndex = "auto"

    setDraggedTask(null)
    setDragOverColumn(null)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }, [])

  const handleDragEnter = useCallback((e: React.DragEvent, columnId: string) => {
    e.preventDefault()
    setDragOverColumn(columnId)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    // Only clear if we're leaving the column entirely
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX
    const y = e.clientY

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverColumn(null)
    }
  }, [])

  const handleDrop = useCallback(
    async (e: React.DragEvent, targetColumnId: string) => {
      e.preventDefault()

      if (!draggedTask) return

      const { task, sourceColumn } = draggedTask

      if (sourceColumn === targetColumnId) {
        setDragOverColumn(null)
        return
      }

      // Update task status
      const updatedTasks = tasks.map((t) => (t.id === task.id ? { ...t, status: targetColumnId as Task["status"] } : t))

      setTasks(updatedTasks)
      setDragOverColumn(null)

      // Show success animation
      toast.success(`Task moved to ${columns.find((col) => col.id === targetColumnId)?.title}!`)

      // Update in database
      try {
        const { error } = await supabase.from("tasks").update({ status: targetColumnId }).eq("id", task.id)

        if (error) {
          // Revert on error
          setTasks(tasks)
          toast.error("Failed to update task status")
        }
      } catch (error) {
        // Revert on error
        setTasks(tasks)
        toast.error("An error occurred while updating task")
      }
    },
    [draggedTask, tasks, supabase],
  )

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter((task) => task.status === status)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">Manage tasks across all projects with Kanban board</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>Add a new task to track progress and assign to team members.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter task title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter task description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: "Low" | "Medium" | "High") => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignee">Assignee</Label>
                  <Select
                    value={formData.assignee}
                    onValueChange={(value) => setFormData({ ...formData, assignee: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JD">John Doe</SelectItem>
                      <SelectItem value="SM">Sarah Miller</SelectItem>
                      <SelectItem value="AB">Alex Brown</SelectItem>
                      <SelectItem value="KL">Kate Lee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project">Project</Label>
                  <Select
                    value={formData.project}
                    onValueChange={(value) => setFormData({ ...formData, project: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Website Redesign">Website Redesign</SelectItem>
                      <SelectItem value="Mobile App Development">Mobile App Development</SelectItem>
                      <SelectItem value="Marketing Campaign">Marketing Campaign</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateTask}>
                Create Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <div key={column.id} className="space-y-4">
            <div className={`rounded-lg p-3 ${column.color}`}>
              <h3 className="font-semibold text-sm">
                {column.title} ({getTasksByStatus(column.id as Task["status"]).length})
              </h3>
            </div>
            <div
              className={`min-h-[500px] p-2 rounded-lg border-2 border-dashed transition-all duration-200 ${
                dragOverColumn === column.id ? "border-blue-400 bg-blue-50" : "border-gray-200"
              }`}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div className="space-y-3">
                {getTasksByStatus(column.id as Task["status"]).map((task) => (
                  <Card
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    onDragEnd={handleDragEnd}
                    className={`hover:shadow-md transition-all duration-200 cursor-move ${
                      draggedTask?.task.id === task.id ? "opacity-50 rotate-2 scale-105" : ""
                    }`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2 flex-1">
                          <GripVertical className="h-4 w-4 text-gray-400 cursor-grab active:cursor-grabbing" />
                          <CardTitle className="text-sm font-medium flex-1">{task.title}</CardTitle>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDeleteTask(task.id)} className="text-red-600">
                              Delete Task
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-xs text-muted-foreground">{task.description}</p>

                      <div className="flex items-center justify-between">
                        <Badge className={getPriorityColor(task.priority)}>
                          <Flag className="mr-1 h-2 w-2" />
                          {task.priority}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-xs">{task.assignee}</AvatarFallback>
                          </Avatar>
                        </div>
                      </div>

                      {task.subtasks.length > 0 && (
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground">
                            Subtasks ({task.subtasks.filter((s) => s.completed).length}/{task.subtasks.length})
                          </div>
                          {task.subtasks.map((subtask) => (
                            <div key={subtask.id} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={subtask.completed}
                                onChange={() => toggleSubtask(task.id, subtask.id)}
                                className="h-3 w-3"
                              />
                              <span
                                className={`text-xs ${subtask.completed ? "line-through text-muted-foreground" : ""}`}
                              >
                                {subtask.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {task.dueDate}
                        </div>
                        <div className="flex items-center">
                          <User className="mr-1 h-3 w-3" />
                          {task.project}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
