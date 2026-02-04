import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FolderGit2 } from "lucide-react";

export default function PageHero() {
  return (
    <>
      <section className="relative py-24 md:py-32 overflow-hidden border-b">
        <div className="container relative px-4 md:px-6 max-w-6xl mx-auto">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-6 rounded-full px-4 py-1">
              🔒 Your Social Security, Simplified
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
              Manage your{" "}
              <span className="text-primary italic">social credentials</span> in
              one secure vault.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              A minimal and secure way to manage your Google, Facebook,
              Instagram, and YouTube logins. Open-source and privacy-focused.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/login">
                <Button size="lg" className="px-8 h-12 text-base font-semibold">
                  Get Started for Free
                </Button>
              </Link>
              <Link
                target="_blank"
                href="https://github.com/viveknariya/saas_template"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 h-12 text-base"
                >
                  View on GitHub
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
