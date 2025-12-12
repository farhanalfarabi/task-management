"use client";;
import { Badge } from "@/lib/components/ui/badge";
import { Checkbox } from "@/lib/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/lib/components/ui/avatar";

import { labels, priorities, statuses } from "../data/data";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]" />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]" />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "memberName",
    id: "member",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Member" />,
    cell: ({ row }) => {
      const memberName = row.original.memberName || row.original.name || row.original.title || row.original.id || "Unknown";
      const avatarUrl = row.original.avatar || 
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(memberName)}`;
      const isSelected = row.getIsSelected();
      
      return (
        <div className={`flex items-center gap-3 w-[200px] ${isSelected ? 'line-through opacity-60' : ''}`}>
          <Avatar className={`size-8 ${isSelected ? 'opacity-60' : ''}`}>
            <AvatarImage src={avatarUrl} alt={memberName} />
            <AvatarFallback className="bg-muted">
              {memberName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{memberName}</span>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
    sortingFn: (rowA, rowB, columnId) => {
      const nameA = (rowA.original.memberName || rowA.original.name || rowA.original.title || rowA.original.id || "").toLowerCase();
      const nameB = (rowB.original.memberName || rowB.original.name || rowB.original.title || rowB.original.id || "").toLowerCase();
      return nameA.localeCompare(nameB);
    }
  },
  {
    accessorKey: "title",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Task" />,
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label);
      const isSelected = row.getIsSelected();

      return (
        <div className={`flex gap-2 ${isSelected ? 'line-through opacity-60' : ''}`}>
          {label && <Badge variant="outline" className={isSelected ? 'opacity-60' : ''}>{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">{row.getValue("title")}</span>
        </div>
      );
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.getValue("status"));
      const isSelected = row.getIsSelected();

      if (!status) {
        return null;
      }

      return (
        <div className={`flex w-[100px] items-center gap-2 ${isSelected ? 'line-through opacity-60' : ''}`}>
          {status.icon && <status.icon className="text-muted-foreground size-4" />}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "priority",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Priority" />,
    cell: ({ row }) => {
      const priority = priorities.find((priority) => priority.value === row.getValue("priority"));
      const isSelected = row.getIsSelected();

      if (!priority) {
        return null;
      }

      return (
        <div className={`flex items-center gap-2 ${isSelected ? 'line-through opacity-60' : ''}`}>
          {priority.icon && <priority.icon className="text-muted-foreground size-4" />}
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Deadline" />,
    cell: ({ row }) => {
      const deadline = row.getValue("deadline");
      const isSelected = row.getIsSelected();
      
      if (!deadline) {
        return <span className={`text-muted-foreground ${isSelected ? 'line-through opacity-60' : ''}`}>-</span>;
      }
      
      // Format date if it's a date string
      const date = new Date(deadline);
      const isValidDate = !isNaN(date.getTime());
      
      return (
        <div className={`flex items-center ${isSelected ? 'line-through opacity-60' : ''}`}>
          <span className="text-sm">
            {isValidDate 
              ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
              : deadline
            }
          </span>
        </div>
      );
    },
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      const dateA = rowA.getValue(columnId);
      const dateB = rowB.getValue(columnId);
      
      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;
      
      const dateAObj = new Date(dateA);
      const dateBObj = new Date(dateB);
      
      if (isNaN(dateAObj.getTime()) && isNaN(dateBObj.getTime())) {
        return dateA.localeCompare(dateB);
      }
      if (isNaN(dateAObj.getTime())) return 1;
      if (isNaN(dateBObj.getTime())) return -1;
      
      return dateAObj.getTime() - dateBObj.getTime();
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
];
