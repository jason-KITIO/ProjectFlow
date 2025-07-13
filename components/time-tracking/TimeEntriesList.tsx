// src/components/time-tracking/TimeEntriesList.tsx
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { TimeEntry } from "@/lib/types";

interface TimeEntriesListProps {
  timeEntries: TimeEntry[];
  formatDuration: (minutes: number | null) => string;
  deleteTimeEntry: (id: string) => void;
  saving: boolean;
}

const TimeEntriesList: React.FC<TimeEntriesListProps> = ({ timeEntries, formatDuration, deleteTimeEntry, saving }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Entrées de temps récentes</CardTitle>
        <CardDescription>Vos entrées de temps enregistrées.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timeEntries.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Aucune entrée de temps pour le moment. Commencez à suivre votre temps !
            </p>
          ) : (
            timeEntries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{entry.description || "Pas de description"}</p>
                  {entry.task && (
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">{entry.task.title}</span>
                      {entry.task.project?.name && ` • ${entry.task.project.name}`}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {new Date(entry.start_time).toLocaleDateString("fr-FR")} •{" "}
                    {new Date(entry.start_time).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })} -{" "}
                    {entry.end_time
                      ? new Date(entry.end_time).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
                      : "En cours"}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{formatDuration(entry.duration)}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" disabled={saving}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => deleteTimeEntry(entry.id)} className="text-red-600">
                        Supprimer l'entrée
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeEntriesList;