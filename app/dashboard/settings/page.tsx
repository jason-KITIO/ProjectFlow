// src/app/(main)/settings/page.tsx
"use client";

import { useProfile } from "@/hooks/useProfile";
import ProfileSettings from "@/components/settings/ProfileSettings";
import PasswordSettings from "@/components/settings/PasswordSettings";
import PreferencesSettings from "@/components/settings/PreferencesSettings";

export default function SettingsPage() {
  const {
    profile,
    loading,
    saving,
    showPassword,
    setShowPassword,
    formData,
    setFormData,
    preferences,
    handleUpdateProfile,
    handleChangePassword,
    handleAvatarUpload,
    handlePreferenceChange,
  } = useProfile();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p className="ml-2 text-gray-700">Chargement des paramètres...</p>
      </div>
    );
  }

  // If profile is null after loading (e.g., mock data also failed, or critical error)
  if (!profile) {
    return (
      <div className="text-center text-red-500 py-10">
        Une erreur est survenue lors du chargement de votre profil. Veuillez réessayer plus tard.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Paramètres du compte</h1>

      <ProfileSettings
        profile={profile}
        formData={formData}
        setFormData={setFormData}
        onUpdateProfile={handleUpdateProfile}
        onAvatarUpload={handleAvatarUpload}
        saving={saving}
      />

      <PasswordSettings
        formData={formData}
        setFormData={setFormData}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        onChangePassword={handleChangePassword}
        saving={saving}
      />

      <PreferencesSettings
        preferences={preferences}
        onPreferenceChange={handlePreferenceChange}
      />
    </div>
  );
}