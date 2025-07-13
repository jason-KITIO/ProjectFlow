// src/components/files/FileGrid.tsx
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Download, Trash2, FolderOpen } from "lucide-react";
import { FileItem } from "@/lib/types"; // Importez l'interface
import { formatFileSize, getFileIcon } from "@/lib/utils"; // Importez les fonctions utilitaires

interface FileGridProps {
  files: FileItem[];
  onDownload: (file: FileItem) => void;
  onDelete: (file: FileItem) => void;
}

const FileGrid: React.FC<FileGridProps> = ({ files, onDownload, onDelete }) => {
  if (files.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">
          Aucun fichier trouvé. Téléversez votre premier fichier pour commencer
          !
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {files.map((file) => (
        <Card key={file.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3 w-[80%]">
                {getFileIcon(file.mime_type)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate w-[85%]">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.file_size)}
                  </p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onDownload(file)}>
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onDelete(file)}
                    className="text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Supprimer
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
              Téléversé le{" "}
              {new Date(file.created_at).toLocaleDateString("fr-FR")}
              {file.uploader && ` par ${file.uploader.full_name}`}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FileGrid;
