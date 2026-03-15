import Link from "next/link";
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
      <div className="page-shell">
        <section className="content-card space-y-6">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/locations", label: "Locations" },
            ]}
          />
          <div className="space-y-4">
            <p className="eyebrow">Locations</p>
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Browse city pages for live sun data
            </h1>
            <p className="lede">
              Each city route provides server-rendered context, unique metadata,
              and preserved interactive modules for solar position, sunrise,
              sunset, and daylight analysis.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {locations.map((location) => (
            <Link
              key={location.slug}
              href={`/locations/${location.slug}`}
              className="content-card transition hover:border-teal-300/40 hover:bg-slate-900/70"
            >
              <p className="eyebrow">{location.region}</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                {location.name}, {location.country}
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-300">
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
