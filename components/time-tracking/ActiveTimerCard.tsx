// src/components/time-tracking/ActiveTimerCard.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square, Clock } from "lucide-react";
import { ActiveTimer } from "@/lib/types";

interface ActiveTimerCardProps {
  activeTimer: ActiveTimer | null;
  getActiveTimerDuration: () => string;
  startTimer: (taskId?: string | null, description?: string) => void;
  pauseTimer: () => void;
  stopTimer: () => void;
  saving: boolean;
}

const ActiveTimerCard: React.FC<ActiveTimerCardProps> = ({
  activeTimer,
  getActiveTimerDuration,
  startTimer,
  pauseTimer,
  stopTimer,
  saving,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Minuteur Actif
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            {activeTimer ? (
              <>
                <div className="text-3xl font-mono font-bold">{getActiveTimerDuration()}</div>
                <p className="text-sm text-muted-foreground">
                  {activeTimer.description || "Travail en cours..."}
                </p>
              </>
            ) : (
              <>
                <div className="text-3xl font-mono font-bold text-muted-foreground">00:00:00</div>
                <p className="text-sm text-muted-foreground">Aucun minuteur actif</p>
              </>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {!activeTimer ? (
              <Button onClick={() => startTimer()} size="lg" disabled={saving}>
                <Play className="mr-2 h-4 w-4" />
                Démarrer le minuteur
              </Button>
            ) : (
              <>
                <Button onClick={pauseTimer} size="lg" disabled={saving}>
                  <Pause className="mr-2 h-4 w-4" />
                  Arrêter & Enregistrer
                </Button>
                <Button onClick={stopTimer} variant="outline" size="lg" disabled={saving}>
                  <Square className="mr-2 h-4 w-4" />
                  Annuler
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveTimerCard;