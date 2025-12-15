"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/lib/components/ui/card";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import { IconCalendar, IconCurrencyDollar, IconUser, IconClock, IconUsers } from "@tabler/icons-react";

export function TimelineBudgetForm({ formData, onInputChange, formatDateForInput }) {
  return (
    <Card>
      <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <IconClock className="size-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold">Timeline & Budget</CardTitle>
            <CardDescription className="mt-1">
              Schedule and financial information
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <div className="relative">
              <IconCalendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                id="startDate"
                type="date"
                value={formatDateForInput(formData.startDate)}
                onChange={(e) => onInputChange("startDate", e.target.value)}
                className="pl-9 focus-visible:ring-primary/20"
              />
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <div className="relative">
              <IconCalendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                id="dueDate"
                type="date"
                value={formatDateForInput(formData.dueDate)}
                onChange={(e) => onInputChange("dueDate", e.target.value)}
                className="pl-9 focus-visible:ring-primary/20"
              />
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <Label htmlFor="budget">Budget</Label>
            <div className="relative">
              <IconCurrencyDollar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                id="budget"
                type="number"
                value={formData.budget}
                onChange={(e) => onInputChange("budget", e.target.value)}
                placeholder="0"
                className="pl-9 focus-visible:ring-primary/20"
                min="0"
              />
            </div>
          </div>

          {/* Team Size */}
          <div className="space-y-2">
            <Label htmlFor="teamSize">Team Size</Label>
            <div className="relative">
              <IconUsers className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                id="teamSize"
                type="number"
                value={formData.teamSize}
                onChange={(e) => onInputChange("teamSize", e.target.value)}
                placeholder="0"
                min="1"
                className="pl-9 focus-visible:ring-primary/20"
              />
            </div>
          </div>

          {/* Completion Percentage */}
          <div className="space-y-2">
            <Label htmlFor="completionPercentage">Completion Percentage</Label>
            <div className="relative">
              <Input
                id="completionPercentage"
                type="number"
                value={formData.completionPercentage}
                onChange={(e) => onInputChange("completionPercentage", e.target.value)}
                placeholder="0"
                min="0"
                max="100"
                className="w-full focus-visible:ring-primary/20"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-medium">
                %
              </div>
            </div>
            <CardDescription>
              Current progress of the project
            </CardDescription>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

