import { notFound } from "next/navigation";
import ToolPage from "@/components/pages/ToolPage";
import toolsData from "@/data/tools";
import locationsData from "@/data/locations";
import pageMetadataUtils from "@/lib/seo/pageMetadata";
import schemaUtils from "@/lib/seo/schema";

const { tools, getToolBySlug } = toolsData;
const { locations } = locationsData;
const { buildToolPageMetadata } = pageMetadataUtils;
const { buildWebApplicationSchema, serializeJsonLd } = schemaUtils;

export function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export function generateMetadata({ params }) {
  const tool = getToolBySlug(params.slug);

  return buildToolPageMetadata(tool);
}

export default function ToolRoutePage({ params }) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  const featuredLocation =
    tool.representativeCitySlugs
      ?.map((slug) => locations.find((location) => location.slug === slug))
      .find(Boolean) || locations[0];
  const schema = buildWebApplicationSchema({
    name: tool.name,
    description: `${tool.description} Works for any location with real-time data and interactive visualization.`,
    pathname: `/tools/${tool.slug}`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(schema),
        }}
      />
      <ToolPage tool={tool} featuredLocation={featuredLocation} />
    </>
  );
}
