// src/components/files/UploadFileDialog.tsx
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProjectRelation, TaskRelation } from "@/lib/types" // Importez les types de relations

interface UploadFileDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onFileSelect: (file: File | null) => void
  onProjectSelect: (projectId: string) => void
  onTaskSelect: (taskId: string) => void
  onUpload: () => void
  uploading: boolean
  formData: { projectId: string; taskId: string }
  dummyProjects: ProjectRelation[]
  dummyTasks: TaskRelation[]
}

const UploadFileDialog: React.FC<UploadFileDialogProps> = ({
  isOpen,
  onOpenChange,
  onFileSelect,
  onProjectSelect,
  onTaskSelect,
  onUpload,
  uploading,
  formData,
  dummyProjects,
  dummyTasks,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Téléverser un fichier</DialogTitle>
          <DialogDescription>Téléversez un fichier pour le partager avec votre équipe.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="file">Sélectionner un fichier</Label>
            <Input id="file" type="file" onChange={(e) => onFileSelect(e.target.files?.[0] || null)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="project">Projet (Optionnel)</Label>
            <Select
              value={formData.projectId}
              onValueChange={onProjectSelect}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un projet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Aucun projet</SelectItem>
                {dummyProjects.map(project => (
                  <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="task">Tâche (Optionnel)</Label>
            <Select
              value={formData.taskId}
              onValueChange={onTaskSelect}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une tâche" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Aucune tâche</SelectItem>
                {dummyTasks.map(task => (
                  <SelectItem key={task.id} value={task.id}>{task.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onUpload} disabled={uploading}>
            {uploading ? "Téléversement..." : "Téléverser le fichier"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UploadFileDialog