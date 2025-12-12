import { Button } from "@/lib/components/ui/button"
import { Separator } from "@/lib/components/ui/separator"
import { SidebarTrigger } from "@/lib/components/ui/sidebar"

export function SiteHeader() {
  return (
    <header
      className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <div className="flex flex-col ">
        <h1 className="text-2xl font-medium">IT Project Monitoring</h1>
        <p className="text-sm text-muted-foreground">Track progress, team capacity, and recent activity across all projects</p>
        </div>
        {/* <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground">
              GitHub
            </a>
          </Button>
        </div> */}
      </div>
    </header>
  );
}
