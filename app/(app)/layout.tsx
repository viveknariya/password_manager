"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Provider as JotaiProvider } from "jotai";
import AppInitProvider from "../providers/app-init";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const pathSegments = pathname
    .split("/")
    .filter(
      (segment) =>
        segment !== "" && !segment.startsWith("(") && !segment.endsWith(")"),
    );

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <JotaiProvider>
      <SidebarProvider>
        <AppSidebar className="border-none" />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {pathSegments.map((segment, index) => {
                  const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
                  const isLast = index === pathSegments.length - 1;
                  const label = capitalize(segment.replace(/-/g, " "));

                  return (
                    <React.Fragment key={href}>
                      <BreadcrumbItem
                        className={isLast ? "" : "hidden md:block"}
                      >
                        {isLast ? (
                          <BreadcrumbPage>{label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast && (
                        <BreadcrumbSeparator className="hidden md:block" />
                      )}
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="w-full">
            <AppInitProvider>{children}</AppInitProvider>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </JotaiProvider>
  );
}
