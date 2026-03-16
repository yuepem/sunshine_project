import { notFound } from "next/navigation";
import ToolPage from "@/components/pages/ToolPage";
import toolsData from "@/data/tools";
import locationsData from "@/data/locations";
import metadataUtils from "@/lib/seo/metadata";
import schemaUtils from "@/lib/seo/schema";

const { tools, getToolBySlug } = toolsData;
const { locations } = locationsData;
const { buildMetadata } = metadataUtils;
const { buildWebApplicationSchema, serializeJsonLd } = schemaUtils;

export function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export function generateMetadata({ params }) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    return buildMetadata({
      title: "Tool Not Found",
      description: "The requested tool page does not exist.",
      pathname: null,
      index: false,
      includeCanonical: false,
    });
  }

  return buildMetadata({
    title: `${tool.name} - Free Online Tool | Where Is The Sun`,
    description: `${tool.description} Works for any location with real-time data and interactive visualization.`,
    pathname: `/tools/${tool.slug}`,
  });
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
