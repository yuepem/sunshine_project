import siteConfig from "@/lib/seo/site";

const { siteUrl } = siteConfig;

export default function robots() {
  return {
    host: siteUrl,
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
