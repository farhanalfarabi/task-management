"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { IconArrowLeft } from "@tabler/icons-react";
import { Button } from "@/lib/components/ui/button";
import { SprintMetricsCards } from "../components/sprint-metrics-cards";
import { SprintKanban } from "./components/sprint-kanban";

function SprintDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sprintId = searchParams.get("id") || "1";
  const projectId = searchParams.get("projectId") || "1";

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

  const handleBack = () => {
    router.push(`/projects/detail?id=${projectId}`);
  };

  return (
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6 space-y-6">
          <SprintMetricsCards sprint={sprint} />
          
          {/* Kanban Board */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Sprint Tasks</h2>
            <SprintKanban sprint={sprint} />
          </div>
        </div>
      </div>
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

