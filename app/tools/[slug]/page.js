import { notFound } from "next/navigation";
import ToolPage from "@/components/pages/ToolPage";
import toolsData from "@/data/tools";
import locationsData from "@/data/locations";
import metadataUtils from "@/lib/seo/metadata";

const { tools, getToolBySlug } = toolsData;
const { locations } = locationsData;
const { buildMetadata } = metadataUtils;

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
      pathname: `/tools/${params.slug}`,
    });
  }

  return buildMetadata({
    title: tool.title,
    description: tool.description,
    pathname: `/tools/${tool.slug}`,
  });
}

export default function ToolRoutePage({ params }) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  return <ToolPage tool={tool} featuredLocation={locations[0]} />;
}
