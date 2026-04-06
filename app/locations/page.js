import Link from "next/link";
import { MapPin } from "lucide-react";
import Footer from "@/src/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import locationsData from "@/data/locations";
import metadataUtils from "@/lib/seo/metadata";

const { locations } = locationsData;
const { buildMetadata } = metadataUtils;

export const metadata = buildMetadata({
  title: "Locations for Sunrise, Sunset, and Daylight Tracking",
  description:
    "Browse crawlable city routes for sunrise, sunset, daylight hours, solar noon, and current sun position.",
  pathname: "/locations",
});

export default function LocationsPage() {
  return (
    <main>
      <div className="page-shell gap-4">
        {/* Hero Section */}
        <section className="content-card space-y-6 lg:rounded-3xl">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/locations", label: "Locations" },
            ]}
          />
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <p className="eyebrow">Locations</p>
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Browse city pages for live sun data
            </h1>
            <p className="lede">
              Each city route provides server-rendered context, unique metadata,
              and preserved interactive modules for solar position, sunrise,
              sunset, and daylight analysis.
            </p>
          </div>
        </section>

        {/* Locations Grid */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {locations.map((location) => (
            <Link
              key={location.slug}
              href={`/locations/${location.slug}`}
              className="link-card"
            >
              <p className="eyebrow">{location.region}</p>
              <h2 className="mt-3 text-2xl font-semibold text-foreground">
                {location.name}, {location.country}
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {location.summary}
              </p>
            </Link>
          ))}
        </section>
      </div>
      <Footer />
    </main>
  );
}
