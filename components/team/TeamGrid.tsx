// src/components/team/TeamGrid.tsx
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Mail, Phone, MapPin, Edit, Trash2 } from "lucide-react";
import { TeamMember } from "@/lib/types";

interface TeamGridProps {
  members: TeamMember[];
  getRoleColor: (role: string) => string;
  getStatusColor: (status: string) => string;
  handleEditMember: (member: TeamMember) => void;
  toggleMemberStatus: (id: string, currentStatus: "Active" | "Inactive") => void;
  handleDeleteMember: (id: string) => void;
  getAvatarUrl: (email: string) => string; // Pass the avatar utility
}

const TeamGrid: React.FC<TeamGridProps> = ({
  members,
  getRoleColor,
  getStatusColor,
  handleEditMember,
  toggleMemberStatus,
  handleDeleteMember,
  getAvatarUrl,
}) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <Card key={member.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar || getAvatarUrl(member.email)} /> {/* Use passed util */}
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription>{member.department}</CardDescription>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEditMember(member)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Modifier
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleMemberStatus(member.id, member.status)}>
                    {member.status === "Active" ? "Désactiver" : "Activer"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDeleteMember(member.id)} className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge className={getRoleColor(member.role)}>{member.role}</Badge>
              <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <Mail className="mr-2 h-3 w-3" />
                {member.email}
              </div>
              {member.phone && (
                <div className="flex items-center text-muted-foreground">
                  <Phone className="mr-2 h-3 w-3" />
                  {member.phone}
                </div>
              )}
              {member.location && (
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-2 h-3 w-3" />
                  {member.location}
                </div>
              )}
            </div>

            {member.projects.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Projets</p>
                <div className="flex flex-wrap gap-1">
                  {member.projects.map((project, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {project}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="text-xs text-muted-foreground">
              Membre depuis le {new Date(member.joinDate).toLocaleDateString("fr-FR")}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TeamGrid;