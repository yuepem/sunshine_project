import LocationsPage from "@/components/pages/LocationsPage";
import locationsData from "@/data/locations";
import metadataUtils from "@/lib/seo/metadata";
import schemaUtils from "@/lib/seo/schema";

const { locations } = locationsData;
const { buildMetadata } = metadataUtils;
const { buildCollectionPageSchema, serializeJsonLd } = schemaUtils;

export const metadata = buildMetadata({
  title: "Sunrise & Sunset Times by City | Where Is The Sun",
  description:
    "Browse sunrise, sunset, and daylight data for 12 cities across 6 continents - from Reykjavik to Singapore.",
  pathname: "/locations",
});

export default function Page() {
  const schema = buildCollectionPageSchema({
    name: "Sunrise & Sunset Times by City",
    description: metadata.description,
    pathname: "/locations",
    items: locations.map((location) => ({
      name: `${location.name}, ${location.country}`,
      pathname: `/locations/${location.slug}`,
    })),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(schema),
        }}
      />
      <LocationsPage />
    </>
  );
}
