// src/components/settings/PreferencesSettings.tsx
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UserPreferences } from "@/lib/types";

interface PreferencesSettingsProps {
  preferences: UserPreferences;
  onPreferenceChange: (key: keyof UserPreferences, value: any) => void;
}

const PreferencesSettings: React.FC<PreferencesSettingsProps> = ({
  preferences,
  onPreferenceChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences</CardTitle>
        <CardDescription>Personnalisez les paramètres de votre compte.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="theme">Thème</Label>
          <Select
            value={preferences.theme}
            onValueChange={(value) => onPreferenceChange("theme", value)}
          >
            <SelectTrigger id="theme">
              <SelectValue placeholder="Sélectionner le thème" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Clair</SelectItem>
              <SelectItem value="dark">Foncé</SelectItem>
              <SelectItem value="system">Système</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="language">Langue</Label>
          <Select
            value={preferences.language}
            onValueChange={(value) => onPreferenceChange("language", value)}
          >
            <SelectTrigger id="language">
              <SelectValue placeholder="Sélectionner la langue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="es">Español</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="timezone">Fuseau horaire</Label>
          <Select
            value={preferences.timezone}
            onValueChange={(value) => onPreferenceChange("timezone", value)}
          >
            <SelectTrigger id="timezone">
              <SelectValue placeholder="Sélectionner le fuseau horaire" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UTC">UTC</SelectItem>
              <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
              <SelectItem value="Africa/Douala">Africa/Douala</SelectItem> {/* Based on current location */}
              <SelectItem value="America/New_York">America/New York</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="emailNotifications">Notifications par e-mail</Label>
          <Switch
            id="emailNotifications"
            checked={preferences.emailNotifications}
            onCheckedChange={(checked) => onPreferenceChange("emailNotifications", checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="pushNotifications">Notifications push</Label>
          <Switch
            id="pushNotifications"
            checked={preferences.pushNotifications}
            onCheckedChange={(checked) => onPreferenceChange("pushNotifications", checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="weeklyReports">Rapports hebdomadaires</Label>
          <Switch
            id="weeklyReports"
            checked={preferences.weeklyReports}
            onCheckedChange={(checked) => onPreferenceChange("weeklyReports", checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="taskReminders">Rappels de tâches</Label>
          <Switch
            id="taskReminders"
            checked={preferences.taskReminders}
            onCheckedChange={(checked) => onPreferenceChange("taskReminders", checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="projectUpdates">Mises à jour du projet</Label>
          <Switch
            id="projectUpdates"
            checked={preferences.projectUpdates}
            onCheckedChange={(checked) => onPreferenceChange("projectUpdates", checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PreferencesSettings;