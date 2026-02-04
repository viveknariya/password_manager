import { getMetadataSitemap } from "@/lib/seo";
import PageHero from "@/components/hero";
import PageFeatures from "@/components/features";

const seoData = getMetadataSitemap("/");

export async function generateMetadata() {
  return seoData.metaData;
}

export default function HomePage() {
  return (
    <>
      <PageHero />
      <PageFeatures />
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
