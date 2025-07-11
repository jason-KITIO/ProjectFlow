"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Upload,
  File,
  ImageIcon,
  Archive,
  Video,
  Music,
  MoreHorizontal,
  Download,
  Trash2,
  Search,
  FolderOpen,
  FileText,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface FileItem {
  id: string
  name: string
  file_path: string
  file_size: number | null
  mime_type: string | null
  project_id: string | null
  task_id: string | null
  uploaded_by: string | null
  created_at: string
  project?: {
    name: string
  }
  task?: {
    title: string
  }
  uploader?: {
    full_name: string
  }
}

export default function FilesPage() {
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

  const supabase = createClient()

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from("files")
        .select(`
          *,
          project:projects(name),
          task:tasks(title),
          uploader:users!uploaded_by(full_name)
        `)
        .order("created_at", { ascending: false })

      if (error) {
        toast.error("Failed to fetch files")
        return
      }

      setFiles(data || [])
    } catch (error) {
      toast.error("An error occurred while fetching files")
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file")
      return
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    setUploading(true)

    try {
      // Upload file to Supabase Storage
      const fileExt = selectedFile.name.split(".").pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `files/${fileName}`

      const { error: uploadError } = await supabase.storage.from("project-files").upload(filePath, selectedFile)

      if (uploadError) {
        toast.error("Failed to upload file")
        return
      }

      // Save file metadata to database
      const { error: dbError } = await supabase.from("files").insert({
        name: selectedFile.name,
        file_path: filePath,
        file_size: selectedFile.size,
        mime_type: selectedFile.type,
        project_id: formData.projectId || null,
        task_id: formData.taskId || null,
        uploaded_by: user.id,
      })

      if (dbError) {
        toast.error("Failed to save file metadata")
        return
      }

      setSelectedFile(null)
      setFormData({ projectId: "", taskId: "" })
      setIsUploadDialogOpen(false)
      fetchFiles()
      toast.success("File uploaded successfully!")
    } catch (error) {
      toast.error("An error occurred while uploading file")
    } finally {
      setUploading(false)
    }
  }

  const handleFileDownload = async (file: FileItem) => {
    try {
      const { data, error } = await supabase.storage.from("project-files").download(file.file_path)

      if (error) {
        toast.error("Failed to download file")
        return
      }

      // Create download link
      const url = URL.createObjectURL(data)
      const a = document.createElement("a")
      a.href = url
      a.download = file.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      toast.error("An error occurred while downloading file")
    }
  }

  const handleFileDelete = async (file: FileItem) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage.from("project-files").remove([file.file_path])

      if (storageError) {
        toast.error("Failed to delete file from storage")
        return
      }

      // Delete from database
      const { error: dbError } = await supabase.from("files").delete().eq("id", file.id)

      if (dbError) {
        toast.error("Failed to delete file record")
        return
      }

      fetchFiles()
      toast.success("File deleted successfully!")
    } catch (error) {
      toast.error("An error occurred while deleting file")
    }
  }

  const getFileIcon = (mimeType: string | null) => {
    if (!mimeType) return <File className="h-8 w-8" />

    if (mimeType.startsWith("image/")) return <ImageIcon className="h-8 w-8 text-green-600" />
    if (mimeType.startsWith("video/")) return <Video className="h-8 w-8 text-purple-600" />
    if (mimeType.startsWith("audio/")) return <Music className="h-8 w-8 text-blue-600" />
    if (mimeType.includes("pdf") || mimeType.includes("document")) return <FileText className="h-8 w-8 text-red-600" />
    if (mimeType.includes("zip") || mimeType.includes("archive")) return <Archive className="h-8 w-8 text-yellow-600" />

    return <File className="h-8 w-8" />
  }

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "Unknown size"
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
  }

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType =
      filterType === "all" ||
      (filterType === "images" && file.mime_type?.startsWith("image/")) ||
      (filterType === "documents" && (file.mime_type?.includes("pdf") || file.mime_type?.includes("document"))) ||
      (filterType === "videos" && file.mime_type?.startsWith("video/")) ||
      (filterType === "archives" && (file.mime_type?.includes("zip") || file.mime_type?.includes("archive")))

    return matchesSearch && matchesType
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Files</h1>
          <p className="text-muted-foreground">Upload, organize, and share project files</p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload File
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload File</DialogTitle>
              <DialogDescription>Upload a file to share with your team.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="file">Select File</Label>
                <Input id="file" type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project">Project (Optional)</Label>
                <Select
                  value={formData.projectId}
                  onValueChange={(value) => setFormData({ ...formData, projectId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No project</SelectItem>
                    <SelectItem value="1">Website Redesign</SelectItem>
                    <SelectItem value="2">Mobile App Development</SelectItem>
                    <SelectItem value="3">Marketing Campaign</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleFileUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload File"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Files</CardTitle>
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
            <div className="text-2xl font-bold">{files.filter((f) => f.mime_type?.startsWith("image/")).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {files.filter((f) => f.mime_type?.includes("pdf") || f.mime_type?.includes("document")).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Size</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatFileSize(files.reduce((sum, f) => sum + (f.file_size || 0), 0))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Files</SelectItem>
            <SelectItem value="images">Images</SelectItem>
            <SelectItem value="documents">Documents</SelectItem>
            <SelectItem value="videos">Videos</SelectItem>
            <SelectItem value="archives">Archives</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Files Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredFiles.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No files found. Upload your first file to get started!</p>
          </div>
        ) : (
          filteredFiles.map((file) => (
            <Card key={file.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(file.mime_type)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(file.file_size)}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleFileDownload(file)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleFileDelete(file)} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {file.project && (
                  <Badge variant="outline" className="text-xs">
                    {file.project.name}
                  </Badge>
                )}
                {file.task && (
                  <Badge variant="outline" className="text-xs">
                    {file.task.title}
                  </Badge>
                )}
                <div className="text-xs text-muted-foreground">
                  Uploaded {new Date(file.created_at).toLocaleDateString()}
                  {file.uploader && ` by ${file.uploader.full_name}`}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
