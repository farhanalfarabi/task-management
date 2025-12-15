"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { Input } from "@/lib/components/ui/input";
import { Button } from "@/lib/components/ui/button";
import { IconPlus, IconTrash, IconLink } from "@tabler/icons-react";

export function SprintDependenciesForm({ dependencies, onAdd, onRemove, onChange }) {
  return (
    <Card>
      <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <IconLink className="size-5 text-primary" />
            </div>
            <CardTitle className="text-xl font-semibold">Dependencies</CardTitle>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAdd}
            className="gap-2"
          >
            <IconPlus className="size-4" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-6">
        {dependencies.map((dependency) => (
          <div key={dependency.id} className="flex items-center gap-3">
            <Input
              value={dependency.sprintId}
              onChange={(e) => onChange(dependency.id, e.target.value)}
              placeholder="Enter sprint ID dependency"
              className="flex-1 focus-visible:ring-primary/20"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
              onClick={() => onRemove(dependency.id)}
              disabled={dependencies.length === 1}
            >
              <IconTrash className="size-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

