import "./globals.css";
import { AppSidebar } from "@/lib/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/lib/components/ui/sidebar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider
          style={{
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 25)",
          }}
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                {children}
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
