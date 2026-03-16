import ToolsPage from "@/components/pages/ToolsPage";
import toolsData from "@/data/tools";
import pageMetadataUtils from "@/lib/seo/pageMetadata";
import schemaUtils from "@/lib/seo/schema";

const { tools } = toolsData;
const { buildToolsPageMetadata } = pageMetadataUtils;
const { buildCollectionPageSchema, serializeJsonLd } = schemaUtils;

export const metadata = buildToolsPageMetadata();

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
