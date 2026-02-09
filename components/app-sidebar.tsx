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
import { NavMain } from "./nav-main";
import {
  DollarSign,
  Home,
  Inbox,
  LogOut,
  Search,
  Settings,
  Sparkles,
  User,
} from "lucide-react";
import { NavSecondary } from "./nav-secondary";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const installedApps = useAtomValue(installedAppsAtom);

  const data = {
    navMain: [
      {
        title: "Manage Apps",
        url: "/manage-apps",
        icon: Settings,
      },
    ],
    navSecondary: [
      {
        title: "Info",
        url: "/user-info",
        icon: User,
      },
      {
        title: "Billing",
        url: "/user-billing",
        icon: DollarSign,
      },

      {
        title: "Logout",
        url: "/logout",
        icon: LogOut,
      },
    ],
  };
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
        <SidebarGroup>
          <NavMain items={data.navMain} />
        </SidebarGroup>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
