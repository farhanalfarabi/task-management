"use client";
import { X } from "lucide-react";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

export function DataTableToolbar(
  {
    table,
    onAddTaskClick
  }
) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-1 sm:items-center">
        <Input
          placeholder="Filter members..."
          value={(table.getColumn("title")?.getFilterValue()) ?? ""}
          onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          className="h-8 w-full sm:w-[150px] lg:w-[250px]" />
        <div className="flex flex-wrap items-center gap-2">
        {table.getColumn("status") && (
          <DataTableFacetedFilter column={table.getColumn("status")} title="Status" options={statuses} />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities} />
        )}
        {isFiltered && (
            <Button variant="ghost" size="sm" onClick={() => table.resetColumnFilters()} className="w-full sm:w-auto">
            Reset
            <X />
          </Button>
        )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
        <Button variant="outline" size="sm" onClick={onAddTaskClick} className="w-full sm:w-auto">
          <IconPlus /> Add Task
        </Button>
      </div>
    </div>
  );
}
