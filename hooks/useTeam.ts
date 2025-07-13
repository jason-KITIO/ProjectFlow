// src/hooks/useTeam.ts
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { TeamMember } from "@/lib/types";
import { initialTeamData } from "@/data/team/initialTeamData";

// Define the shape of the form data for invite/edit operations
interface TeamFormData {
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  department: string;
  phone: string;
  location: string;
}

export const useTeam = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<TeamFormData>({
    name: "",
    email: "",
    role: "Viewer",
    department: "",
    phone: "",
    location: "",
  });

  const supabase = createClient();

  // Utility function to get avatar from pravatar
  const getAvatarUrl = (email: string) => {
    // A simple hash function to get a consistent image from pravatar
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    const imgIndex = Math.abs(hash) % 70; // pravatar has images from 1 to 70
    return `https://i.pravatar.cc/150?img=${imgIndex}`;
  };

  // --- Fetch Team Members ---
  const fetchTeamMembers = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("team_members").select("*");

      if (error) {
        console.error("Supabase fetch team members error:", error);
        toast.error("Échec de la récupération des membres de l'équipe. Utilisation des données fictives.");
        setMembers(initialTeamData); // Fallback to fake data
        return;
      }

      if (data) {
        // Map Supabase data to TeamMember interface, ensuring optional fields are handled
        const fetchedMembers: TeamMember[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          role: item.role,
          department: item.department,
          status: item.status,
          joinDate: item.join_date, // Assuming 'join_date' in DB
          avatar: item.avatar_url || getAvatarUrl(item.email), // Use DB avatar or generate
          phone: item.phone,
          location: item.location,
          projects: item.projects || [], // Assuming projects is stored as an array or JSONB
        }));
        setMembers(fetchedMembers);
      }
    } catch (error) {
      console.error("Une erreur inattendue est survenue lors de la récupération de l'équipe:", error);
      toast.error("Une erreur inattendue est survenue. Chargement des données fictives de l'équipe.");
      setMembers(initialTeamData); // Fallback on general error
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  // --- Handle Invite Member ---
  const handleInviteMember = useCallback(async () => {
    setSaving(true);
    try {
      const newMember: Omit<TeamMember, "id" | "avatar" | "projects"> = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        department: formData.department,
        status: "Active",
        joinDate: new Date().toISOString().split("T")[0],
        phone: formData.phone || null,
        location: formData.location || null,
      };

      const { data, error } = await supabase.from("team_members").insert(newMember).select().single();

      if (error) {
        console.error("Supabase invite member error:", error);
        toast.error("Échec de l'invitation du membre.");
        // Fallback: Add to local state if Supabase fails (for demo purposes)
        const mockNewMember: TeamMember = {
          ...newMember,
          id: Date.now().toString(), // Generate a unique ID for mock
          avatar: getAvatarUrl(newMember.email),
          projects: [],
        };
        setMembers((prev) => [...prev, mockNewMember]);
        return;
      }

      if (data) {
        const addedMember: TeamMember = {
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          department: data.department,
          status: data.status,
          joinDate: data.join_date,
          avatar: data.avatar_url || getAvatarUrl(data.email),
          phone: data.phone,
          location: data.location,
          projects: data.projects || [],
        };
        setMembers((prev) => [...prev, addedMember]);
        toast.success("Membre invité avec succès !");
      }
    } catch (error) {
      console.error("Erreur lors de l'invitation du membre:", error);
      toast.error("Une erreur est survenue lors de l'invitation.");
      // Ensure local update even on general error if Supabase fails silently
      const mockNewMember: TeamMember = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        department: formData.department,
        status: "Active",
        joinDate: new Date().toISOString().split("T")[0],
        phone: formData.phone || null,
        location: formData.location || null,
        id: Date.now().toString(),
        avatar: getAvatarUrl(formData.email),
        projects: [],
      };
      setMembers((prev) => [...prev, mockNewMember]);
    } finally {
      setSaving(false);
      setIsInviteDialogOpen(false);
      setFormData({
        name: "",
        email: "",
        role: "Viewer",
        department: "",
        phone: "",
        location: "",
      });
    }
  }, [formData, supabase]);

  // --- Handle Edit Member (dialog open and initial data set) ---
  const handleEditMember = useCallback((member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      role: member.role,
      department: member.department,
      phone: member.phone || "",
      location: member.location || "",
    });
  }, []);

  // --- Handle Update Member (submit from edit dialog) ---
  const handleUpdateMember = useCallback(async () => {
    if (!editingMember) return;

    setSaving(true);
    try {
      const updatedFields = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        department: formData.department,
        phone: formData.phone || null,
        location: formData.location || null,
      };

      const { data, error } = await supabase
        .from("team_members")
        .update(updatedFields)
        .eq("id", editingMember.id)
        .select()
        .single();

      if (error) {
        console.error("Supabase update member error:", error);
        toast.error("Échec de la mise à jour du membre.");
        // Fallback: Update local state if Supabase fails (for demo purposes)
        setMembers((prev) =>
          prev.map((m) =>
            m.id === editingMember.id ? { ...m, ...updatedFields } : m
          )
        );
        return;
      }

      if (data) {
        const updatedMember: TeamMember = {
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          department: data.department,
          status: data.status,
          joinDate: data.join_date,
          avatar: data.avatar_url || getAvatarUrl(data.email),
          phone: data.phone,
          location: data.location,
          projects: data.projects || [],
        };
        setMembers((prev) =>
          prev.map((m) => (m.id === updatedMember.id ? updatedMember : m))
        );
        toast.success("Membre mis à jour avec succès !");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du membre:", error);
      toast.error("Une erreur est survenue lors de la mise à jour du membre.");
      // Ensure local update even on general error if Supabase fails silently
      setMembers((prev) =>
        prev.map((m) =>
          m.id === editingMember.id ? { ...m, ...formData } : m
        )
      );
    } finally {
      setSaving(false);
      setEditingMember(null); // Close dialog
      setFormData({
        name: "",
        email: "",
        role: "Viewer",
        department: "",
        phone: "",
        location: "",
      });
    }
  }, [editingMember, formData, supabase]);

  // --- Handle Delete Member ---
  const handleDeleteMember = useCallback(async (id: string) => {
    setSaving(true); // Indicate saving because we're performing a DB operation
    try {
      const { error } = await supabase.from("team_members").delete().eq("id", id);

      if (error) {
        console.error("Supabase delete member error:", error);
        toast.error("Échec de la suppression du membre.");
        return;
      }

      setMembers((prev) => prev.filter((m) => m.id !== id));
      toast.success("Membre supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression du membre:", error);
      toast.error("Une erreur est survenue lors de la suppression du membre.");
    } finally {
      setSaving(false);
    }
  }, [supabase]);

  // --- Toggle Member Status ---
  const toggleMemberStatus = useCallback(async (id: string, currentStatus: "Active" | "Inactive") => {
    setSaving(true);
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      const { error } = await supabase
        .from("team_members")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) {
        console.error("Supabase toggle status error:", error);
        toast.error("Échec de la mise à jour du statut du membre.");
        return;
      }

      setMembers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
      );
      toast.success("Statut du membre mis à jour !");
    } catch (error) {
      console.error("Erreur lors de la modification du statut:", error);
      toast.error("Une erreur est survenue lors de la modification du statut.");
    } finally {
      setSaving(false);
    }
  }, [supabase]);

  // --- UI related utility functions ---
  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800";
      case "Editor":
        return "bg-blue-100 text-blue-800";
      case "Viewer":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
  };

  return {
    members,
    loading,
    saving,
    isInviteDialogOpen,
    setIsInviteDialogOpen,
    editingMember,
    setEditingMember, // Expose setter to close dialog directly if needed
    formData,
    setFormData,
    handleInviteMember,
    handleEditMember,
    handleUpdateMember,
    handleDeleteMember,
    toggleMemberStatus,
    getRoleColor,
    getStatusColor,
    getAvatarUrl,
  };
};