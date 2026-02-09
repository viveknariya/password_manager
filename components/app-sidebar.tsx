"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAtomValue } from "jotai";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { installedAppsAtom } from "@/lib/store";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Platform",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "User",
      items: [
        {
          title: "Info",
          url: "/user-info",
        },
        {
          title: "Billing",
          url: "/user-billing",
        },
        {
          title: "Manage Apps",
          url: "/manage-apps",
        },
        {
          title: "Logout",
          url: "/logout",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const installedApps = useAtomValue(installedAppsAtom);
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 font-bold px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center border border-black">
            <Image src="/logo.png" alt="Logo" width={32} height={32} />
          </div>
          <span className="text-xl">Zallyy</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items?.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <SidebarGroup>
          <SidebarGroupLabel>Apps</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {installedApps.length === 0 && (
                <SidebarMenuItem>
                  <div className="px-2 py-2 text-xs text-muted-foreground">
                    No apps added yet
                  </div>
                </SidebarMenuItem>
              )}
              {installedApps.map((app) => (
                <SidebarMenuItem key={app.id}>
                  <SidebarMenuButton asChild isActive={pathname === app.url}>
                    <Link href={app.url} className="flex items-center gap-2">
                      <Image
                        src={app.icon}
                        alt={`${app.name} icon`}
                        width={16}
                        height={16}
                      />
                      <span>{app.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
