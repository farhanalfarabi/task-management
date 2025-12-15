"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns";
import {
  GanttProvider,
  GanttHeader,
  GanttSidebar,
  GanttSidebarGroup,
  GanttSidebarItem,
  GanttFeatureList,
  GanttFeatureListGroup,
  GanttFeatureRow,
  GanttTimeline,
  GanttToday,
  GanttMarker,
  GanttCreateMarkerTrigger,
} from "./gantt";
import { GanttToolbar } from "./gantt/gantt-toolbar";

// Sample status untuk Gantt
const defaultStatuses = [
  { id: "todo", name: "To Do", color: "#94a3b8" },
  { id: "in-progress", name: "In Progress", color: "#3b82f6" },
  { id: "review", name: "Review", color: "#f59e0b" },
  { id: "done", name: "Done", color: "#10b981" },
];

// Helper untuk mengkonversi project tasks ke Gantt features
export const convertTasksToGanttFeatures = (tasks, statuses = defaultStatuses) => {
  if (!tasks || !Array.isArray(tasks)) return [];

  return tasks.map((task, index) => {
    const status = statuses.find((s) => s.id === task.status) || statuses[0];
    
    // Ambil tanggal dari task, default jika tidak ada
    const startAt = task.startDate 
      ? new Date(task.startDate)
      : new Date(Date.now() + index * 7 * 24 * 60 * 60 * 1000);
    
    const endAt = task.dueDate || task.endDate
      ? new Date(task.dueDate || task.endDate)
      : new Date(startAt.getTime() + 7 * 24 * 60 * 60 * 1000);

    return {
      id: task.id || `task-${index}`,
      name: task.title || task.name || `Task ${index + 1}`,
      startAt,
      endAt,
      status,
      lane: task.lane || task.category || "default",
    };
  });
};

export const GanttRender = ({ project, initialFeatures, onFeatureMove, onAddFeature, onAddMarker }) => {
  const [range, setRange] = useState("monthly");
  const [zoom, setZoom] = useState(100);
  
  const [features, setFeatures] = useState(() => {
    if (initialFeatures) return initialFeatures;
    
    // Generate sample features dari project tasks jika ada
    if (project?.tasks) {
      return convertTasksToGanttFeatures(project.tasks);
    }
    
    // Sample data jika tidak ada
    const today = new Date();
    return [
      {
        id: "1",
        name: "Setup project structure",
        startAt: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        endAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
        status: defaultStatuses[1],
        lane: "development",
      },
      {
        id: "2",
        name: "Design database schema",
        startAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
        endAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
        status: defaultStatuses[0],
        lane: "development",
      },
      {
        id: "3",
        name: "Implement authentication",
        startAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
        endAt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10),
        status: defaultStatuses[0],
        lane: "development",
      },
    ];
  });

  const [markers, setMarkers] = useState([]);

  // Group features by lane
  const featuresByLane = useMemo(() => {
    const grouped = {};
    features.forEach((feature) => {
      const lane = feature.lane || "default";
      if (!grouped[lane]) {
        grouped[lane] = [];
      }
      grouped[lane].push(feature);
    });
    return grouped;
  }, [features]);

  const handleFeatureMove = (id, startAt, endAt) => {
    setFeatures((prev) =>
      prev.map((f) => (f.id === id ? { ...f, startAt, endAt } : f))
    );
    onFeatureMove?.(id, startAt, endAt);
  };

  const handleAddFeature = (date) => {
    const newFeature = {
      id: `feature-${Date.now()}`,
      name: "New Feature",
      startAt: date,
      endAt: new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000),
      status: defaultStatuses[0],
      lane: "default",
    };
    setFeatures((prev) => [...prev, newFeature]);
    onAddFeature?.(newFeature);
  };

  const handleAddMarker = (date) => {
    const newMarker = {
      id: `marker-${Date.now()}`,
      date: date instanceof Date ? date : new Date(date),
      label: format(date instanceof Date ? date : new Date(date), "MMM dd"),
    };
    setMarkers((prev) => [...prev, newMarker]);
    onAddMarker?.(newMarker);
  };

  const handleRemoveMarker = (id) => {
    setMarkers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="flex h-[600px] w-full flex-col rounded-lg border overflow-hidden">
      <GanttToolbar
        range={range}
        onRangeChange={setRange}
        zoom={zoom}
        onZoomChange={setZoom}
      />
      <div className="flex-1 overflow-hidden">
        <GanttProvider
          range={range}
          zoom={zoom}
          onAddItem={handleAddFeature}
          className="h-full"
        >
        <GanttSidebar>
          {Object.entries(featuresByLane).map(([lane, laneFeatures]) => (
            <GanttSidebarGroup key={lane} name={lane}>
              {laneFeatures.map((feature) => (
                <GanttSidebarItem
                  key={feature.id}
                  feature={feature}
                  onSelectItem={(id) => {
                    console.log("Selected feature:", id);
                  }}
                />
              ))}
            </GanttSidebarGroup>
          ))}
        </GanttSidebar>

        <GanttTimeline>
          <GanttHeader />
          <GanttFeatureList>
            {Object.entries(featuresByLane).map(([lane, laneFeatures]) => (
              <GanttFeatureListGroup key={lane}>
                <GanttFeatureRow
                  features={laneFeatures}
                  onMove={handleFeatureMove}
                />
              </GanttFeatureListGroup>
            ))}
          </GanttFeatureList>
          <GanttToday />
          {markers.map((marker) => (
            <GanttMarker
              key={marker.id}
              id={marker.id}
              date={new Date(marker.date)}
              label={marker.label}
              onRemove={handleRemoveMarker}
            />
          ))}
          {onAddMarker && <GanttCreateMarkerTrigger onCreateMarker={handleAddMarker} />}
        </GanttTimeline>
        </GanttProvider>
      </div>
    </div>
  );
};

