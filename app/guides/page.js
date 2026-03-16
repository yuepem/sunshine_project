import GuidesPage from "@/components/pages/GuidesPage";
import guidesData from "@/data/guides";
import metadataUtils from "@/lib/seo/metadata";
import schemaUtils from "@/lib/seo/schema";

const { guides } = guidesData;
const { buildMetadata } = metadataUtils;
const { buildCollectionPageSchema, serializeJsonLd } = schemaUtils;

export const metadata = buildMetadata({
  title: "Sun & Daylight Guides | Where Is The Sun",
  description:
    "Understand solar noon, sun azimuth, and seasonal daylight changes with clear explanations and linked interactive tools.",
  pathname: "/guides",
});

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
