// src/components/automation/dialogs/CreateRuleDialog.tsx
import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import AutomationRuleForm from "@/components/automation/AutomationRuleForm"
import { AutomationFormData } from "@/lib/types"

interface CreateRuleDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  formData: AutomationFormData
  setFormData: React.Dispatch<React.SetStateAction<AutomationFormData>>
  onCreate: () => void
}

const CreateRuleDialog: React.FC<CreateRuleDialogProps> = ({
  isOpen,
  onOpenChange,
  formData,
  setFormData,
  onCreate,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Créer une Règle
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Créer une Règle d'Automatisation</DialogTitle>
          <DialogDescription>Configurez des actions automatisées basées sur des déclencheurs spécifiques.</DialogDescription>
        </DialogHeader>
        <AutomationRuleForm formData={formData} setFormData={setFormData} />
        <DialogFooter>
          <Button type="submit" onClick={onCreate}>
            Créer la Règle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateRuleDialog