import HomePage from "@/components/pages/HomePage";
import metadataUtils from "@/lib/seo/metadata";
import schemaUtils from "@/lib/seo/schema";

const { buildMetadata } = metadataUtils;
const { buildWebsiteSchema, serializeJsonLd } = schemaUtils;

export const metadata = buildMetadata({
  title: "Sun Position Calculator & Sunrise Sunset Times | Where Is The Sun",
  description:
    "Track the sun's position, check sunrise and sunset times, and compare daylight hours for cities worldwide with interactive tools and 3D visualization.",
  pathname: "/",
});

export default function Page() {
  const websiteSchema = buildWebsiteSchema({
    description: metadata.description,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(websiteSchema),
        }}
      />
      <HomePage />
    </>
  );
}
