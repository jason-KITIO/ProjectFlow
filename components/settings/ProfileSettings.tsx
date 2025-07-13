// src/components/settings/ProfileSettings.tsx
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfile } from "@/lib/types";

interface ProfileSettingsProps {
  profile: UserProfile | null;
  formData: {
    fullName: string;
    email: string;
    department: string;
    phone: string;
    location: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>; // Using 'any' for simplicity from parent formData
  onUpdateProfile: () => void;
  onAvatarUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  saving: boolean;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  profile,
  formData,
  setFormData,
  onUpdateProfile,
  onAvatarUpload,
  saving,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profil utilisateur</CardTitle>
        <CardDescription>Mettez à jour vos informations de profil.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20"> {/* Larger avatar */}
            <AvatarImage
              src={profile?.avatar_url || "/avatar.png"} // Default placeholder
              alt="Avatar de l'utilisateur"
            />
            <AvatarFallback>
              {profile?.full_name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <Label htmlFor="avatar-upload" className="sr-only">Télécharger un avatar</Label>
          <Input id="avatar-upload" type="file" onChange={onAvatarUpload} className="max-w-xs" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fullName">Nom complet</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, fullName: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={formData.email} disabled className="cursor-not-allowed" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="department">Département</Label>
          <Input
            id="department"
            value={formData.department}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, department: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, phone: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Localisation</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, location: e.target.value }))}
          />
        </div>
        <Button onClick={onUpdateProfile} disabled={saving}>
          {saving ? "Sauvegarde..." : "Sauvegarder le profil"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;