"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/lib/components/ui/card";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import { IconFolder, IconInfoCircle } from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";

export function ProjectDetailsForm({ formData, onInputChange }) {
  return (
    <Card>
      <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <IconFolder className="size-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold">Project Details</CardTitle>
            <CardDescription className="mt-1">
              Basic information about your project
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              value={formData.projectName}
              onChange={(e) => onInputChange("projectName", e.target.value)}
              placeholder="Enter project name"
              className="focus-visible:ring-primary/20"
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => onInputChange("status", value)}
            >
              <SelectTrigger id="status" className="w-full" size="default">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Planning">Planning</SelectItem>
                <SelectItem value="In Development">In Development</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Review">Review</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={formData.priority}
              onValueChange={(value) => onInputChange("priority", value)}
            >
              <SelectTrigger id="priority" className="w-full" size="default">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Project Lead */}
          <div className="space-y-2">
            <Label htmlFor="projectLead">Project Lead</Label>
            <Input
              id="projectLead"
              value={formData.projectLead}
              onChange={(e) => onInputChange("projectLead", e.target.value)}
              placeholder="Enter project lead name"
              className="focus-visible:ring-primary/20"
            />
          </div>

          {/* Department */}
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select
              value={formData.department}
              onValueChange={(value) => onInputChange("department", value)}
            >
              <SelectTrigger id="department" className="w-full" size="default">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Development">Development</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="description">Description</Label>
            <IconInfoCircle className="size-4 text-muted-foreground" />
          </div>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => onInputChange("description", e.target.value)}
            placeholder="Provide a detailed description of the project goals and objectives..."
            className="flex min-h-[140px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/20 focus-visible:border-primary transition-all resize-none"
          />
          <CardDescription className="flex items-center gap-1.5">
            <IconInfoCircle className="size-3.5" />
            Provide a detailed description of the project goals and objectives
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}

