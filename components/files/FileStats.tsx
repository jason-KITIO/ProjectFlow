// src/components/files/FileStats.tsx
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderOpen, ImageIcon, FileText, Archive } from "lucide-react"
import { FileItem } from "@/lib/types"
import { formatFileSize } from "@/lib/utils" // Assurez-vous que cette fonction est importée du bon endroit

interface FileStatsProps {
  files: FileItem[]
}

const FileStats: React.FC<FileStatsProps> = ({ files }) => {
  const totalImages = files.filter((f) => f.mime_type?.startsWith("image/")).length
  const totalDocuments = files.filter((f) => f.mime_type?.includes("pdf") || f.mime_type?.includes("document") || f.mime_type?.includes("text") || f.mime_type?.includes("spreadsheet") || f.mime_type?.includes("presentation")).length
  const totalSize = files.reduce((sum, f) => sum + (f.file_size || 0), 0)

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Fichiers au total</CardTitle>
          <FolderOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{files.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Images</CardTitle>
          <ImageIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalImages}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Documents</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalDocuments}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taille totale</CardTitle>
          <Archive className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatFileSize(totalSize)}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FileStats