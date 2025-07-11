"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Play, Pause, Square, Clock, Plus, MoreHorizontal, Calendar, User } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface TimeEntry {
  id: string
  task_id: string | null
  user_id: string
  description: string | null
  start_time: string
  end_time: string | null
  duration: number | null
  created_at: string
  task?: {
    title: string
    project?: {
      name: string
    }
  }
}

interface ActiveTimer {
  taskId: string | null
  description: string
  startTime: Date
}

export default function TimeTrackingPage() {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
  const [activeTimer, setActiveTimer] = useState<ActiveTimer | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    taskId: "",
    description: "",
    startTime: "",
    endTime: "",
    duration: "",
  })

  const supabase = createClient()

  useEffect(() => {
    fetchTimeEntries()
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const fetchTimeEntries = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from("time_entries")
        .select(`
          *,
          task:tasks(
            title,
            project:projects(name)
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) {
        toast.error("Failed to fetch time entries")
        return
      }

      setTimeEntries(data || [])
    } catch (error) {
      toast.error("An error occurred while fetching time entries")
    } finally {
      setLoading(false)
    }
  }

  const startTimer = (taskId: string | null = null, description = "") => {
    setActiveTimer({
      taskId,
      description,
      startTime: new Date(),
    })
    toast.success("Timer started!")
  }

  const pauseTimer = async () => {
    if (!activeTimer) return

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const duration = Math.floor((currentTime.getTime() - activeTimer.startTime.getTime()) / 1000 / 60) // in minutes

    try {
      const { error } = await supabase.from("time_entries").insert({
        task_id: activeTimer.taskId,
        user_id: user.id,
        description: activeTimer.description,
        start_time: activeTimer.startTime.toISOString(),
        end_time: currentTime.toISOString(),
        duration,
      })

      if (error) {
        toast.error("Failed to save time entry")
        return
      }

      setActiveTimer(null)
      fetchTimeEntries()
      toast.success("Timer stopped and time logged!")
    } catch (error) {
      toast.error("An error occurred while saving time entry")
    }
  }

  const stopTimer = () => {
    setActiveTimer(null)
    toast.info("Timer stopped without saving")
  }

  const handleCreateTimeEntry = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    try {
      const startTime = new Date(formData.startTime)
      const endTime = new Date(formData.endTime)
      const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000 / 60)

      const { error } = await supabase.from("time_entries").insert({
        task_id: formData.taskId || null,
        user_id: user.id,
        description: formData.description,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        duration,
      })

      if (error) {
        toast.error("Failed to create time entry")
        return
      }

      setFormData({
        taskId: "",
        description: "",
        startTime: "",
        endTime: "",
        duration: "",
      })
      setIsCreateDialogOpen(false)
      fetchTimeEntries()
      toast.success("Time entry created successfully!")
    } catch (error) {
      toast.error("An error occurred while creating time entry")
    }
  }

  const deleteTimeEntry = async (id: string) => {
    try {
      const { error } = await supabase.from("time_entries").delete().eq("id", id)

      if (error) {
        toast.error("Failed to delete time entry")
        return
      }

      fetchTimeEntries()
      toast.success("Time entry deleted!")
    } catch (error) {
      toast.error("An error occurred while deleting time entry")
    }
  }

  const formatDuration = (minutes: number | null) => {
    if (!minutes) return "0m"
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const getActiveTimerDuration = () => {
    if (!activeTimer) return "00:00:00"
    const diff = currentTime.getTime() - activeTimer.startTime.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const getTotalTimeToday = () => {
    const today = new Date().toDateString()
    const todayEntries = timeEntries.filter((entry) => new Date(entry.created_at).toDateString() === today)
    const total = todayEntries.reduce((sum, entry) => sum + (entry.duration || 0), 0)
    return formatDuration(total)
  }

  const getTotalTimeThisWeek = () => {
    const now = new Date()
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()))
    const weekEntries = timeEntries.filter((entry) => new Date(entry.created_at) >= weekStart)
    const total = weekEntries.reduce((sum, entry) => sum + (entry.duration || 0), 0)
    return formatDuration(total)
  }

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
          <h1 className="text-3xl font-bold tracking-tight">Time Tracking</h1>
          <p className="text-muted-foreground">Track time spent on tasks and projects</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Time Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Time Entry</DialogTitle>
              <DialogDescription>Manually add a time entry for completed work.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="What did you work on?"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="datetime-local"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="datetime-local"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateTimeEntry}>
                Add Entry
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Timer Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Active Timer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              {activeTimer ? (
                <>
                  <div className="text-3xl font-mono font-bold">{getActiveTimerDuration()}</div>
                  <p className="text-sm text-muted-foreground">{activeTimer.description || "Working on task"}</p>
                </>
              ) : (
                <>
                  <div className="text-3xl font-mono font-bold text-muted-foreground">00:00:00</div>
                  <p className="text-sm text-muted-foreground">No active timer</p>
                </>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {!activeTimer ? (
                <Button onClick={() => startTimer()} size="lg">
                  <Play className="mr-2 h-4 w-4" />
                  Start Timer
                </Button>
              ) : (
                <>
                  <Button onClick={pauseTimer} size="lg">
                    <Pause className="mr-2 h-4 w-4" />
                    Stop & Save
                  </Button>
                  <Button onClick={stopTimer} variant="outline" size="lg">
                    <Square className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalTimeToday()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getTotalTimeThisWeek()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{timeEntries.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Time Entries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Time Entries</CardTitle>
          <CardDescription>Your logged time entries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timeEntries.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No time entries yet. Start tracking your time!</p>
            ) : (
              timeEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{entry.description || "No description"}</p>
                    {entry.task && (
                      <p className="text-sm text-muted-foreground">
                        {entry.task.title} • {entry.task.project?.name}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {new Date(entry.start_time).toLocaleDateString()} •
                      {new Date(entry.start_time).toLocaleTimeString()} -
                      {entry.end_time ? new Date(entry.end_time).toLocaleTimeString() : "Ongoing"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{formatDuration(entry.duration)}</Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => deleteTimeEntry(entry.id)} className="text-red-600">
                          Delete Entry
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
