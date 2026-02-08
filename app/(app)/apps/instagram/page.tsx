"use client";

import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import {
  filteredInstagramAccountsAtom,
  instagramSearchQueryAtom,
  editingInstagramAccountIdAtom,
  instagramAccountsAtom,
  userAtom,
} from "@/lib/store";
import { InstagramCard } from "@/components/apps/instagram-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search, Loader2 } from "lucide-react";
import { ApiResponse, InstagramAccount } from "@/lib/types";

export default function InstagramPage() {
  const [user] = useAtom(userAtom);
  const [filteredAccounts] = useAtom(filteredInstagramAccountsAtom);
  const [searchQuery, setSearchQuery] = useAtom(instagramSearchQueryAtom);
  const [editingId, setEditingId] = useAtom(editingInstagramAccountIdAtom);
  const setAccounts = useSetAtom(instagramAccountsAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("/api/instagram");
        const json: ApiResponse<InstagramAccount[]> = await response.json();
        if (json.success && json.data) {
          setAccounts(json.data);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [setAccounts]);

  const handleAddAccount = () => {
    setEditingId("new");
  };

  const newAccount: InstagramAccount = {
    id: "new",
    user_id: "",
    username: "",
    email: "",
    password: "",
    created_at: new Date(),
    updated_at: new Date(),
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">
          {user?.first_name ? `${user.first_name}'s ` : ""}Instagram Accounts
        </h1>
        <div className="flex w-full sm:w-auto items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              name="search"
              placeholder="Search by username or email"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={handleAddAccount} disabled={loading}>
            <Plus className="h-4 w-4 mr-2" /> Add Account
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {editingId === "new" && <InstagramCard account={newAccount} isNew />}
          {filteredAccounts.map((account) => (
            <InstagramCard key={account.id} account={account} />
          ))}
          {filteredAccounts.length === 0 && editingId !== "new" && (
            <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-lg bg-muted/50">
              <p className="text-lg font-medium">No accounts found</p>
              <p className="text-sm text-muted-foreground">
                {searchQuery
                  ? "Try a different search term"
                  : "Add your first Instagram account to get started"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
