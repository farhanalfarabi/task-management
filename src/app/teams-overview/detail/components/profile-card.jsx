"use client";

import { Card, CardContent, CardHeader } from "@/lib/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/lib/components/ui/avatar";
import { Badge } from "@/lib/components/ui/badge";
import { Progress } from "@/lib/components/ui/progress";
import { Separator } from "@/lib/components/ui/separator";
import { IconMail, IconBriefcase, IconUser, IconPhone } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const statusColors = {
  "Active": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "Inactive": "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
  "On Leave": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
};

export function ProfileCard({ member, memberName, memberEmail, memberPhone, avatarUrl, activeTasks, completedTasks, taskCompletionRate, projectsCount }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-center gap-4 text-center">
          <Avatar className="size-24 border-4 border-background">
            <AvatarImage src={avatarUrl} alt={memberName} />
            <AvatarFallback className="text-2xl bg-primary/10 dark:bg-primary/20">
              {memberName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">{memberName}</h2>
            <Badge className={cn("w-fit", statusColors[member.status] || statusColors["Active"])}>
              {member.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Separator />
        
        {/* Contact Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <IconMail className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">{memberEmail}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <IconPhone className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">{memberPhone}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <IconBriefcase className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">{member.type}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <IconUser className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">{member.header}</span>
          </div>
        </div>

        <Separator />

        {/* Stats */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="text-muted-foreground">Task Completion</span>
              <span className="font-medium text-primary">
                {taskCompletionRate}%
              </span>
            </div>
            <Progress value={taskCompletionRate} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="text-center bg-muted/50 p-2 rounded-lg shadow-sm">
              <div className="text-2xl font-semibold text-primary">
                {activeTasks.length}
              </div>
              <div className="text-xs text-muted-foreground">Active Tasks</div>
            </div>
            <div className="text-center bg-muted/50 p-2 rounded-lg shadow-sm">
              <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
                {completedTasks.length}
              </div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="text-center bg-muted/50 p-2 rounded-lg shadow-sm">
              <div className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                {projectsCount || 0}
              </div>
              <div className="text-xs text-muted-foreground">Projects</div>
            </div>
            <div className="text-center bg-muted/50 p-2 rounded-lg shadow-sm">
              <div className="text-2xl font-semibold text-orange-600 dark:text-orange-400">
                {taskCompletionRate}%
              </div>
              <div className="text-xs text-muted-foreground">Completion Rate</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

