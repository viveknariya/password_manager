"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface AppPlaceholderProps {
  name: string;
  icon: string;
}

export function AppPlaceholder({ name, icon }: AppPlaceholderProps) {
  return (
    <div className="p-6 md:p-10 space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-3">
        <Image src={icon} alt={`${name} icon`} width={32} height={32} />
        <h1 className="text-2xl font-bold">{name}</h1>
      </div>
      <div className="rounded-lg border border-border/60 bg-card p-6 space-y-2">
        <p className="text-sm text-muted-foreground">
          This app integration is coming soon.
        </p>
        <Button asChild variant="outline">
          <Link href="/manage-apps">Manage Apps</Link>
        </Button>
      </div>
    </div>
  );
}
