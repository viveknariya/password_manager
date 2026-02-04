import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldCheck, Zap, Globe, Lock } from "lucide-react";

export default function IntroductionPage() {
  return (
    <div className="space-y-10 pb-12">
      <div className="space-y-4 border-b pb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Introduction</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
          **SocialVault** is a minimal, open-source credential manager tailored
          for your social media digital identities.
        </p>
      </div>

      <Alert className="bg-primary/5 border-primary/20">
        <ShieldCheck className="h-4 w-4 text-primary" />
        <AlertTitle className="font-bold">Security First</AlertTitle>
        <AlertDescription>
          SocialVault uses industry-standard AES-256 encryption to secure your
          credentials. We follow a zero-knowledge architecture, meaning only you
          have access to your keys.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Core Pillars</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-none shadow-none bg-muted/40">
            <CardHeader className="pb-3">
              <Zap className="h-5 w-5 mb-2 text-primary" />
              <CardTitle className="text-lg">Velocity</CardTitle>
              <CardDescription>
                Designed for speed. Access your credentials in seconds with our
                lightweight dashboard.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-none shadow-none bg-muted/40">
            <CardHeader className="pb-3">
              <Globe className="h-5 w-5 mb-2 text-primary" />
              <CardTitle className="text-lg">Multi-Platform</CardTitle>
              <CardDescription>
                Native support for Google, Facebook, Instagram, and YouTube
                credential structures.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-none shadow-none bg-muted/40">
            <CardHeader className="pb-3">
              <Lock className="h-5 w-5 mb-2 text-primary" />
              <CardTitle className="text-lg">Privacy</CardTitle>
              <CardDescription>
                No tracking, no analytics, no third-party data collection.
                Purely a secure vault for your keys.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-none shadow-none bg-muted/40">
            <CardHeader className="pb-3">
              <ShieldCheck className="h-5 w-5 mb-2 text-primary" />
              <CardTitle className="text-lg">Auditable</CardTitle>
              <CardDescription>
                Fully open-source code. You can verify every line of our
                security implementation on GitHub.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <section className="space-y-4 pt-8 border-t">
        <h2 className="text-2xl font-bold tracking-tight">The Vision</h2>
        <p className="text-muted-foreground leading-relaxed text-lg">
          In a world where social media accounts are our primary digital
          passports, managing their security should be effortless. SocialVault
          aims to be the single source of truth for your social credentials,
          combining high-grade security with the simplicity of a specialized
          tool.
        </p>
      </section>
    </div>
  );
}
