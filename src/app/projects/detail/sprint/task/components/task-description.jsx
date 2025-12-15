"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { Button } from "@/lib/components/ui/button";
import { IconMenu2, IconPencil } from "@tabler/icons-react";
// Textarea component - using native textarea with styling

export function TaskDescription({ description, onDescriptionChange }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedDescription, setEditedDescription] = React.useState(description || "");

  React.useEffect(() => {
    setEditedDescription(description || "");
  }, [description]);

  const handleSave = () => {
    onDescriptionChange?.(editedDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedDescription(description || "");
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="">
        <div className="flex items-center gap-2">
          <IconMenu2 className="size-4 text-muted-foreground" />
          <CardTitle className="text-base font-semibold">Description</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="space-y-3">
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Enter task description..."
              className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              autoFocus
            />
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={handleSave}>
                Save
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {description || "No description provided. Click Edit Description to add one."}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="gap-2"
            >
              <IconPencil className="size-3.5" />
              Edit Description
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

