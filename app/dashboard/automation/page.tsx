"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
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
import {
  Zap,
  Plus,
  MoreHorizontal,
  Play,
  Pause,
  Edit,
  Trash2,
  Clock,
  Bell,
  UserPlus,
  Mail,
  CheckCircle,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface AutomationRule {
  id: string
  name: string
  description: string | null
  trigger_type: string
  trigger_conditions: any
  action_type: string
  action_parameters: any
  active: boolean
  created_by: string | null
  created_at: string
  updated_at: string
}

const triggerTypes = [
  { value: "task_status_change", label: "Task Status Change" },
  { value: "due_date_approaching", label: "Due Date Approaching" },
  { value: "project_status_change", label: "Project Status Change" },
  { value: "task_assigned", label: "Task Assigned" },
  { value: "project_created", label: "Project Created" },
  { value: "time_tracked", label: "Time Tracked" },
]

const actionTypes = [
  { value: "send_notification", label: "Send Notification" },
  { value: "send_email", label: "Send Email" },
  { value: "assign_task", label: "Assign Task" },
  { value: "update_status", label: "Update Status" },
  { value: "create_task", label: "Create Task" },
  { value: "add_comment", label: "Add Comment" },
]

export default function AutomationPage() {
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<AutomationRule | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    triggerType: "",
    actionType: "",
    triggerConditions: {},
    actionParameters: {},
  })

  const supabase = createClient()

  useEffect(() => {
    fetchAutomationRules()
  }, [])

  const fetchAutomationRules = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from("automation_rules")
        .select("*")
        .eq("created_by", user.id)
        .order("created_at", { ascending: false })

      if (error) {
        toast.error("Failed to fetch automation rules")
        return
      }

      setAutomationRules(data || [])
    } catch (error) {
      toast.error("An error occurred while fetching automation rules")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateRule = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    try {
      const { error } = await supabase.from("automation_rules").insert({
        name: formData.name,
        description: formData.description,
        trigger_type: formData.triggerType,
        trigger_conditions: formData.triggerConditions,
        action_type: formData.actionType,
        action_parameters: formData.actionParameters,
        created_by: user.id,
      })

      if (error) {
        toast.error("Failed to create automation rule")
        return
      }

      setFormData({
        name: "",
        description: "",
        triggerType: "",
        actionType: "",
        triggerConditions: {},
        actionParameters: {},
      })
      setIsCreateDialogOpen(false)
      fetchAutomationRules()
      toast.success("Automation rule created successfully!")
    } catch (error) {
      toast.error("An error occurred while creating automation rule")
    }
  }

  const handleEditRule = (rule: AutomationRule) => {
    setEditingRule(rule)
    setFormData({
      name: rule.name,
      description: rule.description || "",
      triggerType: rule.trigger_type,
      actionType: rule.action_type,
      triggerConditions: rule.trigger_conditions || {},
      actionParameters: rule.action_parameters || {},
    })
  }

  const handleUpdateRule = async () => {
    if (!editingRule) return

    try {
      const { error } = await supabase
        .from("automation_rules")
        .update({
          name: formData.name,
          description: formData.description,
          trigger_type: formData.triggerType,
          trigger_conditions: formData.triggerConditions,
          action_type: formData.actionType,
          action_parameters: formData.actionParameters,
        })
        .eq("id", editingRule.id)

      if (error) {
        toast.error("Failed to update automation rule")
        return
      }

      setEditingRule(null)
      setFormData({
        name: "",
        description: "",
        triggerType: "",
        actionType: "",
        triggerConditions: {},
        actionParameters: {},
      })
      fetchAutomationRules()
      toast.success("Automation rule updated successfully!")
    } catch (error) {
      toast.error("An error occurred while updating automation rule")
    }
  }

  const toggleRuleStatus = async (id: string, active: boolean) => {
    try {
      const { error } = await supabase.from("automation_rules").update({ active: !active }).eq("id", id)

      if (error) {
        toast.error("Failed to update rule status")
        return
      }

      setAutomationRules(automationRules.map((rule) => (rule.id === id ? { ...rule, active: !active } : rule)))
      toast.success(`Rule ${!active ? "activated" : "deactivated"}`)
    } catch (error) {
      toast.error("An error occurred while updating rule status")
    }
  }

  const deleteRule = async (id: string) => {
    try {
      const { error } = await supabase.from("automation_rules").delete().eq("id", id)

      if (error) {
        toast.error("Failed to delete automation rule")
        return
      }

      setAutomationRules(automationRules.filter((rule) => rule.id !== id))
      toast.success("Automation rule deleted!")
    } catch (error) {
      toast.error("An error occurred while deleting automation rule")
    }
  }

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case "send_notification":
        return <Bell className="h-4 w-4" />
      case "send_email":
        return <Mail className="h-4 w-4" />
      case "assign_task":
        return <UserPlus className="h-4 w-4" />
      case "update_status":
        return <CheckCircle className="h-4 w-4" />
      case "create_task":
        return <Plus className="h-4 w-4" />
      default:
        return <Zap className="h-4 w-4" />
    }
  }

  const getTriggerIcon = (triggerType: string) => {
    switch (triggerType) {
      case "due_date_approaching":
        return <Clock className="h-4 w-4" />
      case "task_status_change":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Zap className="h-4 w-4" />
    }
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
          <h1 className="text-3xl font-bold tracking-tight">Automation</h1>
          <p className="text-muted-foreground">Automate repetitive tasks and streamline your workflow</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Rule
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create Automation Rule</DialogTitle>
              <DialogDescription>Set up automated actions based on specific triggers.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Rule Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter rule name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what this rule does"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="trigger">Trigger</Label>
                  <Select
                    value={formData.triggerType}
                    onValueChange={(value) => setFormData({ ...formData, triggerType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select trigger" />
                    </SelectTrigger>
                    <SelectContent>
                      {triggerTypes.map((trigger) => (
                        <SelectItem key={trigger.value} value={trigger.value}>
                          {trigger.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="action">Action</Label>
                  <Select
                    value={formData.actionType}
                    onValueChange={(value) => setFormData({ ...formData, actionType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      {actionTypes.map((action) => (
                        <SelectItem key={action.value} value={action.value}>
                          {action.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateRule}>
                Create Rule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rules</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{automationRules.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rules</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{automationRules.filter((rule) => rule.active).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Rules</CardTitle>
            <Pause className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{automationRules.filter((rule) => !rule.active).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Automation Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Automation Rules</CardTitle>
          <CardDescription>Manage your automated workflows and triggers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {automationRules.length === 0 ? (
              <div className="text-center py-12">
                <Zap className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No automation rules yet. Create your first rule to get started!</p>
              </div>
            ) : (
              automationRules.map((rule) => (
                <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getTriggerIcon(rule.trigger_type)}
                      <span className="text-sm text-muted-foreground">→</span>
                      {getActionIcon(rule.action_type)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{rule.name}</p>
                        <Badge variant={rule.active ? "default" : "secondary"}>
                          {rule.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      {rule.description && <p className="text-sm text-muted-foreground">{rule.description}</p>}
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>Trigger: {triggerTypes.find((t) => t.value === rule.trigger_type)?.label}</span>
                        <span>Action: {actionTypes.find((a) => a.value === rule.action_type)?.label}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch checked={rule.active} onCheckedChange={() => toggleRuleStatus(rule.id, rule.active)} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditRule(rule)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteRule(rule.id)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
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

      {/* Edit Rule Dialog */}
      <Dialog open={!!editingRule} onOpenChange={() => setEditingRule(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Automation Rule</DialogTitle>
            <DialogDescription>Update your automation rule settings.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Rule Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter rule name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what this rule does"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-trigger">Trigger</Label>
                <Select
                  value={formData.triggerType}
                  onValueChange={(value) => setFormData({ ...formData, triggerType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    {triggerTypes.map((trigger) => (
                      <SelectItem key={trigger.value} value={trigger.value}>
                        {trigger.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-action">Action</Label>
                <Select
                  value={formData.actionType}
                  onValueChange={(value) => setFormData({ ...formData, actionType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    {actionTypes.map((action) => (
                      <SelectItem key={action.value} value={action.value}>
                        {action.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleUpdateRule}>
              Update Rule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
