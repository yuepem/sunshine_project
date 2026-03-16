import GuidesPage from "@/components/pages/GuidesPage";
import guidesData from "@/data/guides";
import pageMetadataUtils from "@/lib/seo/pageMetadata";
import schemaUtils from "@/lib/seo/schema";

const { guides } = guidesData;
const { buildGuidesPageMetadata } = pageMetadataUtils;
const { buildCollectionPageSchema, serializeJsonLd } = schemaUtils;

export const metadata = buildGuidesPageMetadata();

export default function Page() {
  const schema = buildCollectionPageSchema({
    name: "Sun & Daylight Guides",
    description: metadata.description,
    pathname: "/guides",
    items: guides.map((guide) => ({
      name: guide.h1,
      pathname: `/guides/${guide.slug}`,
    })),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(schema),
        }}
      />
      <GuidesPage />
    </>
  );
}
