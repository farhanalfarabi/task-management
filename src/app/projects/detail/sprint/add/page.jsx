"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/lib/components/page-header";
import { Badge } from "@/lib/components/ui/badge";
import data from "@/app/data.json";
import { SprintInformationForm } from "./components/sprint-information-form";

function AddSprintContent() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId") || "1";
  const project = data.projects?.find((p) => p.id === parseInt(projectId)) || data.projects?.[0];

  return (
    <>
      <PageHeader 
        title="Sprint Information"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: project?.name || "Project", href: `/projects/detail?id=${projectId}` },
          { label: "Add Sprint" }
        ]} 
      />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="flex flex-col gap-6 py-6 md:py-8">
          <div className="px-4 lg:px-6">
            <SprintInformationForm projectId={projectId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default function AddSprintPage() {
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
      <AddSprintContent />
    </Suspense>
  );
}

