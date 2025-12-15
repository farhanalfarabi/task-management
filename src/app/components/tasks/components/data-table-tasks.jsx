"use client";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { AddTaskModal } from "./add-task-modal";
import { Checkbox } from "@/lib/components/ui/checkbox";

export function DataTableTasks({ columns, data: initialData }) {
  const [data, setData] = React.useState(initialData);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = React.useState(false);

  // Ensure each row has a unique id and completion status
  const dataWithIds = React.useMemo(() => {
    return data.map((row, index) => ({
      ...row,
      id: row.id || `row-${index}`,
      isCompleted: row.isCompleted ?? false,
    }));
  }, [data]);

  // Update data when initialData changes (from server)
  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleToggleCompletion = React.useCallback((taskId, isCompleted) => {
    setData((prevData) =>
      prevData.map((task, index) => {
        const taskIdToMatch = task.id || `row-${index}`;
        if (taskIdToMatch === taskId) {
          return { ...task, isCompleted };
        }
        return task;
      })
    );
  }, []);

  const columnsWithCompletion = React.useMemo(() => {
    return columns.map((col) => {
      if (col.id === "select") {
        return {
          ...col,
          cell: ({ row }) => {
            const taskId = row.original.id;
            return (
              <div className="relative z-10" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={row.original.isCompleted ?? false}
                  onCheckedChange={(value) => {
                    handleToggleCompletion(taskId, !!value);
                  }}
                  aria-label="Mark task as completed"
                  className="translate-y-[2px] cursor-pointer" />
              </div>
            );
          },
        };
      }
      return col;
    });
  }, [columns, handleToggleCompletion]);

  const table = useReactTable({
    data: dataWithIds,
    columns: columnsWithCompletion,
    getRowId: (row) => row.id,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const handleAddTask = (newTask) => {
    setData((prevData) => [...prevData, { ...newTask, isCompleted: false }]);
  };

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6 ">
      <h1 className="text-foreground text-xl font-semibold md:text-2xl">
        Tasks List
      </h1>
      <DataTableToolbar 
        table={table} 
        onAddTaskClick={() => setIsAddTaskModalOpen(true)}
      />
      <AddTaskModal
        open={isAddTaskModalOpen}
        onOpenChange={setIsAddTaskModalOpen}
        onAddTask={handleAddTask}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const isCompleted = row.original.isCompleted ?? false;
                return (
                  <TableRow
                    key={row.id}
                    data-state={isCompleted && "completed"}
                    className={isCompleted ? "opacity-60" : ""}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const isCheckboxCell = cell.column.id === "select";
                      return (
                        <TableCell 
                          key={cell.id}
                          className={isCompleted && !isCheckboxCell ? "line-through" : ""}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
