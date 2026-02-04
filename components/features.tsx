import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Blocks,
  BugIcon,
  CheckCircle,
  DollarSign,
  Mail,
  MessageCircle,
  PanelTop,
  Users,
} from "lucide-react";

export default function PageFeatures() {
  return (
    <section id="features" className="py-20">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
            Features
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Everything you need to build your SaaS application.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border shadow-none hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center mb-4">
                <Blocks className="h-5 w-5 text-foreground" />
              </div>
              <CardTitle className="text-xl">Unified Social Vault</CardTitle>
              <CardDescription className="text-base">
                Securely store and organize your login credentials for Google,
                Facebook, Instagram, and YouTube.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border shadow-none hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center mb-4">
                <CheckCircle className="h-5 w-5 text-foreground" />
              </div>
              <CardTitle className="text-xl">Instant Access</CardTitle>
              <CardDescription className="text-base">
                Quickly retrieve your credentials whenever you need them with
                our minimal and efficient interface.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border shadow-none hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center mb-4">
                <Mail className="h-5 w-5 text-foreground" />
              </div>
              <CardTitle className="text-xl">Encrypted Security</CardTitle>
              <CardDescription className="text-base">
                Industry-standard encryption ensures that only you have access
                to your stored social media credentials.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="border shadow-none hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center mb-4">
                <PanelTop className="h-5 w-5 text-foreground" />
              </div>
              <CardTitle className="text-xl">Minimal Dashboard</CardTitle>
              <CardDescription className="text-base">
                A clean, distraction-free environment built with shadcn/ui for
                the best user experience.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
