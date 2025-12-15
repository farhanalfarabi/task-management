"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { Input } from "@/lib/components/ui/input";
import { Button } from "@/lib/components/ui/button";
import { IconPlus, IconTrash, IconSettings } from "@tabler/icons-react";

export function SprintCustomFieldsForm({ customFields, onAdd, onRemove, onChange }) {
  return (
    <Card>
      <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <IconSettings className="size-5 text-primary" />
            </div>
            <CardTitle className="text-xl font-semibold">Custom Fields</CardTitle>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAdd}
            className="gap-2"
          >
            <IconPlus className="size-4" />
            Add Field
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-6">
        {customFields.map((field) => (
          <div key={field.id} className="flex items-center gap-3">
            <Input
              value={field.name}
              onChange={(e) => onChange(field.id, "name", e.target.value)}
              placeholder="Field name"
              className="flex-1 focus-visible:ring-primary/20"
            />
            <Input
              value={field.value}
              onChange={(e) => onChange(field.id, "value", e.target.value)}
              placeholder="Field value"
              className="flex-1 focus-visible:ring-primary/20"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
              onClick={() => onRemove(field.id)}
              disabled={customFields.length === 1}
            >
              <IconTrash className="size-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

