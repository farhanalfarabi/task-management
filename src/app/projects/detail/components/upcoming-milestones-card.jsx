"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { Badge } from "@/lib/components/ui/badge";
import { Separator } from "@/lib/components/ui/separator";
import { cn } from "@/lib/utils";

export function UpcomingMilestonesCard({ project }) {
  // Sample milestones data - bisa diambil dari project data jika ada
  const milestones = [
    {
      id: 1,
      title: "Development Checkpoint",
      dueDate: "2025-01-22",
      description: "Mid-development review and progress assessment",
      status: "in-progress",
    },
    {
      id: 2,
      title: "Feature Complete",
      dueDate: "2025-01-28",
      description: "All features implemented and ready for testing",
      status: "upcoming",
    },
    {
      id: 3,
      title: "Testing Complete",
      dueDate: "2025-02-05",
      description: "All testing completed with no critical issues",
      status: "upcoming",
    },
    {
      id: 4,
      title: "Production Launch",
      dueDate: "2025-02-18",
      description: "Final deployment to production environment",
      status: "upcoming",
    },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const getDotColor = (status) => {
    if (status === "in-progress") {
      return "bg-primary";
    }
    return "border-2 border-muted-foreground/30 bg-transparent";
  };

  const getStatusBadge = (status) => {
    if (status === "in-progress") {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-0 rounded-md">
          In Progress
        </Badge>
      );
    }
    return (
      <Badge className="bg-muted text-muted-foreground border-0 rounded-md">
        Upcoming
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Upcoming Milestones</CardTitle>
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            View All &gt;
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-0">
        {milestones.map((milestone, index) => (
          <div key={milestone.id}>
            <div className="flex items-start gap-4 py-4">
              {/* Colored Dot */}
              <div
                className={cn(
                  "mt-1 h-3 w-3 shrink-0 rounded-full",
                  getDotColor(milestone.status)
                )}
              />

              {/* Milestone Content */}
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{milestone.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Due: {formatDate(milestone.dueDate)}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {milestone.description}
                    </p>
                  </div>
                  {getStatusBadge(milestone.status)}
                </div>
              </div>
            </div>
            {index < milestones.length - 1 && <Separator />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

