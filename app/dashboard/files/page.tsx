// src/app/files/page.tsx
"use client"

import { useFiles } from "@/hooks/useFiles" // Importez le nouveau hook
import FileStats from "@/components/files/FileStats"
import UploadFileDialog from "@/components/files/UploadFileDialog"
import FileGrid from "@/components/files/FileGrid"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Search } from "lucide-react"


export default function FilesPage() {
  const {
    files,
    loading,
    uploading,
    isUploadDialogOpen,
    setIsUploadDialogOpen,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    setSelectedFile,
    formData,
    setFormData,
    handleFileUpload,
    handleFileDownload,
    handleFileDelete,
    filteredFiles,
    dummyProjects,
    dummyTasks,
  } = useFiles()

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file)
  }

  const handleProjectSelect = (projectId: string) => {
    setFormData(prev => ({ ...prev, projectId }))
  }

  const handleTaskSelect = (taskId: string) => {
    setFormData(prev => ({ ...prev, taskId }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fichiers</h1>
          <p className="text-muted-foreground">Téléversez, organisez et partagez les fichiers de projet.</p>
        </div>
        <Button onClick={() => setIsUploadDialogOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Téléverser un fichier
        </Button>
      </div>

      {/* Stats */}
      <FileStats files={files} />

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des fichiers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les fichiers</SelectItem>
            <SelectItem value="images">Images</SelectItem>
            <SelectItem value="documents">Documents</SelectItem>
            <SelectItem value="videos">Vidéos</SelectItem>
            <SelectItem value="archives">Archives</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Files Grid */}
      <FileGrid
        files={filteredFiles}
        onDownload={handleFileDownload}
        onDelete={handleFileDelete}
      />

      {/* Upload File Dialog */}
      <UploadFileDialog
        isOpen={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
        onFileSelect={handleFileChange}
        onProjectSelect={handleProjectSelect}
        onTaskSelect={handleTaskSelect}
        onUpload={handleFileUpload}
        uploading={uploading}
        formData={formData}
        dummyProjects={dummyProjects}
        dummyTasks={dummyTasks}
      />
    </div>
  )
}