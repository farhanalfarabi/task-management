"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/lib/components/ui/card";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import { IconCalendar, IconClock } from "@tabler/icons-react";
import { ToggleGroup, ToggleGroupItem } from "@/lib/components/ui/toggle-group";

export function SprintBasicInfoForm({ formData, onInputChange }) {
  return (
    <Card>
      <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <IconClock className="size-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold">Sprint Details</CardTitle>
            <CardDescription className="mt-1">
              Basic information about the sprint
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Sprint Name */}
        <div className="space-y-2">
          <Label htmlFor="sprintName">Sprint Name</Label>
          <Input
            id="sprintName"
            value={formData.sprintName}
            onChange={(e) => onInputChange("sprintName", e.target.value)}
            placeholder="e.g., Sprint 1: Project Setup & Authentication"
            className="focus-visible:ring-primary/20"
          />
          <CardDescription>
            Enter a descriptive name for this sprint
          </CardDescription>
        </div>

        {/* Sprint Goal */}
        <div className="space-y-2">
          <Label htmlFor="sprintGoal">Sprint Goal</Label>
          <textarea
            id="sprintGoal"
            value={formData.sprintGoal}
            onChange={(e) => onInputChange("sprintGoal", e.target.value)}
            placeholder="e.g., Setup project structure, database, and implement authentication system"
            className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 resize-none"
          />
          <CardDescription>
            What is the main objective of this sprint?
          </CardDescription>
        </div>

        {/* Duration & Dates */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (Weeks)</Label>
            <Input
              id="duration"
              type="number"
              value={formData.duration}
              onChange={(e) => onInputChange("duration", e.target.value)}
              min="1"
              className="focus-visible:ring-primary/20"
            />
            <CardDescription>Sprint length</CardDescription>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sprintNumber">Sprint Number</Label>
            <Input
              id="sprintNumber"
              type="number"
              value={formData.sprintNumber}
              onChange={(e) => onInputChange("sprintNumber", e.target.value)}
              min="1"
              className="focus-visible:ring-primary/20"
            />
            <CardDescription>Sequential number</CardDescription>
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <div className="relative">
              <IconCalendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => onInputChange("startDate", e.target.value)}
                className="pl-9 focus-visible:ring-primary/20"
              />
            </div>
            <CardDescription>Sprint start date</CardDescription>
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <div className="relative">
              <IconCalendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => onInputChange("endDate", e.target.value)}
                className="pl-9 focus-visible:ring-primary/20"
              />
            </div>
            <CardDescription>Sprint end date</CardDescription>
          </div>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label>Status</Label>
          <ToggleGroup
            type="single"
            value={formData.status}
            onValueChange={(value) => value && onInputChange("status", value)}
            variant="outline"
            className="justify-start"
          >
            <ToggleGroupItem value="Pending" aria-label="Pending">
              Pending
            </ToggleGroupItem>
            <ToggleGroupItem value="In Progress" aria-label="In Progress">
              In Progress
            </ToggleGroupItem>
            <ToggleGroupItem value="Completed" aria-label="Completed">
              Completed
            </ToggleGroupItem>
            <ToggleGroupItem value="Blocked" aria-label="Blocked">
              Blocked
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardContent>
    </Card>
  );
}

