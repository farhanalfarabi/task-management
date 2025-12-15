"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { IconCheck, IconClock, IconCircle, IconChartBar } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function SprintProgressCard({ project }) {
  // Sample sprint data - bisa diambil dari project data jika ada
  const sprints = [
    {
      id: 1,
      name: "Sprint 1",
      description: "Setup",
      progress: 100,
      status: "completed",
    },
    {
      id: 2,
      name: "Sprint 2",
      description: "Core Features",
      progress: 100,
      status: "completed",
    },
    {
      id: 3,
      name: "Sprint 3",
      description: "UI Components",
      progress: 100,
      status: "completed",
    },
    {
      id: 4,
      name: "Sprint 4",
      description: "Analytics",
      progress: 72,
      status: "in-progress",
    },
    {
      id: 5,
      name: "Sprint 5",
      description: "Testing",
      progress: 0,
      status: "not-started",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
            <IconCheck className="size-4 text-white" />
          </div>
        );
      case "in-progress":
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500">
            <IconClock className="size-4 text-white" />
          </div>
        );
      case "not-started":
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-muted-foreground/30 bg-background">
            <IconCircle className="size-4 text-muted-foreground/30" />
          </div>
        );
      default:
        return null;
    }
  };

  const getProgressColor = (status, progress) => {
    if (status === "completed") {
      return "bg-primary";
    }
    if (status === "in-progress") {
      return "bg-primary";
    }
    return "bg-muted-foreground/30";
  };

  const getPercentageColor = (status, progress) => {
    if (status === "completed" && progress === 100) {
      return "text-green-600 dark:text-green-400";
    }
    if (status === "in-progress") {
      return "text-yellow-600 dark:text-yellow-400";
    }
    return "text-muted-foreground";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Sprint Progress</CardTitle>
          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <IconChartBar className="size-4" />
            <span>View Details</span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {sprints.map((sprint) => (
          <div key={sprint.id} className="flex items-center gap-4">
            {/* Status Icon */}
            {getStatusIcon(sprint.status)}

            {/* Sprint Info and Progress */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{sprint.name}</p>
                  <p className="text-xs text-muted-foreground">{sprint.description}</p>
                </div>
                <span
                  className={cn(
                    "text-sm font-semibold",
                    getPercentageColor(sprint.status, sprint.progress)
                  )}
                >
                  {sprint.progress}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className={cn(
                    "h-full transition-all",
                    getProgressColor(sprint.status, sprint.progress)
                  )}
                  style={{ width: `${sprint.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

