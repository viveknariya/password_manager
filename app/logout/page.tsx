import { LogoutButton } from "@/components/logout-form";

export default function LogoutPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Log Out</h1>
        <p className="text-muted-foreground mb-6">
          Are you sure you want to log out?
        </p>
        <LogoutButton />
      </div>
    </div>
  );
}
