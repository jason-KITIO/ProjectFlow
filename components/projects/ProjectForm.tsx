// src/components/projects/ProjectForm.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectFormData } from "@/lib/types";

interface ProjectFormProps {
  formData: ProjectFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ formData, setFormData }) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Nom du Projet</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Entrez le nom du projet"
          required // Ajout de l'attribut required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Entrez la description du projet"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="startDate">Date de début</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
            required // Ajout de l'attribut required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="endDate">Date de fin</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
            required // Ajout de l'attribut required
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="priority">Priorité</Label>
        <Select
          value={formData.priority}
          onValueChange={(value: "Basse" | "Moyenne" | "Élevée") =>
            setFormData({ ...formData, priority: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez la priorité" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Basse">Basse</SelectItem>
            <SelectItem value="Moyenne">Moyenne</SelectItem>
            <SelectItem value="Élevée">Élevée</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProjectForm;
