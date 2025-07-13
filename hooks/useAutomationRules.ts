// src/hooks/useAutomationRules.ts
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { AutomationRule, AutomationFormData } from "@/lib/types"

export const useAutomationRules = () => {
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<AutomationRule | null>(null)

  const defaultFormData: AutomationFormData = {
    name: "",
    description: "",
    triggerType: "",
    actionType: "",
    triggerConditions: {},
    actionParameters: {},
  }
  const [formData, setFormData] = useState<AutomationFormData>(defaultFormData)

  const supabase = createClient()

  useEffect(() => {
    fetchAutomationRules()
  }, [])

  const fetchAutomationRules = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from("automation_rules")
        .select("*")
        .eq("created_by", user.id)
        .order("created_at", { ascending: false })

      if (error) {
        toast.error("Échec de la récupération des règles d'automatisation")
        return
      }

      setAutomationRules(data || [])
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la récupération des règles d'automatisation")
    } finally {
      setLoading(false)
    }
  }

  const resetFormData = () => {
    setFormData(defaultFormData)
  }

  const handleCreateRule = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    try {
      const { error } = await supabase.from("automation_rules").insert({
        name: formData.name,
        description: formData.description,
        trigger_type: formData.triggerType,
        trigger_conditions: formData.triggerConditions,
        action_type: formData.actionType,
        action_parameters: formData.actionParameters,
        created_by: user.id,
      })

      if (error) {
        toast.error("Échec de la création de la règle d'automatisation")
        return
      }

      resetFormData()
      setIsCreateDialogOpen(false)
      fetchAutomationRules()
      toast.success("Règle d'automatisation créée avec succès !")
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la création de la règle d'automatisation")
    }
  }

  const handleEditRule = (rule: AutomationRule) => {
    setEditingRule(rule)
    setFormData({
      name: rule.name,
      description: rule.description || "",
      triggerType: rule.trigger_type,
      actionType: rule.action_type,
      triggerConditions: rule.trigger_conditions || {},
      actionParameters: rule.action_parameters || {},
    })
  }

  const handleUpdateRule = async () => {
    if (!editingRule) return

    try {
      const { error } = await supabase
        .from("automation_rules")
        .update({
          name: formData.name,
          description: formData.description,
          trigger_type: formData.triggerType,
          trigger_conditions: formData.triggerConditions,
          action_type: formData.actionType,
          action_parameters: formData.actionParameters,
        })
        .eq("id", editingRule.id)

      if (error) {
        toast.error("Échec de la mise à jour de la règle d'automatisation")
        return
      }

      setEditingRule(null)
      resetFormData()
      fetchAutomationRules()
      toast.success("Règle d'automatisation mise à jour avec succès !")
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la mise à jour de la règle d'automatisation")
    }
  }

  const toggleRuleStatus = async (id: string, active: boolean) => {
    try {
      const { error } = await supabase.from("automation_rules").update({ active: !active }).eq("id", id)

      if (error) {
        toast.error("Échec de la mise à jour du statut de la règle")
        return
      }

      setAutomationRules(automationRules.map((rule) => (rule.id === id ? { ...rule, active: !active } : rule)))
      toast.success(`Règle ${!active ? "activée" : "désactivée"}`)
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la mise à jour du statut de la règle")
    }
  }

  const deleteRule = async (id: string) => {
    try {
      const { error } = await supabase.from("automation_rules").delete().eq("id", id)

      if (error) {
        toast.error("Échec de la suppression de la règle d'automatisation")
        return
      }

      setAutomationRules(automationRules.filter((rule) => rule.id !== id))
      toast.success("Règle d'automatisation supprimée !")
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la suppression de la règle d'automatisation")
    }
  }

  return {
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
  }
}