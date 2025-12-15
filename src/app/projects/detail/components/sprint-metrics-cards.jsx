"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { Progress } from "@/lib/components/ui/progress";
import { IconCheck, IconClock, IconCalendar } from "@tabler/icons-react";

export function SprintMetricsCards({ sprint }) {
  // Sample data - bisa diambil dari sprint data jika ada
  const tasksCompleted = sprint?.tasksCompleted || 5;
  const tasksTotal = sprint?.tasksTotal || 10;
  const tasksRemaining = tasksTotal - tasksCompleted;
  const tasksProgress = Math.round((tasksCompleted / tasksTotal) * 100);

  const hoursTracked = sprint?.hoursTracked || 20;
  const hoursTotal = sprint?.hoursTotal || 36;
  const hoursRemaining = hoursTotal - hoursTracked;
  const hoursProgress = Math.round((hoursTracked / hoursTotal) * 100);

  const daysRemaining = sprint?.daysRemaining || 5;
  const daysTotal = sprint?.daysTotal || 14;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Tasks Progress Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <IconCheck className="size-5 text-primary" />
            <CardTitle className="text-sm font-semibold uppercase tracking-wider">
              Tasks Progress
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-2xl font-bold">
            {tasksCompleted} / {tasksTotal}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Progress value={tasksProgress} className="flex-1 h-2" />
              <span className="ml-3 text-sm font-semibold text-primary">
                {tasksProgress}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {tasksRemaining} tasks remaining
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Time Tracking Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <IconClock className="size-5 text-primary" />
            <CardTitle className="text-sm font-semibold uppercase tracking-wider">
              Time Tracking
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-2xl font-bold">
            {hoursTracked} / {hoursTotal}h
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Progress value={hoursProgress} className="flex-1 h-2" />
              <span className="ml-3 text-sm font-semibold text-primary">
                {hoursProgress}%
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {hoursRemaining} hours remaining
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Sprint Timeline Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <IconCalendar className="size-5 text-primary" />
            <CardTitle className="text-sm font-semibold uppercase tracking-wider">
              Sprint Timeline
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-2xl font-bold">
            {daysRemaining} days
          </div>
          <p className="text-xs text-muted-foreground">
            remaining of {daysTotal} days
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

