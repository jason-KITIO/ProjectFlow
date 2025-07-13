// src/components/settings/PasswordSettings.tsx
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface PasswordSettingsProps {
  formData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>; // Using 'any' for simplicity from parent formData
  showPassword: boolean;
  setShowPassword: (checked: boolean) => void;
  onChangePassword: () => void;
  saving: boolean;
}

const PasswordSettings: React.FC<PasswordSettingsProps> = ({
  formData,
  setFormData,
  showPassword,
  setShowPassword,
  onChangePassword,
  saving,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Changer le mot de passe</CardTitle>
        <CardDescription>Mettez à jour le mot de passe de votre compte.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Mot de passe actuel</Label>
          <Input
            id="currentPassword"
            type={showPassword ? "text" : "password"}
            value={formData.currentPassword}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, currentPassword: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPassword">Nouveau mot de passe</Label>
          <Input
            id="newPassword"
            type={showPassword ? "text" : "password"}
            value={formData.newPassword}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, newPassword: e.target.value }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <Input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, confirmPassword: e.target.value }))}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="showPassword" checked={showPassword} onCheckedChange={setShowPassword} />
          <Label htmlFor="showPassword">Afficher le mot de passe</Label>
        </div>
        <Button onClick={onChangePassword} disabled={saving}>
          {saving ? "Changement..." : "Changer le mot de passe"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PasswordSettings;