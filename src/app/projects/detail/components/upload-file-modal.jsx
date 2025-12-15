"use client";

import { useState } from "react";
import { Upload, X, File } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/lib/components/ui/dialog";
import { Button } from "@/lib/components/ui/button";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/lib/components/ui/dropzone";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const renderBytes = (bytes) => {
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(2)}${units[unitIndex]}`;
};

const FileList = ({ files, onRemove, className }) => {
  if (!files || files.length === 0) {
    return null;
  }

  return (
    <div className={cn("w-full space-y-2", className)}>
      {files.map((file, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 rounded-lg border bg-background"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              <File className="size-5 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-sm truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {renderBytes(file.size)}
              </p>
            </div>
          </div>
          {onRemove && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 flex-shrink-0"
              onClick={() => onRemove(index)}
              type="button"
            >
              <X className="size-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export function UploadFileModal({ open, onOpenChange, onUpload }) {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrop = (acceptedFiles, fileRejections, event) => {
    if (fileRejections.length > 0) {
      const error = fileRejections[0].errors[0];
      toast.error(error.message || "File upload failed");
      return;
    }

    setFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select at least one file");
      return;
    }

    setIsUploading(true);
    
    // Simulate upload process
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success(`Successfully uploaded ${files.length} ${files.length === 1 ? "file" : "files"}`);
      onUpload?.(files);
      
      // Reset and close
      setFiles([]);
      onOpenChange(false);
    } catch (error) {
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    if (!isUploading) {
      setFiles([]);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>
            Upload files to your project. You can select multiple files at once.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto min-h-0 space-y-4 pr-1">
          <Dropzone
            accept={{
              "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
              "application/pdf": [".pdf"],
              "application/msword": [".doc", ".docx"],
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
              "application/vnd.ms-excel": [".xls"],
              "text/*": [".txt", ".md", ".json"],
              "application/json": [".json"],
            }}
            maxFiles={10}
            maxSize={50 * 1024 * 1024} // 50MB
            onDrop={handleDrop}
            onError={(error) => {
              toast.error(error.message || "An error occurred");
            }}
            src={files}
            className={cn(
              "cursor-pointer flex-shrink-0",
              files.length > 0 ? "min-h-[180px]" : "min-h-[280px]",
              files.length > 0 && "border-primary"
            )}
          >
            <DropzoneEmptyState />
            <DropzoneContent />
          </Dropzone>

          {files.length > 0 && (
            <div className="flex-shrink-0 space-y-2">
              <div className="flex items-center justify-between px-1">
                <p className="text-sm font-medium">
                  {files.length} {files.length === 1 ? "file" : "files"} selected
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setFiles([])}
                  disabled={isUploading}
                  type="button"
                >
                  Clear all
                </Button>
              </div>
              <div className="max-h-[200px] overflow-y-auto pr-1">
                <FileList files={files} onRemove={handleRemoveFile} />
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex-shrink-0 mt-4">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={files.length === 0 || isUploading}
          >
            {isUploading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload {files.length > 0 && `(${files.length})`}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

