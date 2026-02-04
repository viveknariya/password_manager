import { getMetadataSitemap } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// SEO data for the "/terms-and-conditions" route
const seoData = getMetadataSitemap("/terms-and-conditions");

export async function generateMetadata() {
  return seoData.metaData;
}

export default function TermsPage() {
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
              Welcome to Zallyy. These Terms and Conditions govern your use of our SaaS template and website.
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
                  1. Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                <p>
                  By accessing the Zallyy website or using our GitHub template, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our resources or provide any information to us.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/10 bg-card/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="h-8 w-1 bg-primary rounded-full" />
                  2. GitHub Template & License
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Our core SaaS template is provided "Free Now" via our public GitHub repository. Usage of the code is subject to the terms of the license file included in the repository (typically MIT or similar open-source license).
                </p>
                <ul className="space-y-2 list-disc pl-5 text-sm">
                  <li>You are free to fork, modify, and use the code for personal or commercial projects.</li>
                  <li>Attribution to Zallyy is appreciated but governed by the specific license in the repo.</li>
                  <li>We do not provide warranties or guarantees for the code's fitness for any specific purpose.</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/10 bg-card/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="h-8 w-1 bg-primary rounded-full" />
                  3. Use of Website
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                <p>
                  The Zallyy website is intended to showcase our template and provide resources for developers. You agree not to:
                </p>
                <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    Use the site for any illegal or unauthorized purpose.
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    Attempt to disrupt the website's security or performance.
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    Scrape or use automated systems to extract data from Zallyy.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/10 bg-card/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="h-8 w-1 bg-primary rounded-full" />
                  4. Intellectual Property
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                <p>
                  While the template code on GitHub is open-source, the Zallyy brand, logo, website design, and proprietary content remain the exclusive property of Zallyy. You may not use our branding in a way that suggests endorsement without explicit permission.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/10 bg-card/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="h-8 w-1 bg-primary rounded-full" />
                  5. Limitation of Liability
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed italic">
                <p>
                  THE TEMPLATE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. IN NO EVENT SHALL ZALLY OR ITS CONTRIBUTORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE TEMPLATE OR THE USE OR OTHER DEALINGS IN THE TEMPLATE.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/10 bg-card/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="h-8 w-1 bg-primary rounded-full" />
                  6. Changes to Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground leading-relaxed">
                <p>
                  We reserve the right to modify these terms at any time. We will notify users of any changes by updating the "Last updated" date at the top of this page. Your continued use of our resources after such changes constitutes acceptance of the new terms.
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
                  <p className="font-semibold text-foreground">Legal & Terms Inquiry</p>
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
