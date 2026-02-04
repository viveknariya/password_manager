import { seoConfig, baseUrl, Sitemap } from "@/lib/seo";

export default function sitemap() {
  const sitemapUrls: Sitemap[] = [];

  for (const [path, data] of Object.entries(seoConfig)) {
    if (path === "/") continue;
    sitemapUrls.push({
      url: data.pageUrl,
      lastModified: data.sitemap.lastModified,
      changeFrequency: data.sitemap.changeFrequency,
      priority: data.sitemap.priority,
    });
  }

  return [
    {
      url: baseUrl,
      lastModified: "2025-08-01T00:00:00+05:30",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...sitemapUrls,
  ];
}
