import LocationsPage from "@/components/pages/LocationsPage";
import metadataUtils from "@/lib/seo/metadata";

const { buildMetadata } = metadataUtils;

export const metadata = buildMetadata({
  title: "Sunrise & Sunset Times by City | Where Is The Sun",
  description:
    "Browse sunrise, sunset, and daylight data for 12 cities across 6 continents, from Reykjavik to Singapore.",
  pathname: "/locations",
});

export default function Page() {
  return <LocationsPage />;
}
