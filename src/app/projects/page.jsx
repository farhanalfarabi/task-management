import data from "@/app/data.json";
import { ProjectCard } from "@/app/projects/components/project-card";

export default function ProjectsPage() {
  const projects = data.projects || [];

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <div className="mb-6 flex flex-row items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Active Projects</h1>
          <p className="text-muted-foreground">
          8 projects in progress
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}

