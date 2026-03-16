import { notFound } from "next/navigation";
import GuidePage from "@/components/pages/GuidePage";
import guidesData from "@/data/guides";
import pageMetadataUtils from "@/lib/seo/pageMetadata";
import schemaUtils from "@/lib/seo/schema";

const { guides, getGuideBySlug } = guidesData;
const { buildGuidePageMetadata } = pageMetadataUtils;
const { buildArticleSchema, serializeJsonLd } = schemaUtils;

export function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export function generateMetadata({ params }) {
  const guide = getGuideBySlug(params.slug);

  return buildGuidePageMetadata(guide);
}

export default function GuideRoutePage({ params }) {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    notFound();
  }

  const schema = buildArticleSchema({
    headline: guide.h1,
    description: `${guide.description} Learn how it works and explore it with our interactive tools.`,
    pathname: `/guides/${guide.slug}`,
    publishedDate: guide.publishedDate,
    modifiedDate: guide.modifiedDate,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(schema),
        }}
      />
      <GuidePage guide={guide} />
    </>
  );
}
