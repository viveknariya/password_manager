"use client";

import { useAtom } from "jotai";
import { useState, useEffect, ReactNode } from "react";
import { userAtom, installedAppIdsAtom } from "@/lib/store";
import { User, ApiResponse } from "@/lib/types";
import { useRouter } from "next/navigation";
import { LoadingScreen } from "@/components/ui/loading-screen";

export default function AppInitProvider({ children }: { children: ReactNode }) {
  const [, setUser] = useAtom(userAtom);
  const [, setInstalledAppIds] = useAtom(installedAppIdsAtom);
  const [isInitialized, setIsInitialized] = useState(false);
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
    const fetchInstalledApps = async () => {
      try {
        const response = await fetch("/api/user-apps");
        const json: ApiResponse<string[]> = await response.json();
        if (json.success && json.data) {
          setInstalledAppIds(json.data);
        }
      } catch {
        // Ignore fetch errors.
      }
    };

    fetchInstalledApps();
  }, [setInstalledAppIds]);

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
