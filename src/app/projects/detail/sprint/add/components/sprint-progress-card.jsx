"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { Label } from "@/lib/components/ui/label";
import { IconChartBar } from "@tabler/icons-react";

export function SprintProgressCard({ tasksCompleted, tasksTotal }) {
  return (
    <Card>
      <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <IconChartBar className="size-5 text-primary" />
          </div>
          <CardTitle className="text-xl font-semibold">Sprint Progress</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Tasks Completed</Label>
          <div className="text-lg font-semibold text-primary">
            {tasksCompleted}/{tasksTotal}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

