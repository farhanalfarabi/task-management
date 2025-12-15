"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card";
import { Badge } from "@/lib/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/lib/components/ui/avatar";

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

export function RecentActivityCard({ memberActivities }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {memberActivities.length > 0 ? (
          <div className="space-y-4">
            {memberActivities.slice(0, 10).map((item) => {
              return (
                <div key={item.id} className="relative flex gap-2 md:gap-3 pb-4 last:pb-0">
                  <div className="bg-border absolute top-10 bottom-0 left-3 w-px md:top-12 md:left-4" />
                  <div className="relative z-10">
                    <Avatar className="h-6 w-6 md:h-8 md:w-8">
                      <AvatarImage src={item.user?.avatar} alt={item.user?.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
                        {item.user?.initials || item.user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:gap-2 md:text-sm">
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                        <span className="text-foreground font-medium">{item.user?.name}</span>
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
                    {item.comment && (
                      <div className="bg-muted text-muted-foreground mt-2 rounded-lg p-2 text-xs leading-relaxed md:mt-3 md:p-3 md:text-sm">
                        {item.comment}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No recent activity
          </div>
        )}
      </CardContent>
    </Card>
  );
}

