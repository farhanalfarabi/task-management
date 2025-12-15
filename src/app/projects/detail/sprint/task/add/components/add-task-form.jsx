"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/lib/components/ui/card";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import { Button } from "@/lib/components/ui/button";
import { Checkbox } from "@/lib/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/lib/components/ui/toggle-group";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { SprintTasksList } from "./sprint-tasks-list";
import { cn } from "@/lib/utils";

export function AddTaskForm({ sprintId, projectId, onBack }) {
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    taskId: "",
    taskTitle: "",
    description: "",
    assignee: "Backend Developer",
    estimation: "8",
    priority: "",
    status: "",
    sprintId: sprintId || "",
  });

  const [checklistItems, setChecklistItems] = React.useState([
    { id: 1, text: "", completed: false },
    { id: 2, text: "", completed: false },
    { id: 3, text: "", completed: false },
  ]);

  // Sample sprints - bisa diambil dari API atau data.json
  const sprints = [
    { id: "1", name: "Sprint 1: Project Setup" },
    { id: "2", name: "Sprint 2: Authentication" },
    { id: "3", name: "Sprint 3: Core Features" },
  ];

  // Sample tasks - bisa diambil dari API atau data.json
  const [sprintTasks, setSprintTasks] = React.useState([
    {
      id: "1",
      sprintId: "1",
      taskId: "SPRINT-1-SETUP-001",
      taskTitle: "Setup project structure",
      description: "Initialize repository and configure development environment",
      assignee: "Backend Developer",
      estimation: "8",
      priority: "High",
      status: "In Progress",
    },
    {
      id: "2",
      sprintId: "1",
      taskId: "SPRINT-1-SETUP-002",
      taskTitle: "Design database schema",
      description: "Create ERD and define data models",
      assignee: "Backend Developer",
      estimation: "6",
      priority: "High",
      status: "Pending",
    },
    {
      id: "3",
      sprintId: "2",
      taskId: "SPRINT-2-AUTH-001",
      taskTitle: "Implement authentication",
      description: "Setup JWT and user management",
      assignee: "Backend Developer",
      estimation: "12",
      priority: "Urgent",
      status: "Review",
    },
    {
      id: "4",
      sprintId: "1",
      taskId: "SPRINT-1-SETUP-003",
      taskTitle: "Configure CI/CD pipeline",
      description: "Setup automated testing and deployment",
      assignee: "DevOps Engineer",
      estimation: "4",
      priority: "Medium",
      status: "Done",
    },
  ]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddChecklistItem = () => {
    const newId = Math.max(...checklistItems.map((item) => item.id), 0) + 1;
    setChecklistItems([...checklistItems, { id: newId, text: "", completed: false }]);
  };

  const handleRemoveChecklistItem = (id) => {
    if (checklistItems.length > 1) {
      setChecklistItems(checklistItems.filter((item) => item.id !== id));
    }
  };

  const handleChecklistItemChange = (id, field, value) => {
    setChecklistItems(
      checklistItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleEditTask = (task) => {
    // Pre-fill form with task data
    setFormData({
      taskId: task.taskId || "",
      taskTitle: task.taskTitle || "",
      description: task.description || "",
      assignee: task.assignee || "",
      estimation: task.estimation || "",
      priority: task.priority || "",
      status: task.status || "",
      sprintId: task.sprintId || formData.sprintId,
    });
    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteTask = (taskId) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setSprintTasks((prev) => prev.filter((task) => task.id !== taskId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Task form submitted:", {
      ...formData,
      checklistItems,
    });
    // Navigate back
    if (formData.sprintId) {
      router.push(`/projects/detail/sprint?id=${formData.sprintId}&projectId=${projectId}`);
    } else {
      router.push(`/projects/detail?id=${projectId}`);
    }
  };

  return (
    <form id="add-task-form" onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent">
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl font-semibold">Task Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* Sprint Selection */}
          <div className="space-y-2">
            <Label htmlFor="sprintId">Sprint</Label>
            <Select
              value={formData.sprintId}
              onValueChange={(value) => handleInputChange("sprintId", value)}
            >
              <SelectTrigger id="sprintId" className="w-full focus-visible:ring-primary/20">
                <SelectValue placeholder="Select a sprint" />
              </SelectTrigger>
              <SelectContent>
                {sprints.map((sprint) => (
                  <SelectItem key={sprint.id} value={sprint.id}>
                    {sprint.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <CardDescription>
              Select the sprint for this task
            </CardDescription>
          </div>

          {/* Task ID */}
          <div className="space-y-2">
            <Label htmlFor="taskId">Task ID</Label>
            <Input
              id="taskId"
              value={formData.taskId}
              onChange={(e) => handleInputChange("taskId", e.target.value)}
              placeholder="Enter task ID"
              className="focus-visible:ring-primary/20"
            />
            <CardDescription>
              e.g., SPRINT-1-SETUP-001
            </CardDescription>
          </div>

          {/* Task Title */}
          <div className="space-y-2">
            <Label htmlFor="taskTitle">Task Title</Label>
            <Input
              id="taskTitle"
              value={formData.taskTitle}
              onChange={(e) => handleInputChange("taskTitle", e.target.value)}
              placeholder="e.g., Verify Project Setup"
              className="focus-visible:ring-primary/20"
            />
            <CardDescription>
              Brief description of the task
            </CardDescription>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter task description"
              className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            />
            <CardDescription>
              Detailed description of what needs to be done
            </CardDescription>
          </div>

          {/* Assignee and Estimation */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="assignee">Assignee</Label>
              <Input
                id="assignee"
                value={formData.assignee}
                onChange={(e) => handleInputChange("assignee", e.target.value)}
                placeholder="Backend Developer"
                className="focus-visible:ring-primary/20"
              />
              <CardDescription>Person responsible</CardDescription>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimation">Estimation (hours)</Label>
              <Input
                id="estimation"
                type="number"
                value={formData.estimation}
                onChange={(e) => handleInputChange("estimation", e.target.value)}
                placeholder="8"
                min="0"
                className="focus-visible:ring-primary/20"
              />
              <CardDescription>Time estimate</CardDescription>
            </div>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label>Priority</Label>
            <ToggleGroup
              type="single"
              value={formData.priority}
              onValueChange={(value) => value && handleInputChange("priority", value)}
              variant="outline"
              className="justify-start"
            >
              <ToggleGroupItem value="Low" aria-label="Low">
                Low
              </ToggleGroupItem>
              <ToggleGroupItem value="Medium" aria-label="Medium">
                Medium
              </ToggleGroupItem>
              <ToggleGroupItem value="High" aria-label="High">
                High
              </ToggleGroupItem>
              <ToggleGroupItem value="Urgent" aria-label="Urgent">
                Urgent
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>
            <ToggleGroup
              type="single"
              value={formData.status}
              onValueChange={(value) => value && handleInputChange("status", value)}
              variant="outline"
              className="justify-start"
            >
              <ToggleGroupItem value="Pending" aria-label="Pending">
                Pending
              </ToggleGroupItem>
              <ToggleGroupItem value="In Progress" aria-label="In Progress">
                In Progress
              </ToggleGroupItem>
              <ToggleGroupItem value="Review" aria-label="Review">
                Review
              </ToggleGroupItem>
              <ToggleGroupItem value="Done" aria-label="Done">
                Done
              </ToggleGroupItem>
              <ToggleGroupItem value="Blocked" aria-label="Blocked">
                Blocked
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardContent>
      </Card>

      {/* Task Checklist */}
      <Card>
        <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CardTitle className="text-xl font-semibold">Task Checklist</CardTitle>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddChecklistItem}
              className="gap-2"
            >
              <IconPlus className="size-4" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-6">
          {checklistItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <Checkbox
                checked={item.completed}
                onCheckedChange={(checked) =>
                  handleChecklistItemChange(item.id, "completed", checked)
                }
                className="shrink-0"
              />
              <Input
                value={item.text}
                onChange={(e) => handleChecklistItemChange(item.id, "text", e.target.value)}
                placeholder="Enter checklist item"
                className="flex-1 focus-visible:ring-primary/20"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
                onClick={() => handleRemoveChecklistItem(item.id)}
                disabled={checklistItems.length === 1}
              >
                <IconTrash className="size-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sprint Tasks List */}
      <SprintTasksList 
        sprintId={formData.sprintId}
        tasks={sprintTasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />

      {/* Action Buttons */}
      <div className="sticky bottom-0 z-10 -mx-4 lg:-mx-6 px-4 lg:px-6 py-4 bg-background/80 backdrop-blur-md border-t">
        <div className="flex items-center justify-end gap-3 max-w-7xl mx-auto">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="min-w-[100px]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="min-w-[140px] gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
          >
            Save Task
          </Button>
        </div>
      </div>
    </form>
  );
}

