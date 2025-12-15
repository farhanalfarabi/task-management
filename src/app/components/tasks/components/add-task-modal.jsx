"use client";

import * as React from "react";
import { IconPlus } from "@tabler/icons-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/lib/components/ui/dialog";
import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";
import { statuses, priorities, labels } from "../data/data";

export function AddTaskModal({ open, onOpenChange, onAddTask }) {
  const [formData, setFormData] = React.useState({
    memberName: "",
    title: "",
    status: "",
    label: "",
    priority: "",
    deadline: "",
  });

  const [errors, setErrors] = React.useState({});

  // Reset form when modal opens
  React.useEffect(() => {
    if (open) {
      setFormData({
        memberName: "",
        title: "",
        status: "",
        label: "",
        priority: "",
        deadline: "",
      });
      setErrors({});
    }
  }, [open]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.memberName.trim()) {
      newErrors.memberName = "Member name is required";
    }
    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    }
    if (!formData.status) {
      newErrors.status = "Status is required";
    }
    if (!formData.label) {
      newErrors.label = "Label is required";
    }
    if (!formData.priority) {
      newErrors.priority = "Priority is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Generate avatar URL based on member name
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(formData.memberName)}`;

    const newTask = {
      ...formData,
      avatar,
      // Generate ID if not provided
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };

    onAddTask(newTask);
    
    // Reset form
    setFormData({
      memberName: "",
      title: "",
      status: "",
      label: "",
      priority: "",
      deadline: "",
    });
    setErrors({});
    onOpenChange(false);
  };

  const handleClose = () => {
    setFormData({
      memberName: "",
      title: "",
      status: "",
      label: "",
      priority: "",
      deadline: "",
    });
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <IconPlus className="size-5" />
            Add New Task
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new task. Fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-4">
          {/* Member Name */}
          <div className="space-y-2">
            <Label htmlFor="memberName">
              Member Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="memberName"
              placeholder="Enter member name"
              value={formData.memberName}
              onChange={(e) => handleChange("memberName", e.target.value)}
              className={errors.memberName ? "border-destructive" : ""}
            />
            {errors.memberName && (
              <p className="text-sm text-destructive">{errors.memberName}</p>
            )}
          </div>

          {/* Task Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Task Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Enter task title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          {/* Status and Label Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">
                Status <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger
                  id="status"
                  className={errors.status ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => {
                    const Icon = status.icon;
                    return (
                      <SelectItem key={status.value} value={status.value}>
                        <div className="flex items-center gap-2">
                          {Icon && <Icon className="size-4" />}
                          <span>{status.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-sm text-destructive">{errors.status}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="label">
                Label <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.label}
                onValueChange={(value) => handleChange("label", value)}
              >
                <SelectTrigger
                  id="label"
                  className={errors.label ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Select label" />
                </SelectTrigger>
                <SelectContent>
                  {labels.map((label) => (
                    <SelectItem key={label.value} value={label.value}>
                      {label.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.label && (
                <p className="text-sm text-destructive">{errors.label}</p>
              )}
            </div>
          </div>

          {/* Priority and Deadline Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">
                Priority <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => handleChange("priority", value)}
              >
                <SelectTrigger
                  id="priority"
                  className={errors.priority ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priority) => {
                    const Icon = priority.icon;
                    return (
                      <SelectItem key={priority.value} value={priority.value}>
                        <div className="flex items-center gap-2">
                          {Icon && <Icon className="size-4" />}
                          <span>{priority.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {errors.priority && (
                <p className="text-sm text-destructive">{errors.priority}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => handleChange("deadline", e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="submit">
              <IconPlus className="size-4" />
              Add Task
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

