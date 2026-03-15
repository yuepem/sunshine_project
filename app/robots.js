import siteConfig from "@/lib/seo/site";

const { siteUrl } = siteConfig;

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
