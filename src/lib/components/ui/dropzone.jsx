"use client";

import { Upload as UploadIcon, File, X, CheckCircle2, FileUp } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/lib/components/ui/button";
import { cn } from "@/lib/utils";

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

const DropzoneContext = createContext(undefined);

export const Dropzone = ({
  accept,
  maxFiles = 10,
  maxSize,
  minSize,
  onDrop,
  onError,
  disabled,
  src,
  className,
  children,
  ...props
}) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    minSize,
    onError,
    disabled,
    onDrop: (acceptedFiles, fileRejections, event) => {
      if (fileRejections.length > 0) {
        const message = fileRejections.at(0)?.errors.at(0)?.message;
        onError?.(new Error(message));
        return;
      }
      // If src is provided (controlled), don't update local state
      if (!src) {
        setUploadedFiles(acceptedFiles);
      }
      onDrop?.(acceptedFiles, fileRejections, event);
    },
    ...props,
  });

  const filesToShow = src !== undefined ? src : uploadedFiles;

  return (
    <DropzoneContext.Provider
      key={JSON.stringify(filesToShow?.map(f => f.name))}
      value={{ src: filesToShow, accept, maxSize, minSize, maxFiles }}
    >
      <div
        className={cn(
          "relative w-full rounded-xl border-2 border-dashed transition-all cursor-pointer",
          isDragActive && !isDragReject && "border-primary bg-primary/5 shadow-lg scale-[1.02]",
          isDragReject && "border-destructive bg-destructive/5",
          disabled && "opacity-50 cursor-not-allowed",
          filesToShow && filesToShow.length > 0 && "border-primary/50 bg-primary/5",
          className
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} disabled={disabled} />
        <div className="flex flex-col items-center justify-center p-12">
          {children}
        </div>
      </div>
    </DropzoneContext.Provider>
  );
};

const useDropzoneContext = () => {
  const context = useContext(DropzoneContext);
  if (!context) {
    throw new Error("useDropzoneContext must be used within a Dropzone");
  }
  return context;
};

const maxLabelItems = 3;

export const DropzoneContent = ({ children, className }) => {
  const { src } = useDropzoneContext();

  if (!src || src.length === 0) {
    return null;
  }

  if (children) {
    return children;
  }

  return (
    <div className={cn("flex flex-col items-center justify-center w-full", className)}>
      <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 ring-4 ring-primary/10">
        <CheckCircle2 className="size-7" />
      </div>
      <p className="my-2 w-full truncate font-semibold text-base text-center mb-1">
        {src.length > maxLabelItems
          ? `${new Intl.ListFormat("en").format(
              src.slice(0, maxLabelItems).map((file) => file.name)
            )} and ${src.length - maxLabelItems} more`
          : new Intl.ListFormat("en").format(src.map((file) => file.name))}
      </p>
      <p className="w-full text-wrap text-muted-foreground text-sm text-center">
        {src.length} {src.length === 1 ? "file" : "files"} ready to upload • Drag and drop or click to replace
      </p>
    </div>
  );
};

export const DropzoneEmptyState = ({ children, className }) => {
  const { src, accept, maxSize, minSize, maxFiles } = useDropzoneContext();

  if (src && src.length > 0) {
    return null;
  }

  if (children) {
    return children;
  }

  let caption = "";
  if (accept) {
    caption += "Accepts ";
    caption += new Intl.ListFormat("en").format(Object.keys(accept));
  }
  if (minSize && maxSize) {
    caption += ` between ${renderBytes(minSize)} and ${renderBytes(maxSize)}`;
  } else if (minSize) {
    caption += ` at least ${renderBytes(minSize)}`;
  } else if (maxSize) {
    caption += ` less than ${renderBytes(maxSize)}`;
  }

  return (
    <div className={cn("flex flex-col items-center justify-center w-full", className)}>
      <div className="flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 mb-5 relative">
        <UploadIcon className="size-10 text-primary" />
        <div className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <FileUp className="size-3" />
        </div>
      </div>
      <p className="my-2 w-full truncate text-wrap font-semibold text-lg mb-2">
        Upload {maxFiles === 1 ? "a file" : "files"}
      </p>
      <p className="w-full truncate text-wrap text-muted-foreground text-sm mb-3">
        Drag and drop files here, or click to select files
      </p>
      {caption && (
        <p className="text-wrap text-muted-foreground text-xs bg-muted px-3 py-1.5 rounded-full">
          {caption}
        </p>
      )}
    </div>
  );
};

export const DropzoneFileList = ({ onRemove, className }) => {
  const { src } = useDropzoneContext();

  if (!src || src.length === 0) {
    return null;
  }

  return (
    <div className={cn("w-full space-y-2 mt-4", className)}>
      {src.map((file, index) => (
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
            >
              <X className="size-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

