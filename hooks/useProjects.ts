// src/hooks/useProjects.ts
import { useState } from "react"
import { Project, ProjectFormData } from "@/lib/types"
import { initialProjects } from "@/data/projects"
import { toast } from "sonner" // Assurez-vous d'avoir 'sonner' installé pour les toasts

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const defaultFormData: ProjectFormData = {
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    priority: "Moyenne", // Priorité par défaut traduite
  }
  const [formData, setFormData] = useState<ProjectFormData>(defaultFormData)

  const resetFormData = () => {
    setFormData(defaultFormData)
  }

  const createProject = () => {
    // Vérification simple pour s'assurer que les champs requis ne sont pas vides
    if (!formData.name || !formData.startDate || !formData.endDate) {
      toast.error("Veuillez remplir tous les champs requis (Nom, Date de début, Date de fin).")
      return
    }

    const newProject: Project = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      status: "Planification", // Statut par défaut pour les nouveaux projets traduit
      progress: 0,
      startDate: formData.startDate,
      endDate: formData.endDate,
      team: ["JD"], // Membre d'équipe par défaut, pourrait être étendu pour permettre la sélection
      priority: formData.priority,
    }
    setProjects((prevProjects) => [...prevProjects, newProject])
    resetFormData()
    setIsCreateDialogOpen(false)
    toast.success("Projet créé avec succès !")
  }

  const startEditingProject = (project: Project) => {
    setEditingProject(project)
    setFormData({
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
      priority: project.priority,
    })
  }

  const updateProject = () => {
    if (!editingProject) return

    // Vérification simple pour s'assurer que les champs requis ne sont pas vides
    if (!formData.name || !formData.startDate || !formData.endDate) {
      toast.error("Veuillez remplir tous les champs requis (Nom, Date de début, Date de fin).")
      return
    }

    const updatedProjects = projects.map((p) =>
      p.id === editingProject.id ? { ...p, ...formData } : p
    )
    setProjects(updatedProjects)
    setEditingProject(null)
    resetFormData()
    toast.success("Projet mis à jour avec succès !")
  }

  const deleteProject = (id: string) => {
    // La confirmation est maintenant gérée par l'AlertDialog dans ProjectCard.tsx
    setProjects((prevProjects) => prevProjects.filter((p) => p.id !== id))
    toast.success("Projet supprimé !")
  }

  return {
    projects,
    editingProject,
    setEditingProject,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    formData,
    setFormData,
    resetFormData,
    createProject,
    startEditingProject,
    updateProject,
    deleteProject,
  }
}