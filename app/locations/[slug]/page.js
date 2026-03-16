import { notFound } from "next/navigation";
import CityPage from "@/components/pages/CityPage";
import locationsData from "@/data/locations";
import metadataUtils from "@/lib/seo/metadata";
import sunUtils from "@/lib/sun/calculateSunSnapshot";

const { locations, getLocationBySlug } = locationsData;
const { buildMetadata } = metadataUtils;
const { calculateSunSnapshot } = sunUtils;

export const revalidate = 60;

export function generateStaticParams() {
  return locations.map((location) => ({
    slug: location.slug,
  }));
}

export function generateMetadata({ params }) {
  const location = getLocationBySlug(params.slug);

  if (!location) {
    return buildMetadata({
      title: "Location Not Found",
      description: "The requested city page does not exist.",
      pathname: null,
      index: false,
      includeCanonical: false,
    });
  }

  const snapshot = calculateSunSnapshot(location);

  return buildMetadata({
    title: `Sunrise & Sunset Times in ${location.name} Today | Where Is The Sun`,
    description: `See today's sunrise at ${snapshot.sunrise}, sunset at ${snapshot.sunset}, and ${snapshot.daylightDuration} of daylight in ${location.name}, ${location.country}. Explore sun position, solar noon, and seasonal changes.`,
    pathname: `/locations/${location.slug}`,
  });
}

export default function LocationPage({ params }) {
  const location = getLocationBySlug(params.slug);

  if (!location) {
    notFound();
  }

  const snapshot = calculateSunSnapshot(location);

  return <CityPage location={location} snapshot={snapshot} />;
}
