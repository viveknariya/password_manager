import { atom } from "jotai";
import { User, InstagramAccount } from "@/lib/types";
import { availableApps } from "@/lib/apps";

// Auth state atom
export const userAtom = atom<User | null>(null);

// Derived atom to get auth state
export const authStateAtom = atom((get) => ({
  user: get(userAtom),
}));

// Instagram accounts state atom
export const instagramAccountsAtom = atom<InstagramAccount[]>([]);

// Search query atom
export const instagramSearchQueryAtom = atom("");

// Edited/New account id atom (use "new" for a new account)
export const editingInstagramAccountIdAtom = atom<string | null>(null);

// Filtered instagram accounts atom
export const filteredInstagramAccountsAtom = atom((get) => {
  const accounts = get(instagramAccountsAtom);
  const search = get(instagramSearchQueryAtom).toLowerCase();
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
