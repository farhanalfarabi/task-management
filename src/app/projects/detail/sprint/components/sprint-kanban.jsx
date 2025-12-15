"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/lib/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/lib/components/ui/avatar";
import { Button } from "@/lib/components/ui/button";
import { IconEye } from "@tabler/icons-react";
import * as Kanban from "@/lib/components/ui/kanban";
import { cn } from "@/lib/utils";

const COLUMN_TITLES = {
  pending: "Pending",
  "in-progress": "In Progress",
  review: "Review",
  done: "Done",
};

export function SprintKanban({ sprint, initialColumns, onColumnsChange }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sprintId = searchParams.get("id") || "1";
  const projectId = searchParams.get("projectId") || "1";

  // Sample tasks data for sprint - bisa diambil dari sprint data jika ada
  const defaultColumns = {
    pending: [
      {
        id: "1",
        title: "Setup development environment",
        description: "Configure local development setup",
        priority: "high",
        assignee: {
          name: "Sarah Chen",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen",
        },
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "2",
        title: "Create database migrations",
        description: "Setup initial database schema",
        priority: "high",
        assignee: {
          name: "Michael Chen",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MichaelChen",
        },
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    "in-progress": [
      {
        id: "3",
        title: "Implement user authentication",
        description: "Build login and registration flow",
        priority: "high",
        assignee: {
          name: "David Kim",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidKim",
        },
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "4",
        title: "Design API endpoints",
        description: "Create RESTful API structure",
        priority: "medium",
        assignee: {
          name: "Sarah Chen",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen",
        },
        dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    review: [
      {
        id: "5",
        title: "Code review for payment module",
        description: "Review payment integration code",
        priority: "high",
        assignee: {
          name: "Michael Chen",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MichaelChen",
        },
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    done: [
      {
        id: "6",
        title: "Setup project repository",
        description: "Initialize Git repository and CI/CD",
        priority: "medium",
        assignee: {
          name: "David Kim",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidKim",
        },
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "7",
        title: "Create project documentation",
        description: "Write initial project README",
        priority: "low",
        assignee: {
          name: "Sarah Chen",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen",
        },
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
  };

  const [columns, setColumns] = React.useState(initialColumns || defaultColumns);

  const handleValueChange = React.useCallback((newColumns) => {
    setColumns(newColumns);
    onColumnsChange?.(newColumns);
    // Bisa ditambahkan callback untuk save ke backend
    console.log("Columns changed:", newColumns);
  }, [onColumnsChange]);

  const handleViewTaskDetail = (e, task) => {
    e.stopPropagation();
    e.preventDefault();
    // Navigate to task detail page
    router.push(`/projects/detail/sprint/task?id=${task.id}&sprintId=${sprintId}&projectId=${projectId}`);
  };

  const priorityColors = {
    high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Kanban.Root value={columns} onValueChange={handleValueChange} getItemValue={(item) => item.id}>
      <Kanban.Board className="grid auto-rows-fr sm:grid-cols-2 lg:grid-cols-4 overflow-x-auto pb-4">
        {Object.entries(columns).map(([columnValue, tasks]) => (
          <Kanban.Column key={columnValue} value={columnValue} className="min-w-[280px]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{COLUMN_TITLES[columnValue] || columnValue}</span>
                <Badge variant="secondary" className="pointer-events-none rounded-sm text-xs">
                  {tasks.length}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-0.5">
              {tasks.map((task) => (
                <Kanban.Item key={task.id} value={task.id} asHandle asChild>
                  <div className="bg-card rounded-md border p-3 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing relative">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="line-clamp-1 text-sm font-medium">{task.title}</span>
                        <div className="flex items-center gap-1">
                          {task.priority && (
                            <Badge
                              className={cn(
                                "pointer-events-none h-5 rounded-sm px-1.5 text-[11px] capitalize",
                                priorityColors[task.priority] || priorityColors.low
                              )}
                            >
                              {task.priority}
                            </Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 shrink-0 relative z-10"
                            title="View Task Details"
                            type="button"
                            data-no-dnd="true"
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              handleViewTaskDetail(e, task);
                            }}
                            onPointerDown={(e) => {
                              e.stopPropagation();
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              handleViewTaskDetail(e, task);
                            }}
                          >
                            <IconEye className="size-3.5" />
                          </Button>
                        </div>
                      </div>
                      {task.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
                      )}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          {task.assignee && (
                            <div className="flex items-center gap-1.5">
                              <Avatar className="size-5">
                                <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                                <AvatarFallback className="text-[10px]">
                                  {task.assignee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()
                                    .slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-muted-foreground line-clamp-1 text-[11px]">
                                {task.assignee.name}
                              </span>
                            </div>
                          )}
                        </div>
                        {task.dueDate && (
                          <time className="text-[10px] tabular-nums text-muted-foreground">
                            {formatDate(task.dueDate)}
                          </time>
                        )}
                      </div>
                    </div>
                  </div>
                </Kanban.Item>
              ))}
            </div>
          </Kanban.Column>
        ))}
      </Kanban.Board>
      <Kanban.Overlay>
        {({ variant }) => (
          <div className="bg-primary/10 size-full rounded-md border-2 border-primary/20" />
        )}
      </Kanban.Overlay>
    </Kanban.Root>
  );
}

