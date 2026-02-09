import { atom } from "jotai";
import { User, AppAccount } from "@/lib/types";
import { availableApps } from "@/lib/apps";

// Auth state atom
export const userAtom = atom<User | null>(null);

// Derived atom to get auth state
export const authStateAtom = atom((get) => ({
  user: get(userAtom),
}));

// App accounts state atom
export const appAccountsAtom = atom<AppAccount[]>([]);

// Search query atom
export const appSearchQueryAtom = atom("");

// Edited/New account id atom (use "new" for a new account)
export const editingAppAccountIdAtom = atom<string | null>(null);

// Filtered app accounts atom
export const filteredAppAccountsAtom = atom((get) => {
  const accounts = get(appAccountsAtom);
  const search = get(appSearchQueryAtom).toLowerCase();
  if (!search) return accounts;
  return accounts.filter(
    (acc) =>
      acc.username.toLowerCase().includes(search) ||
      acc.email.toLowerCase().includes(search),
  );
});

export const installedAppIdsAtom = atom<string[]>([]);

export const installedAppsAtom = atom((get) => {
  const ids = get(installedAppIdsAtom);
  return availableApps.filter((app) => ids.includes(app.id));
});
