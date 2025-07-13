// src/components/automation/AutomationRuleForm.tsx
import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AutomationFormData } from "@/lib/types"
import { triggerTypes, actionTypes } from "@/lib/constants"

interface AutomationRuleFormProps {
  formData: AutomationFormData
  setFormData: React.Dispatch<React.SetStateAction<AutomationFormData>>
}

const AutomationRuleForm: React.FC<AutomationRuleFormProps> = ({ formData, setFormData }) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Nom de la règle</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Entrez le nom de la règle"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Décrivez ce que fait cette règle"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="trigger">Déclencheur</Label>
          <Select
            value={formData.triggerType}
            onValueChange={(value) => setFormData({ ...formData, triggerType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un déclencheur" />
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
              <SelectValue placeholder="Sélectionnez une action" />
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
  )
}

export default AutomationRuleForm