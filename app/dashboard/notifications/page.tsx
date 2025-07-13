// src/app/notifications/page.tsx
"use client"

import { useNotifications } from "@/hooks/useNotifications" // Import the new hook
import NotificationStats from "@/components/notifications/NotificationStats"
import NotificationList from "@/components/notifications/NotificationList"
import NotificationSettings from "@/components/notifications/NotificationSettings"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { toast } from "sonner" // Keep toast for feedback on actions

export default function NotificationsPage() {
  const {
    notifications,
    settings,
    loading,
    filter,
    setFilter,
    unreadCount,
    filteredNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    handleSettingsChange,
    getNotificationIcon,
    getNotificationTypeColor,
  } = useNotifications()

  // Function to simulate saving settings - in a real app, this would trigger an API call
  const saveNotificationSettings = () => {
    // Here you would typically send the 'settings' state to your backend
    console.log("Saving settings (simulated):", settings)
    toast.success("Paramètres de notification enregistrés avec succès !")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Restez informé des activités du projet et des communications de l'équipe.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <Check className="mr-2 h-4 w-4" />
            Marquer tout comme lu
          </Button>
        </div>
      </div>

      {/* Stats */}
      <NotificationStats totalNotifications={notifications.length} unreadCount={unreadCount} />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Notifications List */}
        <div className="lg:col-span-2 space-y-4">
          <NotificationList
            notifications={filteredNotifications}
            filter={filter}
            setFilter={setFilter}
            unreadCount={unreadCount}
            markAsRead={markAsRead}
            deleteNotification={deleteNotification}
            getNotificationIcon={getNotificationIcon}
            getNotificationTypeColor={getNotificationTypeColor}
          />
        </div>

        {/* Notification Settings */}
        <NotificationSettings
          settings={settings}
          onSettingsChange={handleSettingsChange}
          onSaveSettings={saveNotificationSettings} // Pass the save function
        />
      </div>
    </div>
  )
}