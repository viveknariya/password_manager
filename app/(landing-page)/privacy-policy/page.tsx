import { getMetadataSitemap } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// 1. Get SEO data for the new "/privacy-policy" route
const seoData = getMetadataSitemap("/privacy-policy");

export async function generateMetadata() {
  return seoData.metaData;
}

export default function PrivacyPolicyPage() {
  const lastUpdated = new Date(
    seoData.sitemapData.lastModified
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent -z-10 pointer-events-none" />
        <div className="absolute top-[10%] right-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-[20%] left-[5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

        <div className="container px-4 md:px-6 py-20 max-w-4xl mx-auto relative">
          <div className="mb-16 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              {seoData.metaData.title as string}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              At Zallyy, we value your privacy and transparency. This policy outlines how we handle information in the context of our free SaaS template.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Last updated: {lastUpdated}
            </div>
          </div>

          <div className="grid gap-8">
            <Card className="border-primary/10 bg-card/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="h-8 w-1 bg-primary rounded-full" />
                  Introduction & Purpose
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                <p>
                  Zallyy provides a modern, full-stack SaaS template designed to help developers launch products faster. Our philosophy is built on open-source principles and developer empowerment. This Privacy Policy explains our practices regarding data collection on this website and our relationship with the provided source code.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/10 bg-card/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="h-8 w-1 bg-primary rounded-full" />
                  The "Free Now" GitHub Repository
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  We are proud to offer our core SaaS template code for free. The source code is publicly available on GitHub for anyone to use, modify, and distribute.
                </p>
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                  <h4 className="font-semibold text-foreground mb-2">Important Clarity:</h4>
                  <p className="text-sm">
                    When you fork or download our code from GitHub, you become the "Data Controller" for any application you build. Zallyy does not collect, see, or store any data from users of your hosted version. You are responsible for implementing your own privacy policy and security measures for your users.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10 bg-card/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="h-8 w-1 bg-primary rounded-full" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-bold text-foreground">Directly Provided</h3>
                  <p className="text-sm">
                    If you contact us via email, subscribe to our newsletter, or reach out for support, we may store your email address and any information you voluntarily provide to assist you.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-foreground">Automatically Collected</h3>
                  <p className="text-sm">
                    Like most websites, we collect standard browsing data such as IP addresses, browser types, and referral URLs to understand our landing page performance and prevent abuse.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10 bg-card/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="h-8 w-1 bg-primary rounded-full" />
                  How We Use Your Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    To maintain and improve our template and website
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    To send updates about the GitHub repository
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    To respond to your support requests
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    To detect and prevent fraudulent activity
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/10 bg-card/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="h-8 w-1 bg-primary rounded-full" />
                  Your Rights & Choices
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                <p>
                  You have the right to access, correct, or delete your personal information that we may hold. Since we collect minimal data, most requests can be handled quickly via email. You can also opt-out of any marketing communications at any time.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/10 bg-card/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="h-8 w-1 bg-primary rounded-full" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">Legal & Privacy Inquiry</p>
                  <p className="text-primary hover:underline cursor-pointer">legal@zallyy.com</p>
                </div>
                <div className="h-px w-full md:h-12 md:w-px bg-primary/10" />
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">Support</p>
                  <p className="text-muted-foreground">+91 8849110261</p>
                </div>
                <div className="h-px w-full md:h-12 md:w-px bg-primary/10" />
                <div className="text-sm italic">
                  Powered by <span className="font-bold text-foreground">Zallyy</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(seoData.jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
