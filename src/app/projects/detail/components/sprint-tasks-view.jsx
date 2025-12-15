"use client";

import * as React from "react";
import { List, LayoutGrid } from "lucide-react";
import { Button } from "@/lib/components/ui/button";
import { KanbanRender } from "./kanban-render";
import { SprintTasksTable } from "./sprint-tasks-table";

export function SprintTasksView({ project, initialColumns, onColumnsChange }) {
  const [viewMode, setViewMode] = React.useState("kanban");

  return (
    <div className="flex flex-col gap-4">
      {/* View Toggle */}
      <div className="flex items-center justify-end">
        <div className="flex items-center border rounded-md">
          <Button
            variant={viewMode === "kanban" ? "default" : "ghost"}
            size="sm"
            className="rounded-r-none border-r"
            onClick={() => setViewMode("kanban")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "ghost"}
            size="sm"
            className="rounded-l-none"
            onClick={() => setViewMode("table")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Kanban View */}
      {viewMode === "kanban" && (
        <KanbanRender
          project={project}
          initialColumns={initialColumns}
          onColumnsChange={onColumnsChange}
        />
      )}

      {/* Table View */}
      {viewMode === "table" && (
        <SprintTasksTable 
          project={project}
          initialColumns={initialColumns}
        />
      )}
    </div>
  );
}

