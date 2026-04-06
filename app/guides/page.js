import GuidesPage from "@/components/pages/GuidesPage";
import metadataUtils from "@/lib/seo/metadata";

const { buildMetadata } = metadataUtils;

export const metadata = buildMetadata({
  title: "Solar Guides for Azimuth, Daylight, and Solar Noon",
  description:
    "Browse the guide library for solar noon, daylight hours, sun azimuth, and related live tool routes.",
  pathname: "/guides",
});

export default function Page() {
  return <GuidesPage />;
}
