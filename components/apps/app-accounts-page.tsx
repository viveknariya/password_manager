"use client";

import { useAtom, useSetAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  filteredAppAccountsAtom,
  appSearchQueryAtom,
  editingAppAccountIdAtom,
  appAccountsAtom,
  userAtom,
} from "@/lib/store";
import { AppAccountCard } from "@/components/apps/app-account-card";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { ApiResponse, AppAccount } from "@/lib/types";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { LoadingScreen } from "@/components/ui/loading-screen";

interface AppAccountsPageProps {
  appId: string;
  appName: string;
  appIcon: string;
}

export function AppAccountsPage({
  appId,
  appName,
  appIcon,
}: AppAccountsPageProps) {
  const [user] = useAtom(userAtom);
  const [filteredAccounts] = useAtom(filteredAppAccountsAtom);
  const [searchQuery, setSearchQuery] = useAtom(appSearchQueryAtom);
  const [editingId, setEditingId] = useAtom(editingAppAccountIdAtom);
  const setAccounts = useSetAtom(appAccountsAtom);
  const [loading, setLoading] = useState(true);

  const visibleAccounts = useMemo(
    () => filteredAccounts.filter((account) => account.app_id === appId),
    [filteredAccounts, appId],
  );

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch(`/api/app-accounts?appId=${appId}`);
        const json: ApiResponse<AppAccount[]> = await response.json();
        if (json.success && json.data) {
          setAccounts(json.data);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [appId, setAccounts]);

  const handleAddAccount = () => {
    setEditingId("new");
  };

  const newAccount: AppAccount = {
    id: "new",
    user_id: "",
    app_id: appId,
    username: "",
    email: "",
    password: "",
    created_at: new Date(),
    updated_at: new Date(),
  };

  return (
    <div className="p-6 md:p-10 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image src={appIcon} alt={`${appName} icon`} width={32} height={32} />
          <h1 className="text-2xl font-bold"> Accounts</h1>
        </div>
        <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-2">
          <InputGroup className="w-full sm:w-64">
            <InputGroupAddon>
              <Search className="h-4 w-4" />
            </InputGroupAddon>
            <InputGroupInput
              name="search"
              placeholder="username or email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
          <Button
            onClick={handleAddAccount}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Account
          </Button>
        </div>
      </div>

      {loading ? (
        <LoadingScreen
          title="Loading accounts"
          subtitle={`Fetching your saved ${appName} credentials.`}
          size="sm"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {editingId === "new" && (
            <AppAccountCard
              account={newAccount}
              appId={appId}
              appName={appName}
              isNew
            />
          )}
          {visibleAccounts.map((account) => (
            <AppAccountCard
              key={account.id}
              account={account}
              appId={appId}
              appName={appName}
            />
          ))}
          {visibleAccounts.length === 0 && editingId !== "new" && (
            <div className="col-span-1 md:col-span-2">
              <Empty>
                <EmptyHeader>
                  <EmptyTitle>No accounts found</EmptyTitle>
                  <EmptyDescription>
                    {searchQuery
                      ? "Try a different search term"
                      : `Add your first ${appName} account to get started`}
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button onClick={handleAddAccount}>
                    <Plus className="h-4 w-4 mr-2" /> Add Account
                  </Button>
                </EmptyContent>
              </Empty>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
