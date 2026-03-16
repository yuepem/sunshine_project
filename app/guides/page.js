import GuidesPage from "@/components/pages/GuidesPage";
import metadataUtils from "@/lib/seo/metadata";

const { buildMetadata } = metadataUtils;

export const metadata = buildMetadata({
  title: "Sun & Daylight Guides | Where Is The Sun",
  description:
    "Understand solar noon, sun azimuth, and seasonal daylight changes with clear explanations and linked interactive tools.",
  pathname: "/guides",
});

export default function Page() {
  return <GuidesPage />;
}
