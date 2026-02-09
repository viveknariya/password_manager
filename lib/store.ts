import { atom } from "jotai";
import { User, InstagramAccount, AppDefinition } from "@/lib/types";

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

export const availableApps: AppDefinition[] = [
  {
    id: "instagram",
    name: "Instagram",
    icon: "/instagram.png",
    url: "/apps/instagram",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "/facebook.png",
    url: "/apps/facebook",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: "/twitter.png",
    url: "/apps/twitter",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "/youtube.png",
    url: "/apps/youtube",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: "/whatsapp.png",
    url: "/apps/whatsapp",
  },
];

const defaultInstalledAppIds = ["instagram"];

const getInitialInstalledAppIds = () => {
  if (typeof window === "undefined") return defaultInstalledAppIds;
  try {
    const stored = window.localStorage.getItem("installed_apps");
    if (!stored) return defaultInstalledAppIds;
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) {
      return parsed.filter((id) =>
        availableApps.some((app) => app.id === id),
      );
    }
  } catch {
    // Ignore malformed storage and fall back to defaults.
  }
  return defaultInstalledAppIds;
};

export const installedAppIdsAtom = atom<string[]>(getInitialInstalledAppIds());

export const installedAppsAtom = atom((get) => {
  const ids = get(installedAppIdsAtom);
  return availableApps.filter((app) => ids.includes(app.id));
});
