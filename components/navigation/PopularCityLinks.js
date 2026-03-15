import Link from "next/link";
import locationsData from "@/data/locations";

const { locations } = locationsData;

export default function PopularCityLinks({ limit = 6, title = "Popular cities" }) {
  const selectedLocations = locations.slice(0, limit);

  return (
    <section className="content-card">
      <div className="flex flex-col gap-4">
        <div>
          <p className="eyebrow">Explore cities</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{title}</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {selectedLocations.map((location) => (
            <Link
              key={location.slug}
              href={`/locations/${location.slug}`}
              className="rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 text-sm text-teal-100 transition hover:border-teal-300 hover:bg-teal-400/20"
            >
              {location.name}, {location.country}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
