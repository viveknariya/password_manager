"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import {
  instagramAccountsAtom,
  editingInstagramAccountIdAtom,
} from "@/lib/store";
import { InstagramAccount, ApiResponse } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Edit2, Save, X, Loader2 } from "lucide-react";

interface InstagramCardProps {
  account: InstagramAccount;
  isNew?: boolean;
}

export function InstagramCard({ account, isNew = false }: InstagramCardProps) {
  const [accounts, setAccounts] = useAtom(instagramAccountsAtom);
  const [editingId, setEditingId] = useAtom(editingInstagramAccountIdAtom);
  const isEditing = editingId === account.id || isNew;

  const [formData, setFormData] = useState<InstagramAccount>(account);
  const [submitting, setSubmitting] = useState(false);

  const handleSave = async () => {
    setSubmitting(true);
    try {
      const url = "/api/instagram";
      const method = isNew ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isNew ? formData : { ...formData, id: account.id },
        ),
      });

      const json: ApiResponse<InstagramAccount> = await response.json();

      if (json.success && json.data) {
        if (isNew) {
          setAccounts([...accounts, json.data]);
        } else {
          setAccounts(
            accounts.map((acc) => (acc.id === account.id ? json.data! : acc)),
          );
        }
        setEditingId(null);
      } else {
        console.error("Failed to save account:", json.message);
      }
    } catch (error) {
      console.error("Error saving account:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isNew) {
      setEditingId(null);
    } else {
      setFormData(account);
      setEditingId(null);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this account?")) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/instagram", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: account.id }),
      });

      const json: ApiResponse = await response.json();

      if (json.success) {
        setAccounts(accounts.filter((acc) => acc.id !== account.id));
      } else {
        console.error("Failed to delete account:", json.message);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card
      className={`w-full ${submitting ? "opacity-70 pointer-events-none" : ""}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {isEditing
            ? isNew
              ? "New Account"
              : "Edit Account"
            : account.username || "Instagram Account"}
        </CardTitle>
        {!isEditing && (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEditingId(account.id)}
              disabled={submitting}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="text-destructive"
              disabled={submitting}
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor={`${account.id}-username`}>Username</Label>
            {isEditing ? (
              <Input
                id={`${account.id}-username`}
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                placeholder="Username"
                disabled={submitting}
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                {account.username}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`${account.id}-email`}>Email</Label>
            {isEditing ? (
              <Input
                id={`${account.id}-email`}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email"
                disabled={submitting}
              />
            ) : (
              <p className="text-sm text-muted-foreground">{account.email}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`${account.id}-password`}>Password</Label>
            {isEditing ? (
              <Input
                id={`${account.id}-password`}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Password"
                disabled={submitting}
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                {account.password}
              </p>
            )}
          </div>
        </div>
      </CardContent>
      {isEditing && (
        <CardFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancel}
            disabled={submitting}
          >
            <X className="h-4 w-4 mr-2" /> Cancel
          </Button>
          <Button size="sm" onClick={handleSave} disabled={submitting}>
            {submitting ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
