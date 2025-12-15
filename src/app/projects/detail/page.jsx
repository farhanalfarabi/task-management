"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import data from "@/app/data.json";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/lib/components/ui/tabs";
import { KanbanRender } from "./components/kanban-render";
import { GanttRender } from "./components/gantt-render";
import { DocumentsView } from "./components/documents-view";
import { ProjectDetailsCard } from "./components/project-details-card";
import { ProjectMetricsCard } from "./components/project-metrics-card";
import { OverallProgressCard } from "./components/overall-progress-card";
import { SprintProgressCard } from "./components/sprint-progress-card";
import { UpcomingMilestonesCard } from "./components/upcoming-milestones-card";

function ProjectDetailContent() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id") || "1";
  const project = data.projects?.find((p) => p.id === parseInt(projectId)) || data.projects?.[0];

  if (!project) {
    return (
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <p>Project not found</p>
        </div>
      </div>
    );
  }


  const getKanbanColumns = (project) => {
    // Generate sample tasks based on project
    const tasks = [
      {
        id: "1",
        title: "Setup project structure",
        description: "Initialize repository and configure development environment",
        priority: "high",
        assignee: project.teamMembers?.[0],
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "2",
        title: "Design database schema",
        description: "Create ERD and define data models",
        priority: "high",
        assignee: project.teamMembers?.[1],
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "3",
        title: "Implement authentication",
        description: "Setup JWT and user management",
        priority: "medium",
        assignee: project.teamMembers?.[0],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "4",
        title: "Create API endpoints",
        description: "Build RESTful API for core features",
        priority: "high",
        assignee: project.teamMembers?.[1],
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "5",
        title: "Write unit tests",
        description: "Add test coverage for critical functions",
        priority: "medium",
        assignee: project.teamMembers?.[2] || project.teamMembers?.[0],
        dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "6",
        title: "Code review",
        description: "Review pull requests and provide feedback",
        priority: "low",
        assignee: project.teamMembers?.[0],
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "7",
        title: "Update documentation",
        description: "Write API documentation and user guides",
        priority: "low",
        assignee: project.teamMembers?.[1],
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    return {
      planning: tasks.slice(0, 3),
      development: tasks.slice(3, 5),
      deployment: tasks.slice(5),
    };
  };

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sprint">Sprint</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="dokuments">Dokuments</TabsTrigger>

          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Left Column: Project Details */}
              <div className="lg:col-span-2 space-y-6">
                <ProjectDetailsCard project={project} />
                <OverallProgressCard project={project} />
                <SprintProgressCard project={project} />
                <UpcomingMilestonesCard project={project} />
              </div>

              {/* Right Column: Metrics and Deadlines */}
              <div>
                <ProjectMetricsCard project={project} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sprint" className="mt-6">
            <KanbanRender 
              project={project} 
              initialColumns={getKanbanColumns(project)}
              onColumnsChange={(columns) => {
                // Handle column changes if needed
                console.log("Columns changed:", columns);
              }}
            />
          </TabsContent>

          <TabsContent value="timeline" className="mt-6">
            <GanttRender 
              project={project}
              onFeatureMove={(id, startAt, endAt) => {
                console.log("Feature moved:", { id, startAt, endAt });
              }}
              onAddFeature={(feature) => {
                console.log("Feature added:", feature);
              }}
              onAddMarker={(marker) => {
                console.log("Marker added:", marker);
              }}
            />
          </TabsContent>
              
          <TabsContent value="dokuments" className="mt-6">
            <DocumentsView />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function ProjectDetailPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <p>Loading...</p>
        </div>
      </div>
    }>
      <ProjectDetailContent />
    </Suspense>
  );
}
