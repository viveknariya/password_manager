"use client";

import { useEffect, useMemo, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { appAccountsAtom, editingAppAccountIdAtom } from "@/lib/store";
import { AppAccount, ApiResponse } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Edit2, Save, X, Loader2, Eye, EyeOff, Copy } from "lucide-react";
import { toast } from "react-hot-toast";

interface AppAccountCardProps {
  account: AppAccount;
  appId: string;
  appName?: string;
  isNew?: boolean;
}

export function AppAccountCard({
  account,
  appId,
  appName,
  isNew = false,
}: AppAccountCardProps) {
  const setAccounts = useSetAtom(appAccountsAtom);
  const [editingId, setEditingId] = useAtom(editingAppAccountIdAtom);
  const isEditing = editingId === account.id || isNew;

  const [formData, setFormData] = useState<AppAccount>(account);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setFormData(account);
    }
    setShowPassword(false);
  }, [account, isEditing]);

  const handleSave = async () => {
    setSubmitting(true);
    try {
      const url = "/api/app-accounts";
      const method = isNew ? "POST" : "PUT";

      const payload = {
        appId,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        ...(isNew ? {} : { id: account.id }),
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json: ApiResponse<AppAccount> = await response.json();

      if (json.success && json.data) {
        if (isNew) {
          setAccounts((prev) => [...prev, json.data!]);
        } else {
          setAccounts((prev) =>
            prev.map((acc) => (acc.id === account.id ? json.data! : acc)),
          );
        }
        setEditingId(null);
        toast.success(
          isNew ? "Account added successfully" : "Account updated successfully",
        );
      } else {
        toast.error(json.message || "Failed to save account");
      }
    } catch {
      toast.error("An error occurred while saving the account");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isNew) {
      setEditingId(null);
    } else {
      setFormData(account);
      setShowPassword(false);
      setEditingId(null);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this account?")) return;

    setSubmitting(true);
    try {
      const response = await fetch("/api/app-accounts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: account.id }),
      });

      const json: ApiResponse = await response.json();

      if (json.success) {
        setAccounts((prev) => prev.filter((acc) => acc.id !== account.id));
        toast.success("Account deleted successfully");
      } else {
        toast.error(json.message || "Failed to delete account");
      }
    } catch {
      toast.error("An error occurred while deleting the account");
    } finally {
      setSubmitting(false);
    }
  };

  const titleLabel = appName ? `${appName} Account` : "Account";
  const effectivePassword = isEditing ? formData.password : account.password;
  const maskedPassword = useMemo(() => {
    if (!effectivePassword) return "Not set";
    return "•".repeat(8);
  }, [effectivePassword]);

  const handleCopy = async (value: string, label: string) => {
    if (!value) {
      toast.error(`${label} is empty`);
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${label} copied`);
    } catch {
      toast.error(`Failed to copy ${label.toLowerCase()}`);
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
            : account.username || titleLabel}
        </CardTitle>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCancel}
                disabled={submitting}
                aria-label="Cancel edit"
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSave}
                disabled={submitting}
                aria-label="Save account"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditingId(account.id)}
                disabled={submitting}
                aria-label="Edit account"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                className="text-destructive"
                disabled={submitting}
                aria-label="Delete account"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor={`${account.id}-username`}>Username</Label>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  id={`${account.id}-username`}
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  placeholder="Username"
                  autoComplete="username"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={submitting}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(formData.username, "Username")}
                  disabled={submitting || !formData.username}
                  aria-label="Copy username"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-muted-foreground">
                  {account.username || "Not set"}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(account.username, "Username")}
                  disabled={!account.username}
                  aria-label="Copy username"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`${account.id}-email`}>Email</Label>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  id={`${account.id}-email`}
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Email"
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={submitting}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(formData.email, "Email")}
                  disabled={submitting || !formData.email}
                  aria-label="Copy email"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-muted-foreground">
                  {account.email || "Not set"}
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(account.email, "Email")}
                  disabled={!account.email}
                  aria-label="Copy email"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`${account.id}-password`}>Password</Label>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  id={`${account.id}-password`}
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Password"
                  autoComplete="new-password"
                  disabled={submitting}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={submitting}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(formData.password, "Password")}
                  disabled={submitting || !formData.password}
                  aria-label="Copy password"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm text-muted-foreground">
                  {showPassword ? effectivePassword || "Not set" : maskedPassword}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={!effectivePassword}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(effectivePassword, "Password")}
                    disabled={!effectivePassword}
                    aria-label="Copy password"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
