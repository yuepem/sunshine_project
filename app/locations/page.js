import LocationsPage from "@/components/pages/LocationsPage";
import locationsData from "@/data/locations";
import pageMetadataUtils from "@/lib/seo/pageMetadata";
import schemaUtils from "@/lib/seo/schema";

const { locations } = locationsData;
const { buildLocationsPageMetadata } = pageMetadataUtils;
const { buildCollectionPageSchema, serializeJsonLd } = schemaUtils;

export const metadata = buildLocationsPageMetadata();

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
