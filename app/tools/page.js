import ToolsPage from "@/components/pages/ToolsPage";
import metadataUtils from "@/lib/seo/metadata";

const { buildMetadata } = metadataUtils;

export const metadata = buildMetadata({
  title: "Solar Tools for Sun Position, Daylight, and Solar Noon",
  description:
    "Browse the preserved solar tools for sun position, daylight hours, and solar noon across supported city routes.",
  pathname: "/tools",
});

export default function Page() {
  return <ToolsPage />;
}
