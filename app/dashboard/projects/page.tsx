// src/app/projects/page.tsx
"use client"

import { useState } from "react"
import ProjectCard from "@/components/projects/ProjectCard"
import FilterBar from "@/components/projects/FilterBar"
import CreateProjectDialog from "@/components/projects/dialogs/CreateProjectDialog"
import EditProjectDialog from "@/components/projects/dialogs/EditProjectDialog"
import { useProjects } from "@/hooks/useProjects" // Assurez-vous que ce hook utilise les toasts si vous voulez des messages

export default function ProjectsPage() {
  const {
    projects,
    editingProject,
    setEditingProject,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    formData,
    setFormData,
    createProject,
    startEditingProject,
    updateProject,
    deleteProject,
  } = useProjects()

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Ajout d'un état de chargement simple pour l'exemple
  const [loading, setLoading] = useState(false); // Dans un vrai projet, le loading viendrait du hook useProjects

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projets</h1>
          <p className="text-muted-foreground">Gérez et suivez tous vos projets en un seul endroit.</p>
        </div>
        <CreateProjectDialog
          isOpen={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          formData={formData}
          setFormData={setFormData}
          onCreate={createProject}
        />
      </div>

      {/* Filtres */}
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Grille des projets */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.length === 0 && !loading ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            Aucun projet trouvé.
          </div>
        ) : (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={startEditingProject}
              onDelete={deleteProject}
            />
          ))
        )}
      </div>

      {/* Dialogue de modification de projet */}
      <EditProjectDialog
        isOpen={!!editingProject}
        onOpenChange={() => setEditingProject(null)}
        formData={formData}
        setFormData={setFormData}
        onUpdate={updateProject}
      />
    </div>
  )
}