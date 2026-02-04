import { getMetadataSitemap } from "@/lib/seo";

const seoData = getMetadataSitemap("/contact");

export async function generateMetadata() {
  return seoData.metaData;
}

export default function ContactPage() {
  return (
    <div className="container px-4 md:px-6 max-w-6xl mx-auto">
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSfcK4nHkaU4lah7_dgCVpkmT1GlIaj5lg9fLBIitAGdPgJHJw/viewform?embedded=true"
        width="100%"
        height="1413"
        frame-border="0"
        margin-height="0"
        margin-width="0"
      >
        Loading…
      </iframe>
      <script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(seoData.jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
