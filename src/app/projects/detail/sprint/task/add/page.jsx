"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/lib/components/ui/button";
import { PageHeader } from "@/lib/components/page-header";
import { IconDeviceFloppy } from "@tabler/icons-react";
import data from "@/app/data.json";
import { AddTaskForm } from "./components/add-task-form";

function AddTaskContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sprintId = searchParams.get("sprintId") || "";
  const projectId = searchParams.get("projectId") || "1";
  const project = data.projects?.find((p) => p.id === parseInt(projectId)) || data.projects?.[0];

  const handleBack = () => {
    if (sprintId) {
      router.push(`/projects/detail/sprint?id=${sprintId}&projectId=${projectId}`);
    } else {
      router.push(`/projects/detail?id=${projectId}`);
    }
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: project?.name || "Project", href: `/projects/detail?id=${projectId}` },
  ];

  if (sprintId) {
    breadcrumbs.push(
      { label: `Sprint ${sprintId}`, href: `/projects/detail/sprint?id=${sprintId}&projectId=${projectId}` },
      { label: "Add Task" }
    );
  } else {
    breadcrumbs.push({ label: "Add Task" });
  }

  return (
    <>
      <PageHeader 
        title="Add Task"
        breadcrumbs={breadcrumbs} 
      />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="flex flex-col gap-6 py-6 md:py-8">
          <div className="px-4 lg:px-6">
            <AddTaskForm 
              sprintId={sprintId}
              projectId={projectId}
              onBack={handleBack}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default function AddTaskPage() {
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
      <AddTaskContent />
    </Suspense>
  );
}

