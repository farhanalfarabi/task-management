"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card";

export function OverallProgressCard({ project }) {
  // Calculate task statistics
  const totalTasks = project.tasksTotal || 48;
  const completedTasks = project.tasksCompleted || 32;
  const inProgressTasks = 12; // Default value, bisa diambil dari data project jika ada
  const notStartedTasks = totalTasks - completedTasks - inProgressTasks;
  
  // Calculate percentages
  const completedPercent = (completedTasks / totalTasks) * 100;
  const inProgressPercent = (inProgressTasks / totalTasks) * 100;
  const notStartedPercent = (notStartedTasks / totalTasks) * 100;
  
  // Overall progress percentage (completed only)
  const overallProgress = Math.round((completedTasks / totalTasks) * 100);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Overall Progress</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {completedTasks} of {totalTasks} tasks completed
            </p>
          </div>
          <div className="text-2xl font-bold text-primary">
            {overallProgress}%
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar - Based on shadcn Progress component structure */}
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary">
          {/* Completed (Green) */}
          <div
            className="h-full bg-green-500 transition-all"
            style={{ width: `${completedPercent}%` }}
          />
          {/* In Progress (Purple) */}
          <div
            className="absolute top-0 h-full bg-primary transition-all"
            style={{ 
              left: `${completedPercent}%`,
              width: `${inProgressPercent}%` 
            }}
          />
          {/* Not Started (Gray) - already covered by bg-secondary */}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-green-500" />
            <span className="text-muted-foreground">
              Completed ({completedTasks})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-primary" />
            <span className="text-muted-foreground">
              In Progress ({inProgressTasks})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-muted-foreground/30" />
            <span className="text-muted-foreground">
              Not Started ({notStartedTasks})
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

