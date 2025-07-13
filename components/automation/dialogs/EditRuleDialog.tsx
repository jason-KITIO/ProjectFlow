// src/components/automation/dialogs/EditRuleDialog.tsx
import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import AutomationRuleForm from "@/components/automation/AutomationRuleForm"
import { AutomationFormData } from "@/lib/types"

interface EditRuleDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  formData: AutomationFormData
  setFormData: React.Dispatch<React.SetStateAction<AutomationFormData>>
  onUpdate: () => void
}

const EditRuleDialog: React.FC<EditRuleDialogProps> = ({
  isOpen,
  onOpenChange,
  formData,
  setFormData,
  onUpdate,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Modifier la Règle d'Automatisation</DialogTitle>
          <DialogDescription>Mettez à jour les paramètres de votre règle d'automatisation.</DialogDescription>
        </DialogHeader>
        <AutomationRuleForm formData={formData} setFormData={setFormData} />
        <DialogFooter>
          <Button type="submit" onClick={onUpdate}>
            Mettre à Jour la Règle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditRuleDialog