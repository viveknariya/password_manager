import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { FolderGit2 } from "lucide-react";

export default function PageHeader() {
  const navItems = [
    { name: "Features", href: "/#features" },
    { name: "Blogs", href: "/blogs" },
    { name: "Docs", href: "/docs" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center h-8 w-8 rounded bg-black">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={24}
                  height={24}
                  className="invert"
                />
              </div>
              <span className="text-xl font-bold tracking-tight">
                SocialVault
              </span>
            </Link>
          </div>

          {navItems.length > 0 && (
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button
                variant="default"
                size="sm"
                className="hidden md:inline-flex"
              >
                Open Vault
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
