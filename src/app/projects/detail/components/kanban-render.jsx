"use client";

import * as React from "react";
import { Badge } from "@/lib/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/lib/components/ui/avatar";
import * as Kanban from "@/lib/components/ui/kanban";
import { cn } from "@/lib/utils";

const COLUMN_TITLES = {
  planning: "Planning",
  development: "Development",
  deployment: "Deployment",
};

export function KanbanRender({ project, initialColumns, onColumnsChange }) {
  const [columns, setColumns] = React.useState(initialColumns || {
    planning: [],
    development: [],
    deployment: [],
  });

  const handleValueChange = React.useCallback((newColumns) => {
    setColumns(newColumns);
    onColumnsChange?.(newColumns);
  }, [onColumnsChange]);

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
      <Kanban.Board className="grid auto-rows-fr sm:grid-cols-3 overflow-x-auto pb-4">
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
                  <div className="bg-card rounded-md border p-3 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="line-clamp-1 text-sm font-medium">{task.title}</span>
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

