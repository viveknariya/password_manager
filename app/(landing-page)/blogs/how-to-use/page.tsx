import { getMetadataSitemap } from "@/lib/seo";

const seoData = getMetadataSitemap("/blogs/how-to-use");

export async function generateMetadata() {
  return seoData.metaData;
}

export default function HowToUseSocialVault() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl space-y-12">
      {/* Header Section */}
      <div className="space-y-4 border-b pb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          How to Use SocialVault
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Master your social media security with this simple guide to managing
          your credentials in one secure location.
        </p>
      </div>

      <div className="space-y-10">
        {/* Step 1 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
              1
            </span>
            Create Your Vault
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Start by creating a free account. Your SocialVault is private and
            encrypted, ensuring that your digital identities are always
            protected.
          </p>
        </section>

        {/* Step 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
              2
            </span>
            Add Your Credentials
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Open Manage Apps and add credentials for Google, Facebook,
            Instagram, or YouTube. Simply enter your username and password for
            each platform.
          </p>
          <div className="rounded-lg border bg-muted p-6 font-mono text-sm space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>AES-256 Encryption active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>Zero-knowledge architecture</span>
            </div>
          </div>
        </section>

        {/* Step 3 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
              3
            </span>
            One-Tap Access
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Whenever you need to log in, just open your vault and copy your
            credentials. No more resetting passwords or juggling multiple apps.
          </p>
        </section>

        {/* Security Section */}
        <section className="space-y-4 pt-8 border-t">
          <h2 className="text-2xl font-bold">Privacy First</h2>
          <p className="text-muted-foreground leading-relaxed">
            SocialVault is designed with a minimal footprint. We don&apos;t
            track your browsing history or store any data beyond what is
            absolutely necessary to manage your credentials.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
            <li className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-muted flex items-center justify-center text-[10px] border">
                ✓
              </div>
              Open Source
            </li>
            <li className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-muted flex items-center justify-center text-[10px] border">
                ✓
              </div>
              Independently Auditable
            </li>
            <li className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-muted flex items-center justify-center text-[10px] border">
                ✓
              </div>
              No Third-party Tracking
            </li>
            <li className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-muted flex items-center justify-center text-[10px] border">
                ✓
              </div>
              Minimalist UI
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
