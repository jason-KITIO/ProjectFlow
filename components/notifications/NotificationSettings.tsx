// src/components/notifications/NotificationSettings.tsx
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Settings } from "lucide-react"
import { NotificationSettings as NotificationSettingsType } from "@/lib/types" // Renommer pour éviter le conflit

interface NotificationSettingsProps {
  settings: NotificationSettingsType
  onSettingsChange: (key: keyof NotificationSettingsType, value: boolean) => void
  onSaveSettings: () => void // New prop for saving settings (optional, can be integrated into onSettingsChange)
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  settings,
  onSettingsChange,
  onSaveSettings,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Paramètres de notification
        </CardTitle>
        <CardDescription>Personnalisez la façon dont vous recevez les notifications.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Notifications par e-mail</Label>
              <p className="text-xs text-muted-foreground">Recevez les notifications par e-mail.</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => onSettingsChange("emailNotifications", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Notifications push</Label>
              <p className="text-xs text-muted-foreground">Recevez les notifications du navigateur.</p>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => onSettingsChange("pushNotifications", checked)}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4 className="text-sm font-medium">Types de notification</h4>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm">Attributions de tâches</Label>
              <p className="text-xs text-muted-foreground">Lorsque vous êtes assigné à une tâche.</p>
            </div>
            <Switch
              checked={settings.taskAssignments}
              onCheckedChange={(checked) => onSettingsChange("taskAssignments", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm">Mises à jour de projet</Label>
              <p className="text-xs text-muted-foreground">Lorsque les projets dont vous faites partie sont mis à jour.</p>
            </div>
            <Switch
              checked={settings.projectUpdates}
              onCheckedChange={(checked) => onSettingsChange("projectUpdates", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm">Rappels de date limite</Label>
              <p className="text-xs text-muted-foreground">Rappels pour les dates limites à venir.</p>
            </div>
            <Switch
              checked={settings.deadlineReminders}
              onCheckedChange={(checked) => onSettingsChange("deadlineReminders", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm">Messages d'équipe</Label>
              <p className="text-xs text-muted-foreground">Lorsque quelqu'un vous mentionne.</p>
            </div>
            <Switch
              checked={settings.teamMessages}
              onCheckedChange={(checked) => onSettingsChange("teamMessages", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm">Rapports hebdomadaires</Label>
              <p className="text-xs text-muted-foreground">Résumé hebdomadaire de votre activité.</p>
            </div>
            <Switch
              checked={settings.weeklyReports}
              onCheckedChange={(checked) => onSettingsChange("weeklyReports", checked)}
            />
          </div>
        </div>

        {/* This button will trigger the save action in the parent component */}
        <Button className="w-full" onClick={onSaveSettings}>Enregistrer les paramètres</Button>
      </CardContent>
    </Card>
  )
}

export default NotificationSettings