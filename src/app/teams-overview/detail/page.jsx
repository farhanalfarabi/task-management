"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/lib/components/page-header";
import { IconTrendingUp, IconTrendingDown, IconAlertCircle, IconActivity } from "@tabler/icons-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/lib/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/lib/components/ui/card";
import data from "@/app/data.json";
import tasksData from "@/app/components/tasks/data/tasks.json";
import { ProfileCard } from "./components/profile-card";
import { CurrentTasksCard } from "./components/current-tasks-card";
import { RecentActivityCard } from "./components/recent-activity-card";
import { ProjectCard } from "@/app/projects/components/project-card";
import { Separator } from "@/lib/components/ui/separator";

function TeamMemberDetailContent() {
  const searchParams = useSearchParams();
  const memberId = searchParams.get("id") || "1";
  const member = data.teams?.find((t) => t.id === parseInt(memberId));

  if (!member) {
    return (
      <>
        <PageHeader 
          title="Member Not Found" 
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Teams", href: "/teams-overview" },
            { label: "Not Found" }
          ]} 
        />
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <p>Member not found</p>
        </div>
      </div>
      </>
    );
  }

  // Generate member details
  const memberName = member.reviewer || "Unknown";
  const memberEmail = `${memberName.toLowerCase().replace(/\s+/g, '.')}@example.com`;
  
  // Generate consistent phone number based on member name
  const generatePhoneNumber = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const num1 = Math.abs(hash) % 9000 + 1000;
    const num2 = Math.abs(hash * 31) % 9000 + 1000;
    return `+1 (555) ${num1}-${num2}`;
  };
  
  const memberPhone = member.phone || generatePhoneNumber(memberName);
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(memberName)}`;
  
  // Get tasks for this member
  const memberTasks = tasksData.filter(
    (task) => task.memberName === memberName
  );
  
  const activeTasks = memberTasks.filter(
    (task) => task.status === "in progress" || task.status === "todo"
  );
  
  const completedTasks = memberTasks.filter(
    (task) => task.status === "done"
  );
  
  const taskCompletionRate = memberTasks.length > 0 
    ? Math.round((completedTasks.length / memberTasks.length) * 100)
    : 0;

  // Get activities related to this member
  const memberActivities = data.activities?.filter(
    (activity) => 
      activity.user?.name === memberName ||
      activity.assignee === memberName ||
      activity.target?.includes(memberName)
  ) || [];

  // Get projects for this member
  const memberProjects = data.projects?.filter((project) =>
    project.teamMembers?.some((tm) => tm.name === memberName)
  ) || [];

  // Calculate project statistics
  const totalProjects = memberProjects.length;
  const completedProjects = memberProjects.filter(
    (project) => project.status === "Completed"
  ).length;
  const inProgressProjects = memberProjects.filter(
    (project) => project.status !== "Completed"
  ).length;
  const completionPercentage = totalProjects > 0
    ? Math.round((completedProjects / totalProjects) * 100)
    : 0;

  // Filter active projects (not completed)
  const activeProjects = memberProjects.filter(
    (project) => project.status !== "Completed"
  );

  return (
    <>
      <PageHeader 
        title={memberName}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Teams", href: "/teams-overview" },
          { label: memberName }
        ]} 
      />
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6 ">
        <Tabs defaultValue="overview" className="w-full ">
          <TabsList className="mb-6 w-full"> 
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            {/* <TabsTrigger value="performance">Performance</TabsTrigger> */}
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left Column - Profile & Stats (Sticky) */}
              <div className="lg:col-span-1">
                <div className="sticky top-6 self-start">
                  <ProfileCard
                    member={member}
                    memberName={memberName}
                    memberEmail={memberEmail}
                    memberPhone={memberPhone}
                    avatarUrl={avatarUrl}
                    activeTasks={activeTasks}
                    completedTasks={completedTasks}
                    taskCompletionRate={taskCompletionRate}
                    projectsCount={memberProjects.length}
                  />
                </div>
              </div>

              {/* Right Column - Tasks & Activity (Scrollable) */}
              <div className="lg:col-span-2 space-y-6">
                <CurrentTasksCard activeTasks={activeTasks} />
                <RecentActivityCard memberActivities={memberActivities} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="mt-0">
            <div className="space-y-6">
              {/* Project Statistics Cards */}
              {totalProjects > 0 && (
                <div className="">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {[
                      {
                        description: "TOTAL PROJECTS",
                        title: String(totalProjects),
                        trend: "optimal",
                        trendText: "All active",
                      },
                      {
                        description: "COMPLETED",
                        title: String(completedProjects),
                        trend: "up",
                        trendText: `${completionPercentage}% completion`,
                      },
                      {
                        description: "IN PROGRESS",
                        title: String(inProgressProjects),
                        trend: "optimal",
                        trendText: "Active work",
                      },
                    ].map((card, index) => (
                      <Card key={index} className="from-primary/5 to-card bg-gradient-to-t shadow-xs">
                      <CardHeader>
                          <CardDescription>{card.description}</CardDescription>
                          <CardTitle className="text-2xl font-semibold tabular-nums md:text-3xl">
                            {card.title}
                          </CardTitle>
                      </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                          <div className="line-clamp-1 flex gap-2 font-medium">
                            {card.trendText || ""}
                            {card.trend === "up" && <IconTrendingUp className="size-4" />}
                            {card.trend === "down" && <IconTrendingDown className="size-4" />}
                            {card.trend === "warning" && <IconAlertCircle className="size-4" />}
                            {card.trend === "optimal" && <IconActivity className="size-4" />}
                          </div>
                        </CardFooter>
                    </Card>
                  ))}
                  </div>
                </div>
              )}

              {/* Active Projects Section */}
              {activeProjects.length > 0 && (
                <>
                  <Separator className="my-8" />
                  <div className="">
                    <div className="mb-6 flex flex-row items-center justify-between">
                      <h1 className="text-2xl font-semibold tracking-tight">Active Projects</h1>
                      <p className="text-muted-foreground">
                        {activeProjects.length} projects in progress
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {activeProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          {/* <TabsContent value="performance" className="mt-0">
            <div className="space-y-6">
              <SectionCards
                cards={[
                  {
                    description: "PRODUCTIVITY SCORE",
                    title: "92/100",
                    trend: "up",
                    trendText: "Excellent",
                  },
                  {
                    description: "TASKS ON TIME",
                    title: `${taskCompletionRate}%`,
                    trend: "optimal",
                    trendText: "Above target",
                  },
                  {
                    description: "AVG RESPONSE TIME",
                    title: "2.4h",
                    trend: "optimal",
                    trendText: "Within SLA",
                  },
                  {
                    description: "QUALITY SCORE",
                    title: "4.8/5.0",
                    trend: "up",
                    trendText: "High quality",
                  },
                ]}
              />
            </div>
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
    </>
  );
}

export default function TeamMemberDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <p>Loading...</p>
          </div>
        </div>
      }
    >
      <TeamMemberDetailContent />
    </Suspense>
  );
}

