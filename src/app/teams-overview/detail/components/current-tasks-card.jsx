"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { Badge } from "@/lib/components/ui/badge";
import { Button } from "@/lib/components/ui/button";
import { IconCalendar, IconClock, IconCircleCheckFilled, IconLoader } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const priorityColors = {
  "high": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  "medium": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  "low": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

const statusIcons = {
  "in progress": IconLoader,
  "todo": IconClock,
  "done": IconCircleCheckFilled,
  "backlog": IconClock,
  "canceled": IconCircleCheckFilled,
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export function CurrentTasksCard({ activeTasks }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Current Tasks</CardTitle>
          <Badge variant="outline" className="text-xs">
            {activeTasks.length} active
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {activeTasks.length > 0 ? (
          <div className="space-y-2">
            {activeTasks.slice(0, 5).map((task, index) => {
              const StatusIcon = statusIcons[task.status.toLowerCase()] || IconClock;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className={cn(
                    "mt-1 rounded-full p-1.5",
                    task.status === "in progress" 
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400"
                  )}>
                    <StatusIcon className="size-4" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
                      <Badge 
                        className={cn(
                          "text-xs",
                          priorityColors[task.priority] || priorityColors["medium"]
                        )}
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <IconCalendar className="size-3" />
                        <span>Due {formatDate(task.deadline)}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {task.label}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
            {activeTasks.length > 5 && (
              <div className="text-center pt-2">
                <Button variant="ghost" size="sm" className="text-xs">
                  View all {activeTasks.length} tasks
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No active tasks at the moment
          </div>
        )}
      </CardContent>
    </Card>
  );
}

