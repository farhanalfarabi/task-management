"use client";

import { useRouter } from "next/navigation";
import { IconDownload, IconPlus } from "@tabler/icons-react";
import { Button } from "@/lib/components/ui/button";
import data from "@/app/data.json";
import { ProjectCard } from "@/app/projects/components/project-card";
import { Separator } from "@/lib/components/ui/separator";
import { PageHeader } from "@/lib/components/page-header";

export default function ProjectsPage() {
  const router = useRouter();
  const projects = data.projects || [];
  
  // Filter projects berdasarkan status
  const activeProjects = projects.filter(
    (project) => project.status !== "Completed"
  );
  const completedProjects = projects.filter(
    (project) => project.status === "Completed"
  );

  const handleExport = () => {
    // Handle export functionality
    console.log("Export projects");
    // TODO: Implement export logic (CSV, Excel, etc.)
  };

  const handleAddNewProject = () => {
    router.push("/projects/add");
  };

  return (
    <>
      <PageHeader 
        title="Projects" 
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects" }
        ]}
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="gap-2"
            >
              <IconDownload className="size-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button
              size="sm"
              onClick={handleAddNewProject}
              className="gap-2"
            >
              <IconPlus className="size-4" />
              <span className="hidden sm:inline">Add New Project</span>
            </Button>
          </>
        }
      />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
        {/* Active Projects Section */}
        <div className="mb-6 flex flex-row items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Active Projects</h1>
          <p className="text-muted-foreground">
            {activeProjects.length} projects in progress
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Recently Completed Section */}
        {completedProjects.length > 0 && (
          <>
            <Separator className="my-8" />
            <div className="mb-6 flex flex-row items-center justify-between">
              <h1 className="text-2xl font-semibold tracking-tight">Recently Completed</h1>
              <p className="text-muted-foreground">
                {completedProjects.length} projects completed
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {completedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </>
        )}
      </div>
      </div>
    </>
  );
}

