import { Metadata } from "next";
import type {
  CollectionPage,
  FAQPage,
  ProfilePage,
  ContactPage,
  WebPage,
  AutoRental,
} from "schema-dts";

export const siteName = "SocialVault";
export const baseUrl = "https://socialvault.zallyy.com";
export const twitterHandle = "@_Vivek_Nariya_";

export type Sitemap = {
  url: string;
  lastModified: string;
  changeFrequency: string;
  priority: number;
};

type JsonLd =
  | CollectionPage
  | FAQPage
  | ProfilePage
  | ContactPage
  | WebPage
  | AutoRental;

export type MetadataSitemapJsonLd = {
  metaData: Metadata;
  sitemapData: Sitemap;
  jsonLd: JsonLd;
};

type pageData = {
  pageTitle: string;
  pageDescription: string;
  ogImageUrl: string;
  ogImageAlt: string;
  pageUrl: string;
  pageKeywords: string[];
  sitemap: Sitemap;
  jsonLd: JsonLd;
};

export const seoConfig: Record<string, pageData> = {};

seoConfig["/"] = {
  pageTitle: "Social Media Credential Manager | SocialVault",
  pageDescription:
    "Securely manage your Google, Facebook, Instagram, and YouTube login credentials in one minimal, encrypted vault. Open-source and privacy-focused.",
  ogImageUrl: `${baseUrl}/logo.png`,
  ogImageAlt: "SocialVault - Social Media Credential Manager",
  pageUrl: `${baseUrl}/`,
  pageKeywords: [
    "social media credential manager",
    "password manager for social media",
    "google login manager",
    "facebook credential vault",
    "secure instagram login",
    "youtube account security",
    "open-source password manager",
    "SocialVault",
  ],
  sitemap: {
    url: `${baseUrl}/`,
    lastModified: "2025-08-01T00:00:00+05:30",
    changeFrequency: "weekly",
    priority: 1.0,
  },
  jsonLd: {
    "@type": "WebPage",
    name: "SocialVault - Social Media Credential Manager",
    url: `${baseUrl}/`,
    description:
      "Securely manage your Google, Facebook, Instagram, and YouTube login credentials in one minimal, encrypted vault.",
  },
};

seoConfig["/contact"] = {
  pageTitle: "Contact | SocialVault",
  pageDescription:
    "Get in touch with the SocialVault team for support or inquiries.",
  ogImageUrl: `${baseUrl}/logo.png`,
  ogImageAlt: "Contact SocialVault",
  pageUrl: `${baseUrl}/contact`,
  pageKeywords: ["Contact SocialVault", "support"],
  sitemap: {
    url: `${baseUrl}/contact`,
    lastModified: "2025-07-25T00:00:00+05:30",
    changeFrequency: "yearly",
    priority: 0.8,
  },
  jsonLd: {
    "@type": "ContactPage",
    name: "Contact SocialVault",
    url: `${baseUrl}/contact`,
    description: "Get in touch with the SocialVault team.",
  },
};

seoConfig["/privacy-policy"] = {
  pageTitle: "Privacy Policy | SocialVault",
  pageDescription:
    "How we protect your social media credentials and data privacy.",
  ogImageUrl: `${baseUrl}/logo.png`,
  ogImageAlt: "SocialVault Privacy Policy",
  pageUrl: `${baseUrl}/privacy-policy`,
  pageKeywords: ["Privacy Policy", "Data Security"],
  sitemap: {
    url: `${baseUrl}/privacy-policy`,
    lastModified: "2026-01-11T00:00:00+05:30",
    changeFrequency: "yearly",
    priority: 0.8,
  },
  jsonLd: {
    "@type": "WebPage",
    name: "Privacy Policy - SocialVault",
    url: `${baseUrl}/privacy-policy`,
    description: "Privacy Policy for SocialVault.",
  },
};

seoConfig["/terms-and-conditions"] = {
  pageTitle: "Terms and Conditions | SocialVault",
  pageDescription:
    "Terms and Conditions for using SocialVault social media credential manager.",
  ogImageUrl: `${baseUrl}/logo.png`,
  ogImageAlt: "SocialVault Terms and Conditions",
  pageUrl: `${baseUrl}/terms-and-conditions`,
  pageKeywords: ["Terms and Conditions"],
  sitemap: {
    url: `${baseUrl}/terms-and-conditions`,
    lastModified: "2026-01-11T00:00:00+05:30",
    changeFrequency: "yearly",
    priority: 0.8,
  },
  jsonLd: {
    "@type": "WebPage",
    name: "Terms and Conditions - SocialVault",
    url: `${baseUrl}/terms-and-conditions`,
    description: "Terms and Conditions for SocialVault.",
  },
};

seoConfig["/blogs"] = {
  pageTitle: "Blogs",
  pageDescription: "Blogs",
  ogImageUrl: `${baseUrl}/logo.png`,
  ogImageAlt: "Logo",
  pageUrl: `${baseUrl}/blogs`,
  pageKeywords: ["Blogs"],
  sitemap: {
    url: `${baseUrl}/blogs`,
    lastModified: "2026-01-11T00:00:00+05:30",
    changeFrequency: "yearly",
    priority: 0.8,
  },
  jsonLd: {
    "@type": "WebPage",
    name: "Blogs",
    url: `${baseUrl}/blogs`,
    description: "Blogs",
  },
};

seoConfig["/blogs/how-to-use"] = {
  pageTitle: "How to Use SocialVault | Secure Social Media Credentials",
  pageDescription:
    "A step-by-step guide on how to securely manage your social media login credentials using SocialVault.",
  ogImageUrl: `${baseUrl}/logo.png`,
  ogImageAlt: "How to Use SocialVault",
  pageUrl: `${baseUrl}/blogs/how-to-use`,
  pageKeywords: [
    "how to use socialvault",
    "social media credential management guide",
    "secure social login",
    "credential vault tutorial",
  ],
  sitemap: {
    url: `${baseUrl}/blogs/how-to-use`,
    lastModified: "2026-02-04T00:00:00+05:30",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  jsonLd: {
    "@type": "WebPage",
    name: "How to Use SocialVault",
    url: `${baseUrl}/blogs/how-to-use`,
    description: "Learn how to secure your social identities with SocialVault.",
  },
};

seoConfig["/docs"] = {
  pageTitle: "Documentation | SocialVault",
  pageDescription:
    "Learn how to use SocialVault to manage your social media credentials securely.",
  ogImageUrl: `${baseUrl}/logo.png`,
  ogImageAlt: "SocialVault Documentation",
  pageUrl: `${baseUrl}/docs`,
  pageKeywords: ["Documentation", "Help Center"],
  sitemap: {
    url: `${baseUrl}/docs`,
    lastModified: "2026-01-11T00:00:00+05:30",
    changeFrequency: "yearly",
    priority: 0.8,
  },
  jsonLd: {
    "@type": "WebPage",
    name: "Documentation - SocialVault",
    url: `${baseUrl}/docs`,
    description: "Documentation for SocialVault.",
  },
};

export function getMetadataSitemap(slug: string): MetadataSitemapJsonLd {
  const seoData = seoConfig[slug];

  return {
    metaData: {
      title: seoData.pageTitle,
      description: seoData.pageDescription,
      keywords: seoData.pageKeywords,
      robots: "max-image-preview:large",

      // --- Canonical URL ---
      alternates: {
        canonical: seoData.pageUrl,
      },

      // --- Open Graph (Facebook, LinkedIn, etc.) ---
      openGraph: {
        title: seoData.pageTitle,
        description: seoData.pageDescription,
        url: seoData.pageUrl,
        siteName: siteName,
        images: [
          {
            url: seoData.ogImageUrl, // Must be an absolute URL
            width: 1200,
            height: 630,
            alt: seoData.ogImageAlt,
          },
        ],
        locale: "en_IN", // Locale for India
        type: "article",
      },

      // --- Twitter Card ---
      twitter: {
        card: "summary_large_image",
        title: seoData.pageTitle,
        description: seoData.pageDescription,
        site: twitterHandle, // Your brand's @ handle
        creator: twitterHandle, // The author's @ handle
        images: [seoData.ogImageUrl], // Must be an absolute URL
      },
    },
    sitemapData: {
      url: seoData.sitemap.url,
      lastModified: seoData.sitemap.lastModified,
      changeFrequency: seoData.sitemap.changeFrequency,
      priority: seoData.sitemap.priority,
    },
    jsonLd: seoData.jsonLd,
  };
}
