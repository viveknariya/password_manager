"use client";

import { useAtom } from "jotai";
import { useState, useEffect, ReactNode } from "react";
import { userAtom, installedAppIdsAtom, availableApps } from "@/lib/store";
import { User, ApiResponse } from "@/lib/types";
import { useRouter } from "next/navigation";
import { LoadingScreen } from "@/components/ui/loading-screen";

export default function AppInitProvider({ children }: { children: ReactNode }) {
  const [, setUser] = useAtom(userAtom);
  const [installedAppIds, setInstalledAppIds] = useAtom(installedAppIdsAtom);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasHydratedApps, setHasHydratedApps] = useState(false);
  const router = useRouter();

  const getUserInfo = async () => {
    try {
      const response = await fetch("/api/user-info");
      const data: ApiResponse<User> = await response.json();

      if (data.error == "withoutauth") {
        setUser(null);
        router.push("/login");
        return;
      }
      if (data.data) {
        setUser(data.data);
      }
    } catch {
      setUser(null);
    } finally {
      setIsInitialized(true);
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem("installed_apps");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter((id) =>
            availableApps.some((app) => app.id === id),
          );
          if (filtered.length > 0) {
            setInstalledAppIds(filtered);
          }
        }
      }
    } catch {
      // Ignore malformed storage.
    } finally {
      setHasHydratedApps(true);
    }
  }, [setInstalledAppIds]);

  useEffect(() => {
    if (!hasHydratedApps || typeof window === "undefined") return;
    window.localStorage.setItem(
      "installed_apps",
      JSON.stringify(installedAppIds),
    );
  }, [installedAppIds, hasHydratedApps]);

  if (!isInitialized) {
    return (
      <LoadingScreen
        title="Verifying session"
        subtitle="Checking your account status."
        size="sm"
      />
    );
  }

  return <>{children}</>;
}
