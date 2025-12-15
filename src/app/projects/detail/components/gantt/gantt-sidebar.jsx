"use client";

import { useContext } from "react";
import { formatDistance, addDays, isSameDay } from "date-fns";
import { GanttContext } from "./gantt-context";
import { cn } from "@/lib/utils";

export const GanttSidebarHeader = () => (
  <div
    className="sticky top-0 z-10 flex shrink-0 items-end justify-between gap-1.5 sm:gap-2.5 border-border/50 border-b bg-backdrop/90 p-1.5 sm:p-2.5 font-medium text-muted-foreground text-xs backdrop-blur-sm"
    style={{ height: "var(--gantt-header-height)" }}
  >
    <p className="flex-1 truncate text-left">Issues</p>
    <p className="shrink-0 hidden sm:inline">Duration</p>
  </div>
);

export const GanttSidebarItem = ({
  feature,
  onSelectItem,
  className,
}) => {
  const gantt = useContext(GanttContext);

  const tempEndAt =
    feature.endAt && isSameDay(feature.startAt, feature.endAt)
      ? addDays(feature.endAt, 1)
      : feature.endAt;

  const duration = tempEndAt
    ? formatDistance(feature.startAt, tempEndAt)
    : `${formatDistance(feature.startAt, new Date())} so far`;

  const handleClick = (event) => {
    if (event.target === event.currentTarget) {
      gantt.scrollToFeature?.(feature);
      onSelectItem?.(feature.id);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      gantt.scrollToFeature?.(feature);
      onSelectItem?.(feature.id);
    }
  };

  return (
    <div
      className={cn(
        "relative flex items-center gap-1.5 sm:gap-2.5 p-1.5 sm:p-2.5 text-xs hover:bg-secondary cursor-pointer",
        className
      )}
      key={feature.id}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      style={{
        height: "var(--gantt-row-height)",
      }}
      tabIndex={0}
    >
      <div
        className="pointer-events-none h-2 w-2 shrink-0 rounded-full"
        style={{
          backgroundColor: feature.status.color,
        }}
      />
      <p className="pointer-events-none flex-1 truncate text-left font-medium">
        {feature.name}
      </p>
      <p className="pointer-events-none text-muted-foreground hidden sm:inline">{duration}</p>
    </div>
  );
};

export const GanttSidebarGroup = ({ children, name, className }) => (
  <div className={className}>
    <p
      className="w-full truncate p-1.5 sm:p-2.5 text-left font-medium text-muted-foreground text-xs"
      style={{ height: "var(--gantt-row-height)" }}
    >
      {name}
    </p>
    <div className="divide-y divide-border/50">{children}</div>
  </div>
);

export const GanttSidebar = ({ children, className }) => (
  <div
    className={cn(
      "sticky left-0 z-30 h-max min-h-full overflow-clip border-border/50 border-r bg-background/90 backdrop-blur-md",
      className
    )}
    data-roadmap-ui="gantt-sidebar"
  >
    <GanttSidebarHeader />
    <div className="space-y-4">{children}</div>
  </div>
);

