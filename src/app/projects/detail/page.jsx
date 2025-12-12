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
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { Progress } from "@/lib/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/lib/components/ui/avatar";
import { Badge } from "@/lib/components/ui/badge";
import { IconTrendingUp, IconCheck, IconCalendar } from "@tabler/icons-react";
import { ShoppingCart, Code, Palette, Database, Smartphone, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { KanbanRender } from "./components/kanban-render";

const iconMap = {
  shopping: ShoppingCart,
  code: Code,
  palette: Palette,
  database: Database,
  smartphone: Smartphone,
  globe: Globe,
};

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

  const IconComponent = iconMap[project.icon] || ShoppingCart;
  const statusColors = {
    "In Progress": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    "Completed": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    "On Hold": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    "Planning": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  };
  const trackColor = project.trackStatus === "On track" 
    ? "text-green-600 dark:text-green-400"
    : project.trackStatus === "At risk"
    ? "text-yellow-600 dark:text-yellow-400"
    : "text-red-600 dark:text-red-400";

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

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
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sprint">Sprint</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
           <Card>
            
           </Card>

      
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
            <Card>
              
            </Card>
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
