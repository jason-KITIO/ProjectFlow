// src/data/notifications/initialSettings.ts
import { NotificationSettings } from "@/lib/types"

export const initialNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  pushNotifications: true,
  taskAssignments: true,
  projectUpdates: true,
  deadlineReminders: true,
  teamMessages: false,
  weeklyReports: true,
};