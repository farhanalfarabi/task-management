"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/lib/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/lib/components/ui/avatar";
import { Button } from "@/lib/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/table";
import { IconEye, IconFlag, IconUser, IconCalendar, IconCircleCheck, IconClock } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function SprintTasksTable({ sprint, initialColumns }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sprintId = searchParams.get("id") || "1";
  const projectId = searchParams.get("projectId") || "1";

  // Flatten all tasks from columns for table view
  const allTasks = React.useMemo(() => {
    if (!initialColumns) return [];
    return Object.values(initialColumns).flat();
  }, [initialColumns]);

  const priorityColors = {
    high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
    medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
    low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  };

  const statusColors = {
    pending: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200 dark:border-gray-800",
    "in-progress": "bg-primary/10 text-primary dark:bg-primary/20 border-primary/20",
    review: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
    done: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();
    const isPast = date < today && !isToday;

    if (isToday) {
      return "Today";
    } else if (isTomorrow) {
      return "Tomorrow";
    } else if (isPast) {
      return date.toLocaleDateString("id-ID", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } else {
      return date.toLocaleDateString("id-ID", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const getStatusFromColumn = (task, columns) => {
    // Find which column this task belongs to
    for (const [columnKey, tasks] of Object.entries(columns || {})) {
      if (tasks.some(t => t.id === task.id)) {
        return columnKey; // Return column name directly (pending, in-progress, review, done)
      }
    }
    return "pending";
  };

  const handleViewDetail = (task) => {
    router.push(`/projects/detail/sprint/task?id=${task.id}&sprintId=${sprintId}&projectId=${projectId}`);
  };

  return (
    <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
              <TableHead className="w-[320px] font-semibold">Task</TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-2">
                  <IconFlag className="size-4 text-muted-foreground" />
                  Priority
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-2">
                  <IconUser className="size-4 text-muted-foreground" />
                  Assignee
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-2">
                  <IconCalendar className="size-4 text-muted-foreground" />
                  Due Date
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-2">
                  <IconCircleCheck className="size-4 text-muted-foreground" />
                  Status
                </div>
              </TableHead>
              <TableHead className="w-[100px] font-semibold text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allTasks.length > 0 ? (
              allTasks.map((task, index) => {
                const status = getStatusFromColumn(task, initialColumns);
                const dueDate = task.dueDate ? new Date(task.dueDate) : null;
                const isOverdue = dueDate && dueDate < new Date() && status !== "done";
                
                return (
                  <TableRow
                    key={task.id}
                    className={cn(
                      "cursor-pointer transition-all duration-200 border-b",
                      "hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent",
                      "hover:shadow-sm",
                      index % 2 === 0 ? "bg-card" : "bg-muted/20"
                    )}
                    onClick={() => handleViewDetail(task)}
                  >
                    <TableCell className="py-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                          {task.title}
                        </div>
                        {task.description && (
                          <div className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {task.description}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      {task.priority && (
                        <Badge
                          className={cn(
                            "pointer-events-none h-6 rounded-md px-2.5 text-xs font-medium capitalize border",
                            priorityColors[task.priority] || priorityColors.low
                          )}
                        >
                          <IconFlag className="size-3 mr-1" />
                          {task.priority}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="py-4">
                      {task.assignee ? (
                        <div className="flex items-center gap-2.5">
                          <Avatar className="size-7 ring-2 ring-background shadow-sm">
                            <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                            <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
                              {task.assignee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-foreground">
                            {task.assignee.name}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <IconUser className="size-4" />
                          <span className="text-sm">Unassigned</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="py-4">
                      {task.dueDate ? (
                        <div className={cn(
                          "flex items-center gap-2",
                          isOverdue && "text-red-600 dark:text-red-400"
                        )}>
                          <IconCalendar className={cn(
                            "size-4",
                            isOverdue ? "text-red-600 dark:text-red-400" : "text-muted-foreground"
                          )} />
                          <span className={cn(
                            "text-sm font-medium",
                            isOverdue ? "text-red-600 dark:text-red-400" : "text-foreground"
                          )}>
                            {formatDate(task.dueDate)}
                          </span>
                          {isOverdue && (
                            <IconClock className="size-3.5 text-red-600 dark:text-red-400" />
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <IconCalendar className="size-4" />
                          No due date
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge
                        className={cn(
                          "h-6 rounded-md px-2.5 text-xs font-medium border capitalize",
                          statusColors[status] || statusColors.pending
                        )}
                      >
                        {status === "pending" ? "Pending" : 
                         status === "in-progress" ? "In Progress" : 
                         status === "review" ? "Review" : 
                         status === "done" ? "Done" : 
                         status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center justify-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetail(task);
                          }}
                        >
                          <IconEye className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-32">
                  <div className="flex flex-col items-center justify-center gap-3 text-center py-8">
                    <div className="rounded-full bg-muted p-4">
                      <IconCircleCheck className="size-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">No tasks found</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Get started by creating a new task
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

