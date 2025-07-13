// src/components/projects/dialogs/CreateProjectDialog.tsx
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
import ProjectForm from "@/components/projects/ProjectForm"
import { ProjectFormData } from "@/lib/types"

interface CreateProjectDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  formData: ProjectFormData
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>
  onCreate: () => void
}

const CreateProjectDialog: React.FC<CreateProjectDialogProps> = ({
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
          Nouveau Projet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Créer un Nouveau Projet</DialogTitle>
          <DialogDescription>Ajoutez un nouveau projet pour commencer à suivre les progrès et gérer les tâches.</DialogDescription>
        </DialogHeader>
        <ProjectForm formData={formData} setFormData={setFormData} />
        <DialogFooter>
          <Button type="submit" onClick={onCreate}>
            Créer le Projet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateProjectDialog