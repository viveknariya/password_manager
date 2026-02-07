"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export function LogoutButton() {
  const router = useRouter();
  const [, setUser] = useAtom(userAtom);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setUser(null);
        router.push("/login");
        toast.success("You have been logged out successfully.");
      } else {
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      <Button
        variant="outline"
        onClick={() => router.back()}
        disabled={isLoading}
      >
        Cancel
      </Button>
      <Button variant="destructive" onClick={handleLogout} disabled={isLoading}>
        {isLoading ? "Logging out..." : "Log Out"}
      </Button>
    </div>
  );
}
