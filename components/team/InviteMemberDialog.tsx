// src/components/team/InviteMemberDialog.tsx
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
import { UserPlus } from "lucide-react";

interface InviteMemberDialogProps {
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
  onInvite: () => void;
  saving: boolean;
}

const InviteMemberDialog: React.FC<InviteMemberDialogProps> = ({
  isOpen,
  onOpenChange,
  formData,
  setFormData,
  onInvite,
  saving,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Inviter un membre de l'équipe</DialogTitle>
          <DialogDescription>
            Envoyez une invitation à un nouveau membre pour rejoindre votre espace de travail.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, name: e.target.value }))}
              placeholder="Entrez le nom complet"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, email: e.target.value }))}
              placeholder="Entrez l'adresse email"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="role">Rôle</Label>
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
              <Label htmlFor="department">Département</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, department: e.target.value }))}
                placeholder="Département"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Téléphone (Optionnel)</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, phone: e.target.value }))}
              placeholder="Numéro de téléphone"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Localisation (Optionnel)</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, location: e.target.value }))}
              placeholder="Ville, Pays"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onInvite} disabled={saving}>
            {saving ? "Envoi..." : "Envoyer l'invitation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberDialog;