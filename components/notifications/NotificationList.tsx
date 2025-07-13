// src/components/notifications/NotificationList.tsx
import React, { JSX } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Check, X } from "lucide-react"
import { Notification } from "@/lib/types"

interface NotificationListProps {
  notifications: Notification[]
  filter: "all" | "unread" | "read"
  setFilter: (filter: "all" | "unread" | "read") => void
  unreadCount: number
  markAsRead: (id: string) => void
  deleteNotification: (id: string) => void
  getNotificationIcon: (type: string) => JSX.Element
  getNotificationTypeColor: (type: string) => string
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  filter,
  setFilter,
  unreadCount,
  markAsRead,
  deleteNotification,
  getNotificationIcon,
  getNotificationTypeColor,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Notifications récentes</CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
              Toutes
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("unread")}
            >
              Non lues ({unreadCount})
            </Button>
            <Button
              variant={filter === "read" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("read")}
            >
              Lues
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Aucune notification trouvée.</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-3 p-4 rounded-lg border ${
                  !notification.read ? "bg-blue-50 border-blue-200" : "bg-white"
                }`}
              >
                <div className="flex-shrink-0">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      {notification.message && (
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      )}
                      <div className="flex items-center space-x-2">
                        <Badge className={getNotificationTypeColor(notification.type)}>{notification.type}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(notification.created_at).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {!notification.read && (
                        <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default NotificationList