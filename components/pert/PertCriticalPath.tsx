// src/components/pert/PertCriticalPath.tsx
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PertProject } from "@/lib/types" // Assuming PertProject is defined here

interface PertCriticalPathProps {
  currentProject: PertProject | null
}

const PertCriticalPath: React.FC<PertCriticalPathProps> = ({ currentProject }) => {
  if (!currentProject) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analyse du chemin critique</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Chemin critique:</h4>
            <div className="flex flex-wrap items-center space-x-2">
              {currentProject.criticalPath.map((nodeId, index) => (
                <div key={nodeId} className="flex items-center">
                  <Badge variant="destructive">{nodeId}</Badge>
                  {index < currentProject.criticalPath.length - 1 && <span className="mx-2">→</span>}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Détails de l'activité:</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Activité</th>
                    <th className="text-left p-2">Nom</th>
                    <th className="text-left p-2">Durée</th>
                    <th className="text-left p-2">Début au plus tôt (ES)</th>
                    <th className="text-left p-2">Fin au plus tôt (EF)</th>
                    <th className="text-left p-2">Début au plus tard (LS)</th>
                    <th className="text-left p-2">Fin au plus tard (LF)</th>
                    <th className="text-left p-2">Marge</th>
                    <th className="text-left p-2">Critique</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProject.nodes.map((node) => (
                    <tr key={node.id} className="border-b">
                      <td className="p-2 font-medium">{node.id}</td>
                      <td className="p-2">{node.name}</td>
                      <td className="p-2">{node.duration}j</td>
                      <td className="p-2">{node.earliestStart}</td>
                      <td className="p-2">{node.earliestFinish}</td>
                      <td className="p-2">{node.latestStart}</td>
                      <td className="p-2">{node.latestFinish}</td>
                      <td className="p-2">{node.slack}j</td>
                      <td className="p-2">
                        {node.isCritical ? (
                          <Badge variant="destructive">Oui</Badge>
                        ) : (
                          <Badge variant="secondary">Non</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PertCriticalPath