import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";

// import { ChartAreaInteractive } from "@/lib/components/chart-area-interactive";
import data from "@/app/data.json";
import { SectionCards } from "@/app/components/section-cards";
import { StatCards } from "@/app/components/stat-cards";
import { ActivityFeed } from "@/app/components/activity-feed";
import { TaskListBoard } from "@/app/components/task-list-board";
import { DataTableTasks } from "@/app/components/tasks/components/data-table-tasks";
import { columns } from "@/app/components/tasks/components/columns";
import { taskSchema } from "@/app/components/tasks/data/schema";
import { Separator } from "@/lib/components/ui/separator";
import { PageHeader } from "@/lib/components/page-header";

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/app/components/tasks/data/tasks.json")
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function Page() {
  const tasks = await getTasks();

  return (
    <>
      <PageHeader 
        title="Dashboard" 
        breadcrumbs={[]} 
      />
      <div className="flex flex-col gap-4 py-4 md:gap-10 md:py-6 ">
        <div className="space-y-6">
          <SectionCards cards={data.sectionCards} />
          <StatCards cards={data.statCards} />
          <Separator />
          <DataTableTasks data={tasks} columns={columns} />
          <Separator />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6 ">
            <ActivityFeed activities={data.activities} />
            <TaskListBoard />
          </div>
        </div>
      </div>
    </>
  );
}
