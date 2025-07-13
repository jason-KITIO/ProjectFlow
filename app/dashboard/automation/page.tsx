// src/app/automation/page.tsx
"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Zap } from "lucide-react";
import { useAutomationRules } from "@/hooks/useAutomationRules";
import AutomationStats from "@/components/automation/AutomationStats";
import AutomationRuleCard from "@/components/automation/AutomationRuleCard";
import CreateRuleDialog from "@/components/automation/dialogs/CreateRuleDialog";
import EditRuleDialog from "@/components/automation/dialogs/EditRuleDialog";

export default function AutomationPage() {
  const {
    automationRules,
    loading,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    editingRule,
    setEditingRule,
    formData,
    setFormData,
    handleCreateRule,
    handleEditRule,
    handleUpdateRule,
    toggleRuleStatus,
    deleteRule,
  } = useAutomationRules();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Automatisation</h1>
          <p className="text-muted-foreground">
            Automatisez les tâches répétitives et fluidifiez votre flux de
            travail
          </p>
        </div>
        <CreateRuleDialog
          isOpen={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          formData={formData}
          setFormData={setFormData}
          onCreate={handleCreateRule}
        />
      </div>

      {/* Statistiques */}
      <AutomationStats rules={automationRules} />

      {/* Liste des règles d'automatisation */}
      <Card>
        <CardHeader>
          <CardTitle>Règles d'automatisation</CardTitle>
          <CardDescription>
            Gérez vos flux de travail automatisés et vos déclencheurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {automationRules.length === 0 ? (
              <div className="text-center py-12">
                <Zap className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Aucune règle d'automatisation pour le moment. Créez votre
                  première règle pour commencer !
                </p>
              </div>
            ) : (
              automationRules.map((rule) => (
                <AutomationRuleCard
                  key={rule.id}
                  rule={rule}
                  onEdit={handleEditRule}
                  onDelete={deleteRule}
                  onToggleStatus={toggleRuleStatus}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialogue de modification de règle */}
      <EditRuleDialog
        isOpen={!!editingRule}
        onOpenChange={() => setEditingRule(null)}
        formData={formData}
        setFormData={setFormData}
        onUpdate={handleUpdateRule}
      />
    </div>
  );
}
