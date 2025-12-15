"use client";

import { ZoomIn, ZoomOut, Calendar, CalendarDays, CalendarRange } from "lucide-react";
import { Button } from "@/lib/components/ui/button";
import { cn } from "@/lib/utils";

export const GanttToolbar = ({ range, onRangeChange, zoom, onZoomChange, className }) => {
  const handleZoomIn = () => {
    const newZoom = Math.min(zoom + 10, 200);
    onZoomChange(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom - 10, 50);
    onZoomChange(newZoom);
  };

  const rangeOptions = [
    { value: "daily", label: "Hari", icon: CalendarDays },
    { value: "monthly", label: "Bulan", icon: Calendar },
    { value: "quarterly", label: "Triwulan", icon: CalendarRange },
  ];

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border-b bg-background px-4 py-3",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm font-medium">View:</span>
        <div className="flex items-center gap-1 rounded-lg border bg-background p-1">
          {rangeOptions.map((option) => {
            const Icon = option.icon;
            const isActive = range === option.value;
            return (
              <Button
                key={option.value}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => onRangeChange(option.value)}
                className={cn(
                  "h-8 gap-1.5 px-2.5 transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">{option.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm font-medium">Zoom:</span>
        <div className="flex items-center gap-1 rounded-lg border bg-background p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoom <= 50}
            className="h-8 w-8 p-0 disabled:opacity-30"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-foreground min-w-[3.5rem] text-center text-xs font-medium">
            {zoom}%
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoom >= 200}
            className="h-8 w-8 p-0 disabled:opacity-30"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

