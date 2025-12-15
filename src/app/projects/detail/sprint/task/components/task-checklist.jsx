"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { Button } from "@/lib/components/ui/button";
import { Checkbox } from "@/lib/components/ui/checkbox";
import { Input } from "@/lib/components/ui/input";
import { IconCheck, IconPlus, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function TaskChecklist({ items: initialItems, onItemsChange }) {
  const [items, setItems] = React.useState(initialItems || []);
  const [newItemText, setNewItemText] = React.useState("");
  const [isAdding, setIsAdding] = React.useState(false);

  React.useEffect(() => {
    setItems(initialItems || []);
  }, [initialItems]);

  const completedCount = items.filter((item) => item.completed).length;
  const totalCount = items.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleToggle = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
    onItemsChange?.(updatedItems);
  };

  const handleAddItem = () => {
    if (newItemText.trim()) {
      const newItem = {
        id: Date.now().toString(),
        text: newItemText.trim(),
        completed: false,
      };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      setNewItemText("");
      setIsAdding(false);
      onItemsChange?.(updatedItems);
    }
  };

  const handleRemoveItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    onItemsChange?.(updatedItems);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddItem();
    } else if (e.key === "Escape") {
      setIsAdding(false);
      setNewItemText("");
    }
  };

  return (
    <Card>
      <CardHeader className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconCheck className="size-4 text-muted-foreground" />
            <CardTitle className="text-base font-semibold">Checklist</CardTitle>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {completedCount} of {totalCount}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAdding(true)}
              className="gap-2"
            >
              <IconPlus className="size-3.5" />
              Add Item
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.length === 0 && !isAdding ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No checklist items yet. Click "Add Item" to create one.
          </p>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors group",
                  item.completed && "opacity-60"
                )}
              >
                <Checkbox
                  checked={item.completed}
                  onCheckedChange={() => handleToggle(item.id)}
                  className="mt-0.5"
                />
                <label
                  className={cn(
                    "flex-1 text-sm cursor-pointer select-none",
                    item.completed
                      ? "line-through text-muted-foreground"
                      : "text-foreground"
                  )}
                  onClick={() => handleToggle(item.id)}
                >
                  {item.text}
                </label>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <IconX className="size-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {isAdding && (
          <div className="flex items-center gap-2 pt-2 border-t">
            <Input
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add checklist item..."
              className="flex-1"
              autoFocus
            />
            <Button size="sm" onClick={handleAddItem} disabled={!newItemText.trim()}>
              Add
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                setIsAdding(false);
                setNewItemText("");
              }}
            >
              <IconX className="size-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

