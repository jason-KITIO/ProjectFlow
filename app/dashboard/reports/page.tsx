// src/app/project/reports/page.tsx
"use client"

import { useReports } from "@/hooks/useReports"
import ReportsHeader from "@/components/reports/ReportsHeader"
import OverviewCards from "@/components/reports/OverviewCards"
import ProjectPerformanceTable from "@/components/reports/ProjectPerformanceTable"
import TeamPerformanceTable from "@/components/reports/TeamPerformanceTable"
import ProjectStatusDistribution from "@/components/reports/ProjectStatusDistribution"

export default function ReportsPage() {
  const {
    projectStats,
    teamStats,
    loading,
    timeRange,
    setTimeRange,
    totalStats,
    formatDuration,
    exportReport,
  } = useReports()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p className="ml-2 text-gray-700">Chargement des rapports...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <ReportsHeader
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        onExportReport={exportReport}
      />

      {/* Overview Statistics Cards */}
      <OverviewCards
        totalProjects={totalStats.totalProjects}
        activeProjects={totalStats.activeProjects}
        completedProjects={totalStats.completedProjects}
        completionRate={totalStats.completionRate}
        totalTasks={totalStats.totalTasks}
        completedTasks={totalStats.completedTasks}
        totalTime={totalStats.totalTime}
        totalTeamMembers={totalStats.totalTeamMembers}
        formatDuration={formatDuration}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Project Performance Table */}
        <ProjectPerformanceTable
          projectStats={projectStats}
          formatDuration={formatDuration}
        />

        {/* Team Performance Table */}
        <TeamPerformanceTable
          teamStats={teamStats}
          formatDuration={formatDuration}
        />
      </div>

      {/* Project Status Distribution */}
      <ProjectStatusDistribution projectStats={projectStats} />
    </div>
  )
}