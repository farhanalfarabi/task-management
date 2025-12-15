"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Upload,
  FolderPlus,
  Folder,
  File,
  MoreVertical,
  List,
  Grid3x3,
  Download,
  Trash2,
  Edit,
  Copy,
  Share2,
  ArrowLeft,
  FileText,
  Image as ImageIcon,
  FileCode,
  FileSpreadsheet,
  FileVideo,
  Music,
} from "lucide-react";
import { UploadFileModal } from "./upload-file-modal";
import { Input } from "@/lib/components/ui/input";
import { Button } from "@/lib/components/ui/button";
import { Checkbox } from "@/lib/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";
import { cn } from "@/lib/utils";

// Sample data untuk documents
const initialDocuments = [
  {
    id: "1",
    name: "Project Brief",
    type: "file",
    fileType: "pdf",
    size: "2.4 MB",
    modified: "2 hours ago",
    modifiedDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    name: "Design Assets",
    type: "folder",
    size: "125 MB",
    modified: "1 day ago",
    modifiedDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
    items: 12,
  },
  {
    id: "3",
    name: "Meeting Notes",
    type: "folder",
    size: "850 KB",
    modified: "3 days ago",
    modifiedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    items: 5,
  },
  {
    id: "4",
    name: "Wireframes",
    type: "file",
    fileType: "figma",
    size: "5.1 MB",
    modified: "5 days ago",
    modifiedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "5",
    name: "User Research",
    type: "folder",
    size: "45 MB",
    modified: "1 week ago",
    modifiedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    items: 8,
  },
  {
    id: "6",
    name: "API Documentation",
    type: "file",
    fileType: "md",
    size: "1.2 MB",
    modified: "2 weeks ago",
    modifiedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
  },
];

const getFileIcon = (fileType) => {
  const iconMap = {
    pdf: FileText,
    figma: File,
    md: FileCode,
    doc: FileText,
    docx: FileText,
    xls: FileSpreadsheet,
    xlsx: FileSpreadsheet,
    jpg: ImageIcon,
    png: ImageIcon,
    gif: ImageIcon,
    mp4: FileVideo,
    mov: FileVideo,
    mp3: Music,
  };
  return iconMap[fileType] || File;
};

const formatBytes = (bytes) => {
  if (!bytes) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

const formatFileSize = (bytes) => {
  if (!bytes) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

export function DocumentsView() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("list");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const filteredDocuments = useMemo(() => {
    let filtered = [...documents];

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter((doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "modified":
          return b.modifiedDate - a.modifiedDate;
        case "size":
          return (b.size || "").localeCompare(a.size || "");
        case "type":
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

    return filtered;
  }, [documents, searchQuery, sortBy]);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(new Set(filteredDocuments.map((doc) => doc.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleSelectItem = (id, checked) => {
    const newSelected = new Set(selectedItems);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedItems(newSelected);
  };

  const handleDelete = (id) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleDeleteSelected = () => {
    setDocuments((prev) =>
      prev.filter((doc) => !selectedItems.has(doc.id))
    );
    setSelectedItems(new Set());
  };

  const handleUpload = (uploadedFiles) => {
    // Convert uploaded files to document format
    const newDocuments = uploadedFiles.map((file, index) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const fileTypeMap = {
        pdf: "pdf",
        doc: "doc",
        docx: "doc",
        xls: "xls",
        xlsx: "xls",
        jpg: "jpg",
        jpeg: "jpg",
        png: "png",
        gif: "gif",
        md: "md",
        txt: "txt",
      };

      return {
        id: `uploaded-${Date.now()}-${index}`,
        name: file.name,
        type: "file",
        fileType: fileTypeMap[fileExtension] || "file",
        size: formatFileSize(file.size),
        modified: "Just now",
        modifiedDate: new Date(),
      };
    });

    setDocuments((prev) => [...newDocuments, ...prev]);
  };

  const allSelected = filteredDocuments.length > 0 && selectedItems.size === filteredDocuments.length;
  const someSelected = selectedItems.size > 0 && selectedItems.size < filteredDocuments.length;

  return (
    <div className="flex flex-col gap-4">
      {/* Header with Search, Sort, and View Toggle */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search in Drive"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsUploadModalOpen(true)}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="modified">Modified</SelectItem>
              <SelectItem value="size">Size</SelectItem>
              <SelectItem value="type">Type</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className="rounded-r-none border-r"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              className="rounded-l-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      {selectedItems.size > 0 && (
        <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-3">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={allSelected}
              onCheckedChange={handleSelectAll}
            />
            <span className="text-sm font-medium">
              {selectedItems.size} {selectedItems.size === 1 ? "item" : "items"} selected
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleDeleteSelected}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      <UploadFileModal
        open={isUploadModalOpen}
        onOpenChange={setIsUploadModalOpen}
        onUpload={handleUpload}
      />

      {/* Documents List/Grid */}
      {viewMode === "list" ? (
        <div className="rounded-lg border">
          <div className="divide-y">
            {/* Header */}
            <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 p-3 bg-muted/50 text-sm font-medium text-muted-foreground">
              <div className="w-10"></div>
              <div>Name</div>
              <div className="text-right">Size</div>
              <div>Modified</div>
              <div className="w-10"></div>
            </div>

            {/* Items */}
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc) => {
                const FileIcon = doc.type === "folder" ? Folder : getFileIcon(doc.fileType);
                const isSelected = selectedItems.has(doc.id);

                return (
                  <div
                    key={doc.id}
                    className={cn(
                      "grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 p-3 hover:bg-muted/50 transition-colors cursor-pointer items-center",
                      isSelected && "bg-primary/5"
                    )}
                    onClick={() => {
                      if (doc.type === "folder") {
                        // Navigate to folder (placeholder)
                      }
                    }}
                  >
                    <div onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) => handleSelectItem(doc.id, checked)}
                      />
                    </div>
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={cn(
                          "flex-shrink-0",
                          doc.type === "folder" && "text-blue-500",
                          doc.type === "file" && "text-muted-foreground"
                        )}
                      >
                        <FileIcon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate">{doc.name}</div>
                        {doc.type === "folder" && doc.items && (
                          <div className="text-xs text-muted-foreground">
                            {doc.items} {doc.items === 1 ? "item" : "items"}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground text-right">
                      {doc.size}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {doc.modified}
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Make a copy
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(doc.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                No documents found
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc) => {
              const FileIcon = doc.type === "folder" ? Folder : getFileIcon(doc.fileType);
              const isSelected = selectedItems.has(doc.id);

              return (
                <div
                  key={doc.id}
                  className={cn(
                    "relative rounded-lg border p-4 hover:shadow-md transition-all cursor-pointer group",
                    isSelected && "ring-2 ring-primary bg-primary/5"
                  )}
                  onClick={() => {
                    if (doc.type === "folder") {
                      // Navigate to folder (placeholder)
                    }
                  }}
                >
                  <div className="absolute top-3 left-3" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(checked) => handleSelectItem(doc.id, checked)}
                    />
                  </div>
                  <div className="flex flex-col items-center gap-3 pt-6">
                    <div
                      className={cn(
                        "flex-shrink-0",
                        doc.type === "folder" && "text-blue-500",
                        doc.type === "file" && "text-muted-foreground"
                      )}
                    >
                      <FileIcon className="h-12 w-12" />
                    </div>
                    <div className="text-center min-w-0 w-full">
                      <div className="font-medium truncate">{doc.name}</div>
                      {doc.type === "folder" && doc.items && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {doc.items} {doc.items === 1 ? "item" : "items"}
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground mt-1">
                        {doc.size} • {doc.modified}
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Make a copy
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(doc.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full p-8 text-center text-muted-foreground">
              No documents found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

