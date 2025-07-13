// src/data/settings/initialProfileData.ts
import { UserProfile, UserPreferences } from "@/lib/types";

export const initialUserProfileData: UserProfile = {
  id: "mock-user-123",
  email: "utilisateur.test@example.com",
  full_name: "Jean Dupont",
  avatar_url: "https://i.pravatar.cc/150?img=68", // A random avatar image
  role: "Développeur",
  department: "Ingénierie",
  phone: "+33 6 12 34 56 78",
  location: "Paris, France",
};

export const initialUserPreferencesData: UserPreferences = {
  theme: "light",
  language: "fr", // Default to French as per the prompt's language
  timezone: "Europe/Paris",
  emailNotifications: true,
  pushNotifications: false,
  weeklyReports: true,
  taskReminders: true,
  projectUpdates: false,
};