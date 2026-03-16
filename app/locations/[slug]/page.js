import { notFound } from "next/navigation";
import CityPage from "@/components/pages/CityPage";
import locationsData from "@/data/locations";
import pageMetadataUtils from "@/lib/seo/pageMetadata";
import sunUtils from "@/lib/sun/calculateSunSnapshot";

const { locations, getLocationBySlug } = locationsData;
const { buildLocationPageMetadata } = pageMetadataUtils;
const { calculateSunSnapshot } = sunUtils;

export const revalidate = 60;

export function generateStaticParams() {
  return locations.map((location) => ({
    slug: location.slug,
  }));
}

export function generateMetadata({ params }) {
  const location = getLocationBySlug(params.slug);

  return buildLocationPageMetadata(location);
}

export default function LocationPage({ params }) {
  const location = getLocationBySlug(params.slug);

  if (!location) {
    notFound();
  }

  const snapshot = calculateSunSnapshot(location);

  return <CityPage location={location} snapshot={snapshot} />;
}
