// src/components/team/EditMemberDialog.tsx
import React from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TeamMember } from "@/lib/types";

interface EditMemberDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData: {
    name: string;
    email: string;
    role: "Admin" | "Editor" | "Viewer";
    department: string;
    phone: string;
    location: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onUpdate: () => void;
  saving: boolean;
}

const EditMemberDialog: React.FC<EditMemberDialogProps> = ({
  isOpen,
  onOpenChange,
  formData,
  setFormData,
  onUpdate,
  saving,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier le membre de l'équipe</DialogTitle>
          <DialogDescription>
            Mettez à jour les informations et les permissions du membre de l'équipe.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-name">Nom complet</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, name: e.target.value }))}
              placeholder="Entrez le nom complet"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-email">Email</Label>
            <Input
              id="edit-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, email: e.target.value }))}
              placeholder="Entrez l'adresse email"
              disabled // Email should typically not be editable directly from here
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-role">Rôle</Label>
              <Select
                value={formData.role}
                onValueChange={(value: "Admin" | "Editor" | "Viewer") =>
                  setFormData((prev: any) => ({ ...prev, role: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Editor">Editeur</SelectItem>
                  <SelectItem value="Viewer">Spectateur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-department">Département</Label>
              <Input
                id="edit-department"
                value={formData.department}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, department: e.target.value }))}
                placeholder="Département"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-phone">Téléphone</Label>
            <Input
              id="edit-phone"
              value={formData.phone}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, phone: e.target.value }))}
              placeholder="Numéro de téléphone"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-location">Localisation</Label>
            <Input
              id="edit-location"
              value={formData.location}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, location: e.target.value }))}
              placeholder="Ville, Pays"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onUpdate} disabled={saving}>
            {saving ? "Mise à jour..." : "Mettre à jour le membre"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditMemberDialog;