"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconDotsVertical, IconTrendingUp, IconCheck, IconCalendar } from "@tabler/icons-react";
import { ShoppingCart, Code, Palette, Database, Smartphone, Globe } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/lib/components/ui/card";
import { Badge } from "@/lib/components/ui/badge";
import { Progress } from "@/lib/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/lib/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/components/ui/dropdown-menu";
import { Button } from "@/lib/components/ui/button";
import { cn } from "@/lib/utils";

const iconMap = {
  shopping: ShoppingCart,
  code: Code,
  palette: Palette,
  database: Database,
  smartphone: Smartphone,
  globe: Globe,
};

const statusColors = {
  "In Progress": "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary",
  "Completed": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "On Hold": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  "Planning": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

const trackStatusColors = {
  "On track": "text-green-600 dark:text-green-400",
  "At risk": "text-yellow-600 dark:text-yellow-400",
  "Delayed": "text-red-600 dark:text-red-400",
};

export function ProjectCard({ project }) {
  const router = useRouter();
  const IconComponent = iconMap[project.icon] || ShoppingCart;
  const statusColor = statusColors[project.status] || statusColors["In Progress"];
  const trackColor = trackStatusColors[project.trackStatus] || trackStatusColors["On track"];

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `Due ${months[date.getMonth()]} ${date.getDate()}`;
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/projects/detail/edit?id=${project.id}`);
  };

  return (
    <Link href={`/projects/detail?id=${project.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 dark:bg-primary/20 p-2.5">
                <IconComponent className="size-5 text-primary" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-semibold text-base leading-tight">{project.name}</h3>
                <Badge className={cn("w-fit text-xs", statusColor)}>
                  {project.status}
                </Badge>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <IconDotsVertical className="size-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Duplicate</DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Archive</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" onClick={(e) => e.stopPropagation()}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
        {/* Team Members */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {project.teamMembers?.slice(0, 3).map((member, index) => (
              <Avatar key={index} className="size-8 border-2 border-background">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-xs">
                  {member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {project.teamMembers?.length || 0} team members
          </span>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-primary">
              {project.progress}%
            </span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <IconCheck className="size-4" />
              <span>{project.tasksCompleted}/{project.tasksTotal} tasks</span>
            </div>
            <div className="flex items-center gap-1.5">
              <IconCalendar className="size-4" />
              <span>{formatDate(project.dueDate)}</span>
            </div>
          </div>
          <div className={cn("flex items-center gap-1.5 text-sm font-medium", trackColor)}>
            <IconTrendingUp className="size-4" />
            <span>{project.trackStatus}</span>
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}

