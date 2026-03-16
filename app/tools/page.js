import ToolsPage from "@/components/pages/ToolsPage";
import toolsData from "@/data/tools";
import metadataUtils from "@/lib/seo/metadata";
import schemaUtils from "@/lib/seo/schema";

const { tools } = toolsData;
const { buildMetadata } = metadataUtils;
const { buildCollectionPageSchema, serializeJsonLd } = schemaUtils;

export const metadata = buildMetadata({
  title: "Free Sun Calculators - Position, Daylight & Solar Noon | Where Is The Sun",
  description:
    "Three focused calculators for sun position, daylight hours, and solar noon. Interactive, visual, free.",
  pathname: "/tools",
});

export default function Page() {
  const schema = buildCollectionPageSchema({
    name: "Free Sun Calculators",
    description: metadata.description,
    pathname: "/tools",
    items: tools.map((tool) => ({
      name: tool.name,
      pathname: `/tools/${tool.slug}`,
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
      <ToolsPage />
    </>
  );
}
