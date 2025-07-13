// src/components/automation/AutomationStats.tsx
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Play, Pause } from "lucide-react"
import { AutomationRule } from "@/lib/types"

interface AutomationStatsProps {
  rules: AutomationRule[]
}

const AutomationStats: React.FC<AutomationStatsProps> = ({ rules }) => {
  const totalRules = rules.length;
  const activeRules = rules.filter((rule) => rule.active).length;
  const inactiveRules = totalRules - activeRules;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Règles totales</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalRules}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Règles actives</CardTitle>
          <Play className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeRules}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Règles inactives</CardTitle>
          <Pause className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inactiveRules}</div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AutomationStats