import HomePage from "@/components/pages/HomePage";
import pageMetadataUtils from "@/lib/seo/pageMetadata";
import schemaUtils from "@/lib/seo/schema";

const { buildHomePageMetadata } = pageMetadataUtils;
const { buildWebsiteSchema, serializeJsonLd } = schemaUtils;

export const metadata = buildHomePageMetadata();

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
