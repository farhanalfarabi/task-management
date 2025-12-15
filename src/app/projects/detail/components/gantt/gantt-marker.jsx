"use client";

import { memo, useContext, useMemo, useCallback } from "react";
import { format } from "date-fns";
import { TrashIcon, PlusIcon } from "lucide-react";
import { useMouse, useThrottle, useWindowScroll } from "@uidotdev/usehooks";
import { getDateByMousePosition } from "./utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/lib/components/ui/context-menu";
import { GanttContext } from "./gantt-context";
import { getDifferenceIn, calculateInnerOffset } from "./utils";
import { cn } from "@/lib/utils";

const formatDate = (date) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export const GanttMarker = memo(
  ({ label, date, id, onRemove, className }) => {
    const gantt = useContext(GanttContext);

    const differenceIn = useMemo(
      () => getDifferenceIn(gantt.range),
      [gantt.range]
    );

    const timelineStartDate = useMemo(
      () => new Date(gantt.timelineData.at(0)?.year ?? 0, 0, 1),
      [gantt.timelineData]
    );

    const offset = useMemo(
      () => differenceIn(date, timelineStartDate),
      [differenceIn, date, timelineStartDate]
    );

    const innerOffset = useMemo(
      () =>
        calculateInnerOffset(
          date,
          gantt.range,
          (gantt.columnWidth * gantt.zoom) / 100
        ),
      [date, gantt.range, gantt.columnWidth, gantt.zoom]
    );

    const handleRemove = useCallback(() => onRemove?.(id), [onRemove, id]);

    return (
      <div
        className="pointer-events-none absolute top-0 left-0 z-20 flex h-full select-none flex-col items-center justify-center overflow-visible"
        style={{
          width: 0,
          transform: `translateX(calc(var(--gantt-column-width) * ${offset} + ${innerOffset}px))`,
        }}
      >
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div
              className={cn(
                "group pointer-events-auto sticky top-0 flex select-auto flex-col flex-nowrap items-center justify-center whitespace-nowrap rounded-b-md bg-card px-2 py-1 text-foreground text-xs",
                className
              )}
            >
              {label}
              <span className="max-h-0 overflow-hidden opacity-80 transition-all group-hover:max-h-8">
                {formatDate(date)}
              </span>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            {onRemove ? (
              <ContextMenuItem
                className="flex items-center gap-2 text-destructive"
                onClick={handleRemove}
              >
                <TrashIcon size={16} />
                Remove marker
              </ContextMenuItem>
            ) : null}
          </ContextMenuContent>
        </ContextMenu>
        <div className={cn("h-full w-px bg-card", className)} />
      </div>
    );
  }
);

GanttMarker.displayName = "GanttMarker";

export const GanttCreateMarkerTrigger = ({
  onCreateMarker,
  className,
}) => {
  const gantt = useContext(GanttContext);
  const [mousePosition, mouseRef] = useMouse();
  const [windowScroll] = useWindowScroll();

  const x = useThrottle(
    mousePosition.x -
      (mouseRef.current?.getBoundingClientRect().x ?? 0) -
      (windowScroll.x ?? 0),
    10
  );

  const date = getDateByMousePosition(gantt, x);

  const handleClick = () => onCreateMarker(date);

  return (
    <div
      className={cn(
        "group pointer-events-none absolute top-0 left-0 h-full w-full select-none overflow-visible",
        className
      )}
      ref={mouseRef}
    >
      <div
        className="-ml-2 pointer-events-auto sticky top-6 z-20 flex w-4 flex-col items-center justify-center gap-1 overflow-visible opacity-0 group-hover:opacity-100"
        style={{ transform: `translateX(${x}px)` }}
      >
        <button
          className="z-50 inline-flex h-4 w-4 items-center justify-center rounded-full bg-card"
          onClick={handleClick}
          type="button"
        >
          <PlusIcon className="text-muted-foreground" size={12} />
        </button>
        <div className="whitespace-nowrap rounded-full border border-border/50 bg-background/90 px-2 py-1 text-foreground text-xs backdrop-blur-lg">
          {format(date, "MMM dd, yyyy")}
        </div>
      </div>
    </div>
  );
};

