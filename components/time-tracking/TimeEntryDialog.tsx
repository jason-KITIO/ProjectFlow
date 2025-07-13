// src/components/time-tracking/TimeEntryDialog.tsx
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Task, Project } from "@/lib/types";

interface TimeEntryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData: {
    taskId: string;
    description: string;
    startTime: string;
    endTime: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onCreate: () => void;
  saving: boolean;
  tasks: Task[];
  projects: Project[];
  formatDateTimeLocal: (date: Date) => string;
}

const TimeEntryDialog: React.FC<TimeEntryDialogProps> = ({
  isOpen,
  onOpenChange,
  formData,
  setFormData,
  onCreate,
  saving,
  tasks,
  projects,
  formatDateTimeLocal,
}) => {
  // Set default start and end times to current time when dialog opens
  useEffect(() => {
    if (isOpen && !formData.startTime && !formData.endTime) {
      const now = new Date();
      setFormData((prev: any) => ({
        ...prev,
        endTime: formatDateTimeLocal(now),
        startTime: formatDateTimeLocal(new Date(now.getTime() - 30 * 60 * 1000)), // 30 minutes before now
      }));
    }
  }, [isOpen, formData.startTime, formData.endTime, setFormData, formatDateTimeLocal]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter une entrée de temps</DialogTitle>
          <DialogDescription>Ajoutez manuellement une entrée de temps pour le travail effectué.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="manual-description">Description</Label>
            <Textarea
              id="manual-description"
              value={formData.description}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, description: e.target.value }))}
              placeholder="Sur quoi avez-vous travaillé ?"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="task-select">Tâche (Optionnel)</Label>
            <Select
              value={formData.taskId}
              onValueChange={(value) => setFormData((prev: any) => ({ ...prev, taskId: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une tâche" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Aucune tâche</SelectItem>
                {tasks.map((task) => (
                  <SelectItem key={task.id} value={task.id}>
                    {task.title} {task.project_id && `(${projects.find(p => p.id === task.project_id)?.name || 'Projet inconnu'})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="manual-startTime">Heure de début</Label>
              <Input
                id="manual-startTime"
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, startTime: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="manual-endTime">Heure de fin</Label>
              <Input
                id="manual-endTime"
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, endTime: e.target.value }))}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onCreate} disabled={saving}>
            {saving ? "Ajout en cours..." : "Ajouter l'entrée"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TimeEntryDialog;