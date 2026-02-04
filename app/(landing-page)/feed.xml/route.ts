import RSS from "rss";
import { seoConfig, baseUrl } from "@/lib/seo";

const feedUrl = "https://zallyy.com/feed.xml";

const avoidUrls = [
  "/",
  "/faq",
  "/blogs",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
  "/author/dhara-savaliya",
];

export async function GET() {
  const feed = new RSS({
    title: seoConfig["/"].pageTitle,
    description: seoConfig["/"].pageDescription,
    feed_url: feedUrl,
    site_url: baseUrl,
    managingEditor: "Dhara Savaliya",
    webMaster: "Dhara Savaliya",
    copyright: "Zallyy 2025. All rights reserved.",
    language: "en-US",
    categories: seoConfig["/"].pageKeywords,
    pubDate: seoConfig["/"].sitemap.lastModified,
    ttl: 60,
  });
  for (const [path, data] of Object.entries(seoConfig)) {
    if (avoidUrls.includes(path)) continue;
    feed.item({
      title: data.pageTitle,
      description: data.pageDescription,
      url: data.pageUrl,
      categories: data.pageKeywords,
      author: "Dhara Savaliya",
      date: data.sitemap.lastModified,
      enclosure: {
        url: data.ogImageUrl,
        type: "image/png",
      },
    });
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
