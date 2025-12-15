"use client";

import * as React from "react";
import Link from "next/link";
import { Separator } from "@/lib/components/ui/separator";
import { SidebarTrigger } from "@/lib/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/lib/components/ui/breadcrumb";

export function PageHeader({ title, breadcrumbs = [], actions }) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 min-w-0">
        <SidebarTrigger className="-ml-1 shrink-0" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4 shrink-0" />
        
        <div className="flex flex-1 items-center justify-between gap-4 min-w-0 overflow-hidden">
          <div className="flex flex-1 flex-col gap-1 min-w-0 overflow-hidden">
            {/* Title */}
            <h1 className="text-2xl font-semibold tracking-tight truncate">{title}</h1>
            
            {/* Breadcrumb */}
            {breadcrumbs.length > 0 && (
              <div className="overflow-hidden min-w-0">
                <Breadcrumb className="overflow-hidden">
                  <BreadcrumbList className="flex-wrap overflow-hidden">
                    {breadcrumbs.map((crumb, index) => {
                      const isLast = index === breadcrumbs.length - 1;
                      return (
                        <React.Fragment key={index}>
                          <BreadcrumbItem className="truncate max-w-[150px] sm:max-w-[200px] md:max-w-none">
                            {isLast ? (
                              <BreadcrumbPage className="truncate block">{crumb.label}</BreadcrumbPage>
                            ) : (
                              <BreadcrumbLink asChild>
                                <Link href={crumb.href || "#"} className="truncate block">{crumb.label}</Link>
                              </BreadcrumbLink>
                            )}
                          </BreadcrumbItem>
                          {!isLast && <BreadcrumbSeparator className="shrink-0" />}
                        </React.Fragment>
                      );
                    })}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            )}
          </div>
          
          {/* Actions */}
          {actions && (
            <div className="flex items-center gap-2 shrink-0 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

