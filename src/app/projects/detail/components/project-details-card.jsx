"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { Badge } from "@/lib/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/lib/components/ui/avatar";
import { IconClock, IconCalendar } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export function ProjectDetailsCard({ project }) {
  const statusColors = {
    "In Progress": "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary",
    "Completed": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    "On Hold": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    "Planning": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Project Details</CardTitle>
          <Badge 
            className={cn(
              "flex items-center gap-1",
              statusColors[project.status] || statusColors["In Progress"]
            )}
          >
            <IconClock className="size-3" />
            {project.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.description || "Redesign and rebuild the customer dashboard with improved performance, modern UI components, and enhanced analytics capabilities. This project will deliver a seamless experience for our enterprise clients."}
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <IconCalendar className="size-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Start Date</p>
              <p className="text-sm font-medium">
                {formatDate(project.startDate) || "January 1, 2025"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <IconCalendar className="size-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Due Date</p>
              <p className="text-sm font-medium">
                {formatDate(project.dueDate) || "March 31, 2025"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 border-t pt-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Project Owner</p>
            <div className="flex items-center gap-3">
              <Avatar className="size-8">
                <AvatarImage 
                  src={project.teamMembers?.[0]?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahJohnson"} 
                  alt={project.teamMembers?.[0]?.name || "Sarah Johnson"} 
                />
                <AvatarFallback>
                  {(project.teamMembers?.[0]?.name || "SJ").split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">
                  {project.teamMembers?.[0]?.name || "Sarah Johnson"}
                </p>
                <p className="text-xs text-muted-foreground">Product Manager</p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">Team Members</p>
            <div className="flex items-center gap-2">
              {project.teamMembers?.slice(0, 3).map((member, idx) => (
                <Avatar key={idx} className="size-8 border-2 border-background">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
              ))}
              {project.teamMembers && project.teamMembers.length > 3 && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                  +{project.teamMembers.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

