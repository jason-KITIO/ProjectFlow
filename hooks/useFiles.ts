// src/hooks/useFiles.ts
import { useState, useEffect, useMemo } from "react"
import { toast } from "sonner"
import { FileItem, ProjectRelation, TaskRelation, UploaderRelation } from "@/lib/types"
import { initialFiles } from "@/data/files/initialFiles"
import { dummyProjects, dummyTasks, dummyUsers } from "@/data/files/initialProjectsAndTasks"
import { formatFileSize, getFileIcon } from "@/lib/utils" // Importez les fonctions utilitaires

export const useFiles = () => {
  const [files, setFiles] = useState<FileItem[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    projectId: "",
    taskId: "",
  })

  // Simuler la récupération des fichiers au chargement
  useEffect(() => {
    setLoading(true)
    // Simuler un délai de chargement
    const timer = setTimeout(() => {
      // Pour les fake data, nous devons enrichir initialFiles avec les données des relations
      const enrichedFiles = initialFiles.map(file => {
        const project = dummyProjects.find(p => p.id === file.project_id);
        const task = dummyTasks.find(t => t.id === file.task_id);
        const uploader = dummyUsers.find(u => u.id === file.uploaded_by);
        return {
          ...file,
          project: project || undefined,
          task: task || undefined,
          uploader: uploader || undefined,
        };
      });
      setFiles(enrichedFiles)
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error("Veuillez sélectionner un fichier.")
      return
    }

    setUploading(true)

    try {
      // Simuler un ID utilisateur (par exemple, l'utilisateur actuellement connecté)
      const currentUser = dummyUsers[0]; // Alice Dupont pour la démo
      if (!currentUser) {
        toast.error("Utilisateur non authentifié (simulé).")
        setUploading(false);
        return;
      }

      // Simuler un "upload" en créant un FileItem avec des métadonnées
      const newFile: FileItem = {
        id: `file-${Date.now()}`, // ID unique
        name: selectedFile.name,
        file_path: `files/${selectedFile.name}`, // Chemin simulé
        file_size: selectedFile.size,
        mime_type: selectedFile.type,
        project_id: formData.projectId === "none" ? null : formData.projectId,
        task_id: formData.taskId === "none" ? null : formData.taskId,
        uploaded_by: currentUser.id,
        created_at: new Date().toISOString(),
        project: formData.projectId && formData.projectId !== "none" ? dummyProjects.find(p => p.id === formData.projectId) : undefined,
        task: formData.taskId && formData.taskId !== "none" ? dummyTasks.find(t => t.id === formData.taskId) : undefined,
        uploader: currentUser,
      }

      setFiles((prevFiles) => [newFile, ...prevFiles])
      setSelectedFile(null)
      setFormData({ projectId: "", taskId: "" })
      setIsUploadDialogOpen(false)
      toast.success("Fichier téléversé avec succès !")
    } catch (error) {
      toast.error("Une erreur est survenue lors du téléversement du fichier.")
    } finally {
      setUploading(false)
    }
  }

  const handleFileDownload = async (file: FileItem) => {
    try {
      // Simuler le téléchargement d'un fichier en créant un blob URL
      const dummyContent = `Ceci est le contenu simulé du fichier ${file.name}.`
      const blob = new Blob([dummyContent], { type: file.mime_type || 'application/octet-stream' })
      const url = URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = file.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url) // Libérer l'URL d'objet

      toast.success(`Téléchargement de '${file.name}' initié.`)
    } catch (error) {
      toast.error("Une erreur est survenue lors du téléchargement du fichier.")
    }
  }

  const handleFileDelete = async (file: FileItem) => {
    try {
      // Simuler la suppression en mémoire
      setFiles((prevFiles) => prevFiles.filter((f) => f.id !== file.id))
      toast.success("Fichier supprimé avec succès !")
    } catch (error) {
      toast.error("Une erreur est survenue lors de la suppression du fichier.")
    }
  }

  const filteredFiles = useMemo(() => {
    return files.filter((file) => {
      const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType =
        filterType === "all" ||
        (filterType === "images" && file.mime_type?.startsWith("image/")) ||
        (filterType === "documents" && (file.mime_type?.includes("pdf") || file.mime_type?.includes("document") || file.mime_type?.includes("text") || file.mime_type?.includes("spreadsheet") || file.mime_type?.includes("presentation"))) ||
        (filterType === "videos" && file.mime_type?.startsWith("video/")) ||
        (filterType === "archives" && (file.mime_type?.includes("zip") || file.mime_type?.includes("archive")))

      return matchesSearch && matchesType
    })
  }, [files, searchTerm, filterType])

  return {
    files,
    loading,
    uploading,
    isUploadDialogOpen,
    setIsUploadDialogOpen,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    selectedFile,
    setSelectedFile,
    formData,
    setFormData,
    handleFileUpload,
    handleFileDownload,
    handleFileDelete,
    filteredFiles,
    formatFileSize, // Expose utility functions
    getFileIcon,    // Expose utility functions
    dummyProjects,  // Expose dummy data for selects
    dummyTasks,     // Expose dummy data for selects
  }
}