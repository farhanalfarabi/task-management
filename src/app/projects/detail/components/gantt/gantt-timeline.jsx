"use client";

import { useContext, useMemo } from "react";
import { format } from "date-fns";
import { GanttContext } from "./gantt-context";
import { getDifferenceIn, calculateInnerOffset } from "./utils";
import { cn } from "@/lib/utils";

const formatDate = (date) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export const GanttTimeline = ({ children, className }) => (
  <div
    className={cn(
      "relative flex h-full w-max flex-none overflow-clip",
      className
    )}
  >
    {children}
  </div>
);

export const GanttToday = ({ className }) => {
  const label = "Today";
  const date = useMemo(() => new Date(), []);
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

  return (
    <div
      className="pointer-events-none absolute top-0 left-0 z-20 flex h-full select-none flex-col items-center justify-center overflow-visible"
      style={{
        width: 0,
        transform: `translateX(calc(var(--gantt-column-width) * ${offset} + ${innerOffset}px))`,
      }}
    >
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
      <div className={cn("h-full w-px bg-card", className)} />
    </div>
  );
};

