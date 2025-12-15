"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import { Button } from "@/lib/components/ui/button";
import { IconCloudUpload, IconLink, IconTrash, IconCircleCheck } from "@tabler/icons-react";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/lib/components/ui/dropzone";
import { cn } from "@/lib/utils";

export function DocumentsFilesForm({ files = [], onFilesChange }) {
  const [fileList, setFileList] = React.useState(() => {
    return files.map((file, index) => ({
      id: file.id || index,
      name: file.name || "",
      url: file.url || "",
      type: file.type || "file",
    }));
  });

  const [linkUrl, setLinkUrl] = React.useState("");

  React.useEffect(() => {
    if (onFilesChange) {
      onFilesChange(fileList);
    }
  }, [fileList, onFilesChange]);

  const handleDrop = (acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      return;
    }

    const newFiles = acceptedFiles.map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      url: "",
      type: "file",
    }));

    setFileList((prev) => [...newFiles, ...prev]);
  };

  const handleAddLink = () => {
    if (!linkUrl.trim()) return;

    const newFile = {
      id: `link-${Date.now()}`,
      name: linkUrl,
      url: linkUrl,
      type: "link",
    };

    setFileList((prev) => [newFile, ...prev]);
    setLinkUrl("");
  };

  const handleDeleteFile = (id) => {
    setFileList((prev) => prev.filter((file) => file.id !== id));
  };

  return (
    <Card>
      <CardHeader className="border-b bg-gradient-to-r from-muted/50 to-transparent">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <IconCloudUpload className="size-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold">Documents & Files</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Upload files or add external links
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Upload Area */}
        <div>
          <Dropzone
            accept={{
              "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
              "application/pdf": [".pdf"],
              "application/msword": [".doc", ".docx"],
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
              "application/vnd.ms-excel": [".xls"],
              "text/*": [".txt", ".md"],
            }}
            maxFiles={10}
            maxSize={10 * 1024 * 1024} // 10MB
            onDrop={handleDrop}
            className={cn(
              "cursor-pointer min-h-[180px] border-2 border-dashed border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/10 transition-colors"
            )}
          >
            <div className="flex flex-col items-center justify-center gap-3 py-8 px-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <IconCloudUpload className="size-6 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">
                  Click to select files or drag to upload
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Support for images, documents, and links. Max file size 10MB
                </p>
              </div>
            </div>
            <DropzoneContent />
          </Dropzone>
        </div>

        {/* Add Link Section */}
        <div className="space-y-2">
          <Label htmlFor="linkUrl">Add Link</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <IconLink className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
              <Input
                id="linkUrl"
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com/document.pdf"
                className="pl-9 focus-visible:ring-primary/20"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddLink();
                  }
                }}
              />
            </div>
            <Button
              type="button"
              onClick={handleAddLink}
              disabled={!linkUrl.trim()}
              className="shrink-0"
            >
              Add
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Add external document or resource link
          </p>
        </div>

        {/* Files List */}
        {fileList.length > 0 && (
          <div className="space-y-0 divide-y rounded-lg border overflow-hidden">
            {fileList.map((file, index) => (
              <div
                key={file.id}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors",
                  index === 0 && "rounded-t-lg",
                  index === fileList.length - 1 && "rounded-b-lg"
                )}
              >
                <div className="flex-shrink-0">
                  <IconCircleCheck className="size-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">
                    {file.name}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
                  onClick={() => handleDeleteFile(file.id)}
                  type="button"
                >
                  <IconTrash className="size-4" />
                  <span className="sr-only">Delete file</span>
                </Button>
              </div>
            ))}
          </div>
        )}

        {fileList.length === 0 && (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No files added yet. Upload files or add links to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
}

