import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import { seoConfig, baseUrl } from "@/lib/seo";

const avoidUrls = [
  "/",
  "/blogs",
  "/docs",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
];

export default function RelatedArticles() {
  const relatedArticles = [];

  for (const [path, data] of Object.entries(seoConfig)) {
    if (avoidUrls.includes(path)) continue;
    relatedArticles.push({
      title: data.pageTitle,
      href: data.pageUrl.replace(baseUrl, ""),
      readTime: "2 min read",
      image: data.ogImageUrl.replace(baseUrl, ""),
      date: new Date(data.sitemap.lastModified).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    });
  }

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
            Recent Articles
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Explore our latest insights and articles.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {relatedArticles.map((article, index) => (
            <Link key={index} href={article.href}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden h-full cursor-pointer group">
                <div className="overflow-hidden">
                  <Image
                    width={1000}
                    height={600}
                    src={article.image!}
                    alt={article.title}
                    className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="pt-6 flex flex-col gap-3">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
