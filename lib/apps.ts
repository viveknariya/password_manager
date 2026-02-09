import { AppDefinition } from "@/lib/types";

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

export const availableAppIds = availableApps.map((app) => app.id);
