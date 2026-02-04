import { ReactNode } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "react-hot-toast";
import { DocsSidebar } from "@/components/docs-sidebar";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Toaster />
      <SidebarProvider>
        <DocsSidebar />

        <main className="flex h-svh w-full">
          <SidebarTrigger className="h-screen border rounded-none" />

          <ScrollArea className="flex-1">
            <div className="p-6">{children}</div>
          </ScrollArea>
        </main>
      </SidebarProvider>
    </>
  );
}
