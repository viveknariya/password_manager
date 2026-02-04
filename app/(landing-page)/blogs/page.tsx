import RelatedArticles from "@/components/related-articles";
import { getMetadataSitemap } from "@/lib/seo";

const seoData = getMetadataSitemap("/blogs");

export async function generateMetadata() {
  return seoData.metaData;
}

export default function Blogs() {
  return (
    <div>
      <RelatedArticles />
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
