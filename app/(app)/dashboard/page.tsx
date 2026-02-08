"use client";

import { useAtom } from "jotai";
import { userAtom, instagramAccountsAtom } from "@/lib/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ShieldCheck,
  Key,
  AlertCircle,
  ArrowRight,
  Instagram,
  Lock,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ApiResponse, InstagramAccount } from "@/lib/types";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

export default function DashboardPage() {
  const [user] = useAtom(userAtom);
  const [instagramAccounts, setInstagramAccounts] = useAtom(
    instagramAccountsAtom,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/instagram");
        const json: ApiResponse<InstagramAccount[]> = await response.json();
        if (json.success && json.data) {
          setInstagramAccounts(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setInstagramAccounts]);

  const totalAccounts = instagramAccounts.length;
  // Mock data for other stats - in a real app these would come from the backend
  const securityScore = 85;
  const compromisedCount = 0;

  return (
    <div className="p-6 md:p-10 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back,{" "}
          {user?.first_name || user?.email?.split("@")[0] || "User"}
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your security status and saved credentials.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="relative overflow-hidden group border-none bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Credentials
            </CardTitle>
            <Key className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAccounts}</div>
            <p className="text-xs text-muted-foreground mt-1">
              across all your connected apps
            </p>
          </CardContent>
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Key className="w-24 h-24 -mr-8 -mt-8" />
          </div>
        </Card>

        <Card className="relative overflow-hidden group border-none bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Security Score
            </CardTitle>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityScore}/100</div>
            <p className="text-xs text-muted-foreground mt-1">
              Your password health is excellent
            </p>
          </CardContent>
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <ShieldCheck className="w-24 h-24 -mr-8 -mt-8" />
          </div>
        </Card>

        <Card className="relative overflow-hidden group border-none bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Compromised</CardTitle>
            <AlertCircle className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{compromisedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">
              No immediate threats detected
            </p>
          </CardContent>
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <AlertCircle className="w-24 h-24 -mr-8 -mt-8" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Access Vaults */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Vaults</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/apps/instagram">View All</Link>
            </Button>
          </div>
          <div className="grid gap-4">
            <Link href="/apps/instagram">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer border-dashed border-2">
                <CardHeader className="flex flex-row items-center gap-4 py-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white">
                    <Instagram className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">Instagram</CardTitle>
                    <CardDescription>
                      {totalAccounts} accounts saved
                    </CardDescription>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
              </Card>
            </Link>

            <Card className="opacity-60 grayscale border-dashed border-2">
              <CardHeader className="flex flex-row items-center gap-4 py-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-muted">
                  <Lock className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-base">Coming Soon</CardTitle>
                  <CardDescription>Facebook, Twitter & more</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {instagramAccounts.length > 0 ? (
                  instagramAccounts.slice(0, 5).map((account) => (
                    <div
                      key={account.id}
                      className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors"
                    >
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Instagram className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {account.username}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Updated recently
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href="/apps/instagram">
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="p-6">
                    <Empty className="border-none p-6 md:p-8">
                      <EmptyHeader>
                        <EmptyTitle>No recent activity found</EmptyTitle>
                        <EmptyDescription>
                          Add your first account to start tracking changes.
                        </EmptyDescription>
                      </EmptyHeader>
                      <EmptyContent>
                        <Button size="sm" asChild>
                          <Link href="/apps/instagram">
                            Add your first account
                          </Link>
                        </Button>
                      </EmptyContent>
                    </Empty>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
