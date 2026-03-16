import { notFound } from "next/navigation";
import GuidePage from "@/components/pages/GuidePage";
import guidesData from "@/data/guides";
import metadataUtils from "@/lib/seo/metadata";

const { guides, getGuideBySlug } = guidesData;
const { buildMetadata } = metadataUtils;

export function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export function generateMetadata({ params }) {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    return buildMetadata({
      title: "Guide Not Found",
      description: "The requested guide page does not exist.",
      pathname: `/guides/${params.slug}`,
    });
  }

  return buildMetadata({
    title: guide.metadata?.title || guide.title,
    description: guide.metadata?.description || guide.description,
    pathname: `/guides/${guide.slug}`,
    type: "article",
  });
}

export default function GuideRoutePage({ params }) {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    notFound();
  }

  return <GuidePage guide={guide} />;
}
