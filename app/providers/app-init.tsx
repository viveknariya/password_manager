"use client";

import { useAtom } from "jotai";
import { useState, useEffect, ReactNode } from "react";
import { userAtom } from "@/lib/store";
import { User, ApiResponse } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function AppInitProvider({ children }: { children: ReactNode }) {
  const [, setUser] = useAtom(userAtom);
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
    } catch (error) {
      console.error("Error fetching user info:", error);
      setUser(null);
    } finally {
      setIsInitialized(true);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [setUser]);

  if (!isInitialized) {
    return "Verifying session...";
  }

  return <>{children}</>;
}
