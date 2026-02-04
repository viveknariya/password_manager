"use client";
import * as React from "react";
import { usePathname } from "next/navigation";
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
import { ShieldCheck } from "lucide-react";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Home",
      items: [
        {
          title: "Home",
          url: "/",
        },
      ],
    },
    {
      title: "Introduction",
      items: [
        {
          title: "Introduction",
          url: "/docs",
        },
      ],
    },
    {
      title: "Setup",
      items: [
        {
          title: "Tech Stack",
          url: "/docs/tech-stack",
        },
        {
          title: "Setup",
          url: "/docs/setup",
        },
      ],
    },
  ],
};

export function DocsSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar {...props}>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <span className="font-bold tracking-tight">SocialVault</span>
        </div>
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
