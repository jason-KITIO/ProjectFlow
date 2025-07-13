// src/hooks/useNotifications.ts
import { useState, useEffect, useMemo } from "react"
import { toast } from "sonner"
import { Notification, NotificationSettings } from "@/lib/types"
import { initialNotifications } from "@/data/notifications/initialNotifications"
import { initialNotificationSettings } from "@/data/notifications/initialSettings"
import { Bell, CheckCircle, XCircle, Info, AlertTriangle, Settings } from "lucide-react"

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [settings, setSettings] = useState<NotificationSettings>(initialNotificationSettings)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all")

  // Simulate fetching notifications and settings on mount
  useEffect(() => {
    setLoading(true)
    // Simulate API call delay
    const timer = setTimeout(() => {
      setNotifications(initialNotifications.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()))
      // In a real app, you'd fetch user-specific settings from a DB
      setSettings(initialNotificationSettings)
      setLoading(false)
    }, 500) // 0.5 second delay
    return () => clearTimeout(timer)
  }, [])

  const markAsRead = async (id: string) => {
    try {
      // Simulate API call for marking as read
      // In a real app, you'd make a Supabase update call
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      )
      toast.success("Notification marquée comme lue.")
    } catch (error) {
      toast.error("Échec du marquage de la notification comme lue.")
    }
  }

  const markAllAsRead = async () => {
    try {
      // Simulate API call for marking all as read
      // In a real app, you'd make a Supabase update call for the user's unread notifications
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
      toast.success("Toutes les notifications ont été marquées comme lues.")
    } catch (error) {
      toast.error("Échec du marquage de toutes les notifications comme lues.")
    }
  }

  const deleteNotification = async (id: string) => {
    try {
      // Simulate API call for deleting a notification
      // In a real app, you'd make a Supabase delete call
      setNotifications((prev) => prev.filter((n) => n.id !== id))
      toast.success("Notification supprimée.")
    } catch (error) {
      toast.error("Échec de la suppression de la notification.")
    }
  }

  const handleSettingsChange = (key: keyof NotificationSettings, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    // In a real app, you'd send this update to your backend/Supabase
    toast.info(`Paramètre '${key}' mis à jour (simulé).`)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Info className="h-5 w-5 text-blue-600" />
    }
  }

  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  const filteredNotifications = useMemo(() => {
    if (filter === "unread") return notifications.filter((notification) => !notification.read)
    if (filter === "read") return notifications.filter((notification) => notification.read)
    return notifications
  }, [notifications, filter])

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications])

  return {
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
  }
}