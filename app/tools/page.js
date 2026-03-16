import ToolsPage from "@/components/pages/ToolsPage";
import metadataUtils from "@/lib/seo/metadata";

const { buildMetadata } = metadataUtils;

export const metadata = buildMetadata({
  title: "Free Sun Calculators - Position, Daylight & Solar Noon | Where Is The Sun",
  description:
    "Three focused calculators for sun position, daylight hours, and solar noon. Interactive, visual, free.",
  pathname: "/tools",
});

export default function Page() {
  return <ToolsPage />;
}
