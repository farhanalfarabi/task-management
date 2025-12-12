"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/lib/components/ui/avatar"
import { Badge } from "@/lib/components/ui/badge"
import { Button } from "@/lib/components/ui/button"
import { Switch } from "@/lib/components/ui/switch"
import { Filter, Tag, FileText, MessageSquare, User } from "lucide-react"

const getStatusColor = (color) => {
  switch (color) {
    case "green":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    case "blue":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    case "red":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
    case "orange":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
  }
};

const getTagColor = (color) => {
  switch (color) {
    case "red":
      return "bg-red-500";
    case "blue":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};

const getActivityIcon = (type) => {
  switch (type) {
    case "tag_added":
      return <Tag className="text-muted-foreground h-4 w-4" />;
    case "file_added":
      return <FileText className="text-muted-foreground h-4 w-4" />;
    case "comment":
    case "mention":
      return <MessageSquare className="text-muted-foreground h-4 w-4" />;
    case "assignment":
      return <User className="text-muted-foreground h-4 w-4" />;
    default:
      return null;
  }
};

export function ActivityFeed({ activities = [] }) {
  const [showMentionedOnly, setShowMentionedOnly] = React.useState(false)
  let currentDate = "";

  const filteredActivities = showMentionedOnly
    ? activities.filter((item) => item.type === "mention")
    : activities;

  if (filteredActivities.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto  w-full">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center md:mb-8 px-4 lg:px-6">
        <h1 className="text-foreground text-xl font-semibold md:text-2xl">Activity log</h1>
        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs md:text-sm">Show mentioned only</span>
            <Switch 
              checked={showMentionedOnly}
              onCheckedChange={setShowMentionedOnly}
            />
          </div>
          <Button variant="ghost" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-4 md:space-y-6 px-4 lg:px-6">
        {filteredActivities.map((item) => {
          const showDate = currentDate !== item.date;

          if (showDate) {
            currentDate = item.date;
          }

          return (
            <div key={item.id}>
              {/* Date Header */}
              {showDate && (
                <div className="text-muted-foreground mb-3 text-xs font-medium tracking-wide uppercase md:mb-4 md:text-sm">
                  {item.date}
                </div>
              )}

              {/* Activity Item */}
              <div className="relative flex gap-2 md:gap-3">
                {/* Timeline Line */}
                <div className="bg-border absolute top-10 bottom-0 left-3 w-px md:top-12 md:left-4" />

                {/* Avatar or Icon */}
                <div className="relative z-10">
                  {item.type === "tag_added" || item.type === "file_added" ? (
                    <div className="bg-muted flex h-6 w-6 items-center justify-center rounded-full md:h-8 md:w-8">
                      {getActivityIcon(item.type)}
                    </div>
                  ) : (
                    <Avatar className="h-6 w-6 md:h-8 md:w-8">
                      <AvatarImage src={item.user.avatar} alt={item.user.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                        {item.user.initials}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:gap-2 md:text-sm">
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                      <span className="text-foreground font-medium">{item.user.name}</span>
                      <span className="text-muted-foreground">{item.action}</span>
                      {item.target && (
                        <span className="text-foreground font-medium">{item.target}</span>
                      )}
                      {item.status && (
                        <>
                          <span className="text-muted-foreground">status to</span>
                          <Badge
                            variant="secondary"
                            className={`${getStatusColor(item.status.color)} text-xs`}>
                            <div
                              className={`mr-1 h-1.5 w-1.5 rounded-full md:h-2 md:w-2 ${item.status.color === "green" ? "bg-green-500" : item.status.color === "blue" ? "bg-blue-500" : "bg-gray-500"}`}
                            />
                            {item.status.text}
                          </Badge>
                        </>
                      )}
                      {item.assignee && (
                        <>
                          <span className="text-muted-foreground">to</span>
                          <span className="text-foreground font-medium">{item.assignee}</span>
                        </>
                      )}
                    </div>
                    <span className="text-muted-foreground text-xs sm:ml-auto md:text-sm">
                      {item.timestamp}
                    </span>
                  </div>

                  {/* Tags */}
                  {item.tags && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.tags.map((tag, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <div
                            className={`h-1.5 w-1.5 rounded-full md:h-2 md:w-2 ${getTagColor(tag.color)}`}
                          />
                          <span className="text-muted-foreground text-xs md:text-sm">
                            {tag.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Comment */}
                  {item.comment && (
                    <div className="bg-muted text-muted-foreground mt-2 rounded-lg p-2 text-xs leading-relaxed md:mt-3 md:p-3 md:text-sm">
                      {item.comment}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

