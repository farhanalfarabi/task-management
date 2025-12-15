"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/lib/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/lib/components/ui/card";
import { Badge } from "@/lib/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/lib/components/ui/avatar";
import { Separator } from "@/lib/components/ui/separator";
import { IconCalendar, IconUser, IconFlag } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import data from "@/app/data.json";
import { TaskDescription } from "./components/task-description";
import { TaskChecklist } from "./components/task-checklist";

function TaskDetailContent() {
  const searchParams = useSearchParams();
  const taskId = searchParams.get("id") || "1";
  const sprintId = searchParams.get("sprintId") || "1";
  const projectId = searchParams.get("projectId") || "1";
  const project = data.projects?.find((p) => p.id === parseInt(projectId)) || data.projects?.[0];

  // Sample task data - bisa diambil dari API atau data.json
  const [task, setTask] = React.useState({
    id: taskId,
    title: "Implement user authentication",
    description: "Redesign the customer dashboard with improved data visualization and user experience. The new version should include real-time analytics, customizable widgets, and a modern interface that aligns with our brand guidelines. Key requirements include responsive design for mobile devices, dark mode support, and integration with our existing API endpoints.",
    priority: "high",
    status: "in-progress",
    assignee: {
      name: "David Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidKim",
      email: "david.kim@example.com",
    },
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedHours: 8,
    actualHours: 4,
    checklistItems: [
      { id: "1", text: "Create wireframes for new dashboard layout", completed: true },
      { id: "2", text: "Design component library in Figma", completed: true },
      { id: "3", text: "Set up React project structure", completed: true },
      { id: "4", text: "Implement authentication flow", completed: true },
      { id: "5", text: "Build analytics widgets", completed: true },
      { id: "6", text: "Add dark mode support", completed: false },
      { id: "7", text: "Implement responsive design", completed: false },
      { id: "8", text: "Write unit tests", completed: false },
    ],
  });

  const handleDescriptionChange = (newDescription) => {
    setTask((prev) => ({ ...prev, description: newDescription }));
  };

  const handleChecklistChange = (newItems) => {
    setTask((prev) => ({ ...prev, checklistItems: newItems }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const priorityColors = {
    high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  };

  const statusColors = {
    pending: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
    "in-progress": "bg-primary/10 text-primary dark:bg-primary/20",
    review: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    done: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  };

  return (
    <>
      <PageHeader 
        title={task.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project?.name || "Project", href: `/projects/detail?id=${projectId}` },
          { label: `Sprint ${sprintId}`, href: `/projects/detail/sprint?id=${sprintId}&projectId=${projectId}` },
          { label: task.title }
        ]} 
      />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <TaskDescription
              description={task.description}
              onDescriptionChange={handleDescriptionChange}
            />
            
            <TaskChecklist
              items={task.checklistItems}
              onItemsChange={handleChecklistChange}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Status */}
                <div>
                  <CardDescription className="mb-2">Status</CardDescription>
                  <Badge className={cn(statusColors[task.status] || statusColors.pending)}>
                    {task.status}
                  </Badge>
                </div>

                <Separator />

                {/* Priority */}
                <div>
                  <CardDescription className="mb-2 flex items-center gap-2">
                    <IconFlag className="size-4" />
                    Priority
                  </CardDescription>
                  <Badge className={cn(priorityColors[task.priority] || priorityColors.low)}>
                    {task.priority}
                  </Badge>
                </div>

                <Separator />

                {/* Assignee */}
                <div>
                  <CardDescription className="mb-2 flex items-center gap-2">
                    <IconUser className="size-4" />
                    Assignee
                  </CardDescription>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                      <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                      <AvatarFallback>
                        {task.assignee.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{task.assignee.name}</p>
                      <p className="text-xs text-muted-foreground">{task.assignee.email}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Due Date */}
                <div>
                  <CardDescription className="mb-2 flex items-center gap-2">
                    <IconCalendar className="size-4" />
                    Due Date
                  </CardDescription>
                  <p className="text-sm font-medium">
                    {formatDate(task.dueDate)}
                  </p>
                </div>

                <Separator />

                {/* Time Tracking */}
                <div>
                  <CardDescription className="mb-2">Time Tracking</CardDescription>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Estimated:</span>
                      <span className="font-medium">{task.estimatedHours}h</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Actual:</span>
                      <span className="font-medium">{task.actualHours}h</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default function TaskDetailPage() {
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
      <TaskDetailContent />
    </Suspense>
  );
}

