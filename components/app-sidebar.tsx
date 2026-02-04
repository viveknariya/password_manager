"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
      title: "Apps",
      items: [
        {
          title: "Instagram",
          url: "/apps/instagram",
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
          title: "Logout",
          url: "/logout",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
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
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
