"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { Input } from "@/lib/components/ui/input";
import { Button } from "@/lib/components/ui/button";
import { IconPlus, IconTrash } from "@tabler/icons-react";

export function SprintAcceptanceCriteriaForm({ criteria, onAdd, onRemove, onChange }) {
  return (
    <Card>
      <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-xl font-semibold">Sprint Acceptance Criteria</CardTitle>
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
        {criteria.map((criterion) => (
          <div key={criterion.id} className="flex items-center gap-3">
            <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-muted-foreground/30 flex-shrink-0" />
            <Input
              value={criterion.text}
              onChange={(e) => onChange(criterion.id, e.target.value)}
              placeholder="Enter acceptance criterion"
              className="flex-1 focus-visible:ring-primary/20"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
              onClick={() => onRemove(criterion.id)}
              disabled={criteria.length === 1}
            >
              <IconTrash className="size-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

