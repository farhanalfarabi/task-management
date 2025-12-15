"use client";

import {
  DndContext,
  rectIntersection,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { cn } from "@/lib/utils";

export const ListItems = ({ children, className, id }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div 
      ref={setNodeRef}
      className={cn(
        "flex flex-1 flex-col gap-3 p-4 min-h-[100px]",
        isOver && "bg-primary/5 border-2 border-dashed border-primary/30 rounded-lg",
        className
      )}
    >
      {children}
    </div>
  );
};

export const ListHeader = (props) => {
  if ("children" in props) {
    return props.children;
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-2 bg-muted/50 border-b p-3",
        props.className
      )}
    >
      <div
        className="h-2 w-2 rounded-full shrink-0"
        style={{ backgroundColor: props.color }}
      />
      <p className="m-0 font-semibold text-sm">{props.name}</p>
    </div>
  );
};

export const ListGroup = ({ id, children, className }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      className={cn(
        "bg-background transition-colors",
        isOver && "bg-primary/5 ring-2 ring-primary/20",
        className
      )}
      ref={setNodeRef}
    >
      {children}
    </div>
  );
};

export const ListItem = ({
  id,
  name,
  index,
  parent,
  children,
  className,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data: { index, parent },
    });

  return (
    <div
      className={cn(
        "flex cursor-grab items-center gap-2 rounded-lg border bg-background p-3 shadow-sm hover:shadow-md transition-shadow",
        isDragging && "cursor-grabbing opacity-50 rotate-2 scale-105",
        className
      )}
      style={{
        transform: transform
          ? `translateX(${transform.x}px) translateY(${transform.y}px)`
          : "none",
      }}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
    >
      {children ?? <p className="m-0 font-medium text-sm text-foreground">{name}</p>}
    </div>
  );
};

export const ListProvider = ({ children, onDragEnd, className }) => (
  <DndContext
    collisionDetection={rectIntersection}
    onDragEnd={onDragEnd}
  >
    <div className={cn("flex size-full flex-col", className)}>{children}</div>
  </DndContext>
);
