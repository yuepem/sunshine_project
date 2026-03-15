import HomePage from "@/components/pages/HomePage";
import metadataUtils from "@/lib/seo/metadata";

const { buildMetadata } = metadataUtils;

export const metadata = buildMetadata({
  title: "Sun Position Calculator and Sunrise Sunset Times",
  description:
    "Explore where the sun is now, browse city routes, and use preserved solar tools with crawlable Next.js SEO pages.",
  pathname: "/",
});

export default function Page() {
  return <HomePage />;
}
