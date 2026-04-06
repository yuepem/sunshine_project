import Link from "next/link";
import { MapPin } from "lucide-react";
import locationsData from "@/data/locations";

const { locations } = locationsData;

export default function PopularCityLinks({ limit = 6, title = "Popular cities" }) {
  const selectedLocations = locations.slice(0, limit);

  return (
    <section className="content-card">
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <p className="eyebrow">Explore cities</p>
          </div>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">{title}</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {selectedLocations.map((location) => (
            <Link
              key={location.slug}
              href={`/locations/${location.slug}`}
              className="tag transition-all hover:border-primary hover:bg-primary/20"
            >
              {location.name}, {location.country}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
