"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { IconPencil, IconPlus } from "@tabler/icons-react";
import { Button } from "@/lib/components/ui/button";
import { PageHeader } from "@/lib/components/page-header";
import { SprintMetricsCards } from "../components/sprint-metrics-cards";
import { SprintTasksView } from "./components/sprint-tasks-view";
import data from "@/app/data.json";

function SprintDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sprintId = searchParams.get("id") || "1";
  const projectId = searchParams.get("projectId") || "1";
  const project = data.projects?.find((p) => p.id === parseInt(projectId)) || data.projects?.[0];

  // Sample sprint data - bisa diambil dari API atau data.json
  const sprint = {
    id: sprintId,
    name: `Sprint ${sprintId}`,
    tasksCompleted: 5,
    tasksTotal: 10,
    hoursTracked: 20,
    hoursTotal: 36,
    daysRemaining: 5,
    daysTotal: 14,
  };

  const handleEditSprint = () => {
    // Navigate to edit sprint page (assuming similar structure to add sprint)
    router.push(`/projects/detail/sprint/add?projectId=${projectId}&sprintId=${sprintId}`);
  };

  const handleAddTask = () => {
    router.push(`/projects/detail/sprint/task/add?sprintId=${sprintId}&projectId=${projectId}`);
  };

  // Sample columns data for sprint tasks
  const getSprintColumns = () => {
    return {
      pending: [
        {
          id: "1",
          title: "Setup development environment",
          description: "Configure local development setup",
          priority: "high",
          assignee: {
            name: "Sarah Chen",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen",
          },
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "2",
          title: "Create database migrations",
          description: "Setup initial database schema",
          priority: "high",
          assignee: {
            name: "Michael Chen",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MichaelChen",
          },
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
      "in-progress": [
        {
          id: "3",
          title: "Implement user authentication",
          description: "Build login and registration flow",
          priority: "high",
          assignee: {
            name: "David Kim",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidKim",
          },
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "4",
          title: "Design API endpoints",
          description: "Create RESTful API structure",
          priority: "medium",
          assignee: {
            name: "Sarah Chen",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen",
          },
          dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
      review: [
        {
          id: "5",
          title: "Code review for payment module",
          description: "Review payment integration code",
          priority: "high",
          assignee: {
            name: "Michael Chen",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MichaelChen",
          },
          dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
      done: [
        {
          id: "6",
          title: "Setup project repository",
          description: "Initialize Git repository and CI/CD",
          priority: "medium",
          assignee: {
            name: "David Kim",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidKim",
          },
          dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "7",
          title: "Create project documentation",
          description: "Write initial project README",
          priority: "low",
          assignee: {
            name: "Sarah Chen",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahChen",
          },
          dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
    };
  };

  return (
    <>
      <PageHeader 
        title={sprint.name}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project?.name || "Project", href: `/projects/detail?id=${projectId}` },
          { label: sprint.name }
        ]}
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddTask}
              className="gap-2"
            >
              <IconPlus className="size-4" />
              <span className="hidden sm:inline">Add Task</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleEditSprint}
              className="gap-2"
            >
              <IconPencil className="size-4" />
              <span className="hidden sm:inline">Edit Sprint</span>
            </Button>
          </>
        }
      />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6 space-y-6">
          <SprintMetricsCards sprint={sprint} />
          
          {/* Sprint Tasks */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Sprint Tasks</h2>
            <SprintTasksView 
              sprint={sprint}
              initialColumns={getSprintColumns()}
              onColumnsChange={(columns) => {
                // Handle column changes if needed
                console.log("Columns changed:", columns);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default function SprintDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <p>Loading...</p>
          </div>
        </div>
      }
    >
      <SprintDetailContent />
    </Suspense>
  );
}

