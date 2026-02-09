import { notFound } from "next/navigation";
import { availableApps } from "@/lib/apps";
import { AppAccountsPage } from "@/components/apps/app-accounts-page";

interface AppPageProps {
  params: Promise<{ app_id: string }>;
}

export default async function AppPage({ params }: AppPageProps) {
  const { app_id } = await params;
  const app = availableApps.find((item) => item.id === app_id);

  if (!app) {
    notFound();
  }

  return (
    <AppAccountsPage appId={app.id} appName={app.name} appIcon={app.icon} />
  );
}
