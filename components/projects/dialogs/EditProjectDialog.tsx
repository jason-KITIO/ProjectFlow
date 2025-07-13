// src/components/projects/dialogs/EditProjectDialog.tsx
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
import ProjectForm from "@/components/projects/ProjectForm"
import { ProjectFormData } from "@/lib/types"

interface EditProjectDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  formData: ProjectFormData
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>
  onUpdate: () => void
}

const EditProjectDialog: React.FC<EditProjectDialogProps> = ({
  isOpen,
  onOpenChange,
  formData,
  setFormData,
  onUpdate,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier le Projet</DialogTitle>
          <DialogDescription>Mettez à jour les détails et les paramètres du projet.</DialogDescription>
        </DialogHeader>
        <ProjectForm formData={formData} setFormData={setFormData} />
        <DialogFooter>
          <Button type="submit" onClick={onUpdate}>
            Mettre à Jour le Projet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditProjectDialog