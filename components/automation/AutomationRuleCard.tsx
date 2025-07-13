// src/components/automation/AutomationRuleCard.tsx
import React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { AutomationRule } from "@/lib/types"
import { getActionIcon, getTriggerIcon, getLabelByValue } from "@/lib/utils"

interface AutomationRuleCardProps {
  rule: AutomationRule
  onEdit: (rule: AutomationRule) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string, active: boolean) => void
}

const AutomationRuleCard: React.FC<AutomationRuleCardProps> = ({ rule, onEdit, onDelete, onToggleStatus }) => {
  const triggerLabel = getLabelByValue(rule.trigger_type, 'trigger');
  const actionLabel = getLabelByValue(rule.action_type, 'action');

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
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
            <span>Déclencheur : {triggerLabel}</span>
            <span>Action : {actionLabel}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Switch checked={rule.active} onCheckedChange={() => onToggleStatus(rule.id, rule.active)} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(rule)}>
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(rule.id)} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default AutomationRuleCard