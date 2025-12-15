"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { Badge } from "@/lib/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/lib/components/ui/avatar";
import { IconUser, IconFlag, IconClock, IconCheck, IconPencil, IconTrash } from "@tabler/icons-react";
import { Button } from "@/lib/components/ui/button";
import { cn } from "@/lib/utils";

export function SprintTasksList({ sprintId, tasks = [], onEdit, onDelete }) {
  // Filter tasks by sprint if sprintId is provided
  const filteredTasks = sprintId
    ? tasks.filter((task) => task.sprintId === sprintId)
    : tasks;

  const priorityColors = {
    Low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    High: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    Urgent: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  const statusColors = {
    Pending: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
    "In Progress": "bg-primary/10 text-primary dark:bg-primary/20",
    Review: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    Done: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Blocked: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  if (filteredTasks.length === 0) {
    return (
      <Card>
        <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent">
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl font-semibold">Tasks in Sprint</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="py-8 text-center text-sm text-muted-foreground">
            No tasks found in this sprint. Create a task to get started.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl font-semibold">Tasks in Sprint</CardTitle>
            <Badge variant="outline" className="text-xs">
              {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-3">
          {filteredTasks.map((task, index) => (
            <div
              key={task.id}
              className={cn(
                "flex items-center gap-4 rounded-lg border bg-muted/30 p-4 hover:bg-muted/50 transition-colors",
                index === 0 && "rounded-t-lg",
                index === filteredTasks.length - 1 && "rounded-b-lg"
              )}
            >
              {/* Task Info */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {task.status === "Done" ? (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                        <IconCheck className="size-3.5 text-green-600 dark:text-green-400" />
                      </div>
                    ) : (
                      <div className="size-5 rounded-full border-2 border-muted-foreground/30" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {task.taskId && (
                        <span className="text-xs font-mono text-muted-foreground">
                          {task.taskId}
                        </span>
                      )}
                      <h3 className="font-medium text-sm text-foreground">{task.taskTitle || "Untitled Task"}</h3>
                    </div>
                    {task.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 ml-0">
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Task Meta */}
                <div className="flex items-center gap-4 flex-wrap ml-8">
                  {task.assignee && (
                    <div className="flex items-center gap-1.5">
                      <IconUser className="size-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{task.assignee}</span>
                    </div>
                  )}
                  {task.estimation && (
                    <div className="flex items-center gap-1.5">
                      <IconClock className="size-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{task.estimation}h</span>
                    </div>
                  )}
                  {task.priority && (
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs px-2 py-0.5",
                        priorityColors[task.priority] || priorityColors.Low
                      )}
                    >
                      <IconFlag className="size-3 mr-1" />
                      {task.priority}
                    </Badge>
                  )}
                  {task.status && (
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs px-2 py-0.5",
                        statusColors[task.status] || statusColors.Pending
                      )}
                    >
                      {task.status}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-primary"
                  onClick={() => onEdit && onEdit(task)}
                  type="button"
                >
                  <IconPencil className="size-4" />
                  <span className="sr-only">Edit task</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => onDelete && onDelete(task.id)}
                  type="button"
                >
                  <IconTrash className="size-4" />
                  <span className="sr-only">Delete task</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

