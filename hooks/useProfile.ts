// src/hooks/useProfile.ts
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { UserProfile, UserPreferences } from "@/lib/types";
import {
  initialUserProfileData,
  initialUserPreferencesData,
} from "@/data/settings/initialProfileData";

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    department: "",
    phone: "",
    location: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [preferences, setPreferences] =
    useState<UserPreferences>(initialUserPreferencesData); // Initialize with mock preferences

  const supabase = createClient();

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("Auth error or no user:", authError);
        toast.error("Échec de l'authentification. Chargement du profil fictif.");
        // Fallback if no user is logged in or auth fails
        setProfile(initialUserProfileData);
        setFormData({
          fullName: initialUserProfileData.full_name || "",
          email: initialUserProfileData.email || "",
          department: initialUserProfileData.department || "",
          phone: initialUserProfileData.phone || "",
          location: initialUserProfileData.location || "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setPreferences(initialUserPreferencesData);
        return;
      }

      const { data, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        toast.error("Échec de la récupération du profil. Utilisation des données fictives.");
        console.error("Supabase profile fetch error:", profileError);
        // Fallback to mock data if user profile fetch fails
        setProfile(initialUserProfileData);
        setFormData({
          fullName: initialUserProfileData.full_name || "",
          email: initialUserProfileData.email || "",
          department: initialUserProfileData.department || "",
          phone: initialUserProfileData.phone || "",
          location: initialUserProfileData.location || "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setPreferences(initialUserPreferencesData); // Also set mock preferences
        return;
      }

      // If successful, set real data
      setProfile(data);
      setFormData({
        fullName: data.full_name || "",
        email: data.email || "",
        department: data.department || "",
        phone: data.phone || "",
        location: data.location || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      // Assuming preferences are stored on the 'users' table or a separate 'user_preferences' table
      // For now, we'll initialize with mock, or fetch if available in 'data'
      setPreferences({
        theme: data.preferences?.theme || initialUserPreferencesData.theme,
        language: data.preferences?.language || initialUserPreferencesData.language,
        timezone: data.preferences?.timezone || initialUserPreferencesData.timezone,
        emailNotifications: data.preferences?.emailNotifications ?? initialUserPreferencesData.emailNotifications,
        pushNotifications: data.preferences?.pushNotifications ?? initialUserPreferencesData.pushNotifications,
        weeklyReports: data.preferences?.weeklyReports ?? initialUserPreferencesData.weeklyReports,
        taskReminders: data.preferences?.taskReminders ?? initialUserPreferencesData.taskReminders,
        projectUpdates: data.preferences?.projectUpdates ?? initialUserPreferencesData.projectUpdates,
      });

    } catch (error) {
      console.error("Une erreur inattendue est survenue lors de la récupération du profil:", error);
      toast.error("Une erreur inattendue est survenue. Chargement du profil fictif.");
      // Ensure fallbacks are set even for general errors
      setProfile(initialUserProfileData);
      setFormData({
        fullName: initialUserProfileData.full_name || "",
        email: initialUserProfileData.email || "",
        department: initialUserProfileData.department || "",
        phone: initialUserProfileData.phone || "",
        location: initialUserProfileData.location || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPreferences(initialUserPreferencesData);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]); // Depend on fetchProfile to ensure it runs

  const handleUpdateProfile = useCallback(async () => {
    if (!profile) {
      toast.error("Impossible de sauvegarder le profil : aucune donnée utilisateur.");
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from("users")
        .update({
          full_name: formData.fullName,
          department: formData.department,
          phone: formData.phone,
          location: formData.location,
        })
        .eq("id", profile.id);

      if (error) {
        toast.error("Échec de la mise à jour du profil.");
        console.error("Supabase update profile error:", error);
        return;
      }

      toast.success("Profil mis à jour avec succès !");
      fetchProfile(); // Re-fetch to update local state with latest data
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      toast.error("Une erreur est survenue lors de la mise à jour du profil.");
    } finally {
      setSaving(false);
    }
  }, [profile, formData, supabase, fetchProfile]);

  const handleChangePassword = useCallback(async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setSaving(true);
    try {
      // Supabase `updateUser` currently doesn't support changing password
      // based on `currentPassword` for security reasons. Users usually
      // need to be re-authenticated or use a password reset flow.
      // For a simplified example, we'll assume `updateUser` is sufficient,
      // but in a real app, you might need `signInWithPassword` followed by `updateUser`
      // or a server-side function for robust security.
      const { error } = await supabase.auth.updateUser({
        password: formData.newPassword,
      });

      if (error) {
        toast.error("Échec du changement de mot de passe. Veuillez vérifier votre mot de passe actuel ou vous reconnecter.");
        console.error("Supabase change password error:", error);
        return;
      }

      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      toast.success("Mot de passe mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors du changement de mot de passe:", error);
      toast.error("Une erreur est survenue lors du changement de mot de passe.");
    } finally {
      setSaving(false);
    }
  }, [formData, supabase]);

  const handleAvatarUpload = useCallback(async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !profile) {
      toast.error("Aucun fichier sélectionné ou profil non chargé.");
      return;
    }

    setSaving(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${profile.id}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        toast.error("Échec du téléchargement de l'avatar.");
        console.error("Supabase upload avatar error:", uploadError);
        return;
      }

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("users")
        .update({ avatar_url: data.publicUrl })
        .eq("id", profile.id);

      if (updateError) {
        toast.error("Échec de la mise à jour de l'URL de l'avatar.");
        console.error("Supabase update avatar URL error:", updateError);
        return;
      }

      toast.success("Avatar mis à jour avec succès !");
      fetchProfile(); // Re-fetch to update avatar in UI
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'avatar:", error);
      toast.error("Une erreur est survenue lors du téléchargement de l'avatar.");
    } finally {
      setSaving(false);
    }
  }, [profile, supabase, fetchProfile]);

  const handlePreferenceChange = useCallback((key: keyof UserPreferences, value: any) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
    // In a real app, you'd likely save this to Supabase immediately or on a "Save Preferences" button click
    // For now, we'll just update the local state.
    toast.info(`Préférence "${key}" mise à jour localement.`);
  }, []);


  return {
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
  };
};