"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/lib/components/ui/card";
import { Progress } from "@/lib/components/ui/progress";
import { IconTrendingUp, IconAlertCircle } from "@tabler/icons-react";

export function ProjectMetricsCard({ project }) {
  return (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-4">
        {/* Completion Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="text-xs font-medium uppercase tracking-wider">
              Completion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <CardTitle className="text-2xl font-bold">{project.progress || 68}%</CardTitle>
                <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                  <IconTrendingUp className="size-3" />
                  <span>12% this week</span>
                </div>
              </div>
              <Progress value={project.progress || 68} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Tasks Done Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="text-xs font-medium uppercase tracking-wider">
              Tasks Done
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl font-bold">
              {project.tasksCompleted || 42}/{project.tasksTotal || 62}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              {((project.tasksTotal || 62) - (project.tasksCompleted || 42))} tasks remaining
            </p>
          </CardContent>
        </Card>

        {/* Blocked Items Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="text-xs font-medium uppercase tracking-wider">
              Blocked Items
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CardTitle className="text-2xl font-bold">3</CardTitle>
              <IconAlertCircle className="size-5 text-red-600 dark:text-red-400" />
            </div>
            <p className="text-xs text-red-600 dark:text-red-400 mt-1 font-medium">
              Needs attention
            </p>
          </CardContent>
        </Card>

        {/* Active Sprint Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardDescription className="text-xs font-medium uppercase tracking-wider">
              Active Sprint
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl font-bold">Sprint 4</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">5 days left</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Upcoming Deadlines</CardTitle>
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              View All
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex flex-col items-center min-w-[60px]">
                <p className="text-xs font-semibold">Jan</p>
                <p className="text-lg font-bold">25</p>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Sprint 4 Review</p>
                <p className="text-xs text-muted-foreground">Team demo and retrospective.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center min-w-[60px]">
                <p className="text-xs font-semibold">Feb</p>
                <p className="text-lg font-bold">1</p>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Design System Release</p>
                <p className="text-xs text-muted-foreground">Component library v2.0.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center min-w-[60px]">
                <p className="text-xs font-semibold">Feb</p>
                <p className="text-lg font-bold">15</p>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Beta Testing Launch</p>
                <p className="text-xs text-muted-foreground">Internal stakeholder testing.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

