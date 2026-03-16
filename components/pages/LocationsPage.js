import Link from "next/link";
import { Compass, MapPin } from "lucide-react";
import Footer from "@/src/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import NearestLocationButton from "@/components/location/NearestLocationButton";
import QuickCitySelector from "@/components/search/QuickCitySelector";
import locationsData from "@/data/locations";

const { locations } = locationsData;

const popularLocationSlugs = [
  "stockholm",
  "paris",
  "new-york",
  "tokyo",
  "sydney",
  "reykjavik",
];

export default function LocationsPage() {
  return (
    <main>
      <div className="page-shell">
        <section className="content-card space-y-8">
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
              Sunrise &amp; sunset times by city
            </h1>
            <p className="lede">
              Browse sunrise, sunset, solar noon, and daylight pages for 12
              cities across 6 continents. Start with a city you know, or jump
              to the closest supported location in one click.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]">
            <div className="info-card">
              <QuickCitySelector
                locations={locations}
                popularSlugs={popularLocationSlugs}
                label="Find a city page"
                placeholder="Search Stockholm, Tokyo, New York..."
              />
            </div>

            <div className="info-card space-y-4">
              <div className="flex items-center gap-2">
                <Compass className="h-5 w-5 text-primary" />
                <p className="eyebrow">Quick route</p>
              </div>
              <div className="space-y-2">
                <h2 className="section-heading">Open the nearest supported city</h2>
                <p className="section-copy">
                  Use your current location to jump to the city page that best
                  matches the places covered on the site.
                </p>
              </div>
              <NearestLocationButton locations={locations} />
            </div>
          </div>
        </section>

        <section className="content-card space-y-6">
          <div className="space-y-3">
            <p className="eyebrow">Explore by city</p>
            <h2 className="section-heading">Browse all supported locations</h2>
            <p className="section-copy">
              Each city page answers the daily question first, then lets you
              compare sunrise, sunset, daylight length, and the sun&apos;s path
              through the year.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {locations.map((location) => (
              <li key={location.slug} className="h-full">
                <Link href={`/locations/${location.slug}`} className="link-card h-full">
                  <p className="eyebrow">{location.region}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-foreground">
                    {location.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">
                    {location.country}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {location.summary}
                  </p>
                  <p className="mt-5 text-sm font-medium text-primary">
                    Open city page
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <Footer />
    </main>
  );
}
