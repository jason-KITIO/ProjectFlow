// src/components/pert/PertLegend.tsx
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const PertLegend: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Légende</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-red-500 bg-red-50"></div>
            <span className="text-sm">Activité critique</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-gray-300 bg-white"></div>
            <span className="text-sm">Activité non critique</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-1 bg-red-500"></div>
            <span className="text-sm">Chemin critique</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-1 bg-gray-400"></div>
            <span className="text-sm">Dépendance</span>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>
            <strong>ES:</strong> Début au plus tôt, <strong>EF:</strong> Fin au plus tôt
          </p>
          <p>
            <strong>LS:</strong> Début au plus tard, <strong>LF:</strong> Fin au plus tard
          </p>
          <p>
            <strong>Marge:</strong> Temps de flottement disponible pour les activités non critiques
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default PertLegend