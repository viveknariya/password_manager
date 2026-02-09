"use client";

import { useAtom, useAtomValue } from "jotai";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { installedAppIdsAtom, installedAppsAtom } from "@/lib/store";
import { ApiResponse, AppAccount } from "@/lib/types";
import { availableApps } from "@/lib/apps";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const BLOCKED_MESSAGE =
  "You must delete all accounts linked to this app before removing it from the sidebar.";

export default function ManageAppsPage() {
  const [installedAppIds, setInstalledAppIds] = useAtom(installedAppIdsAtom);
  const installedApps = useAtomValue(installedAppsAtom);
  const [appAccounts, setAppAccounts] = useState<AppAccount[]>([]);
  const [blockedMessage, setBlockedMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("/api/app-accounts");
        const json: ApiResponse<AppAccount[]> = await response.json();
        if (json.success && json.data) {
          setAppAccounts(json.data);
        }
      } catch {
        // Ignore fetch errors; removal checks will use current state.
      }
    };

    fetchAccounts();
  }, []);

  const availableMenuApps = useMemo(
    () =>
      availableApps.map((app) => ({
        ...app,
        isInstalled: installedAppIds.includes(app.id),
      })),
    [installedAppIds],
  );

  const hasLinkedAccounts = (appId: string) => {
    return appAccounts.some((account) => account.app_id === appId);
  };

  const handleAddApp = async (appId: string) => {
    if (installedAppIds.includes(appId)) {
      toast.error("This app is already in your sidebar.");
      return;
    }
    setBlockedMessage(null);
    try {
      const response = await fetch("/api/user-apps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appId }),
      });
      const json: ApiResponse<string[]> = await response.json();
      if (!json.success) {
        toast.error(json.message || "Failed to add app.");
        return;
      }
      if (json.data) {
        setInstalledAppIds(json.data);
      }
      const app = availableApps.find((item) => item.id === appId);
      toast.success(`${app?.name ?? "App"} added to your sidebar.`);
    } catch {
      toast.error("An error occurred while adding the app.");
    }
  };

  const handleRemoveApp = async (appId: string) => {
    if (hasLinkedAccounts(appId)) {
      setBlockedMessage(BLOCKED_MESSAGE);
      toast.error(BLOCKED_MESSAGE);
      return;
    }
    try {
      const response = await fetch("/api/user-apps", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appId }),
      });
      const json: ApiResponse<string[]> = await response.json();
      if (!json.success) {
        const message = json.message || "Failed to remove app.";
        setBlockedMessage(message);
        toast.error(message);
        return;
      }
      if (json.data) {
        setInstalledAppIds(json.data);
      }
      setBlockedMessage(null);
      const app = availableApps.find((item) => item.id === appId);
      toast.success(`${app?.name ?? "App"} removed from your sidebar.`);
    } catch {
      toast.error("An error occurred while removing the app.");
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Manage Apps</h1>
        <p className="text-muted-foreground">
          Control which apps appear in your sidebar.
        </p>
      </div>

      {blockedMessage && (
        <Alert variant="destructive">
          <AlertTitle>Unable to remove app</AlertTitle>
          <AlertDescription>{blockedMessage}</AlertDescription>
        </Alert>
      )}

      <Card className="border-border/60">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Add App</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> Add App
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[220px]">
              {availableMenuApps.map((app) => (
                <DropdownMenuItem
                  key={app.id}
                  disabled={app.isInstalled}
                  onSelect={() => handleAddApp(app.id)}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={app.icon}
                    alt={`${app.name} icon`}
                    width={18}
                    height={18}
                  />
                  <span className="flex-1">{app.name}</span>
                  {app.isInstalled && (
                    <span className="text-xs text-muted-foreground">Added</span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="space-y-3">
          {installedApps.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No apps added yet. Use the button above to add your first app.
            </p>
          )}
          {installedApps.map((app) => (
            <div
              key={app.id}
              className="flex items-center justify-between rounded-md border border-border/60 px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={app.icon}
                  alt={`${app.name} icon`}
                  width={24}
                  height={24}
                />
                <div className="text-sm font-medium">{app.name}</div>
              </div>
              <Button
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() => handleRemoveApp(app.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
