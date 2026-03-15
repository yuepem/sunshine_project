import Link from "next/link";
import { Sun, Clock, Sunrise, Timer } from "lucide-react";
import Footer from "@/src/components/Footer";
import SunExperience from "@/components/client/SunExperience";
import PopularCityLinks from "@/components/navigation/PopularCityLinks";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export default function CityPage({ location, snapshot }) {
  return (
    <main>
      <div className="page-shell gap-4">
        {/* Hero Section */}
        <section className="content-card space-y-6 lg:rounded-3xl">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/locations", label: "Locations" },
              { href: `/locations/${location.slug}`, label: location.name },
            ]}
          />
          <div className="space-y-4">
            <p className="eyebrow">{location.region}</p>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Sunrise and Sunset Times in {location.name}
            </h1>
            <p className="lede">
              Track today&apos;s sun position in {location.name}, {location.country},
              then move into the preserved simulator, slider, map, and yearly
              chart for deeper analysis.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="info-card">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-primary" />
                <p className="eyebrow">Where is the sun now</p>
              </div>
              <p className="mt-3 text-2xl font-semibold text-foreground">
                {snapshot.isDaylight ? "Above the horizon" : "Below the horizon"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Altitude {snapshot.altitudeDegrees} and azimuth {snapshot.azimuthDegrees}.
              </p>
            </div>
            <div className="info-card">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <p className="eyebrow">Local time</p>
              </div>
              <p className="mt-3 text-2xl font-semibold text-foreground">
                {snapshot.localTime}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{location.timeZone}</p>
            </div>
            <div className="info-card">
              <div className="flex items-center gap-2">
                <Sunrise className="h-4 w-4 text-primary" />
                <p className="eyebrow">Sunrise / sunset</p>
              </div>
              <p className="mt-3 text-2xl font-semibold text-foreground">
                {snapshot.sunrise} / {snapshot.sunset}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Daylight duration {snapshot.daylightDuration}
              </p>
            </div>
            <div className="info-card">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-primary" />
                <p className="eyebrow">Solar noon</p>
              </div>
              <p className="mt-3 text-2xl font-semibold text-foreground">
                {snapshot.solarNoon}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                The rest of the page keeps the detailed interactive context.
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="content-card">
          <p className="eyebrow">Visual and interaction stack</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
            Preserved simulator and detail modules for {location.name}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            The city route keeps the current UI as its interactive source of
            truth: visual solar state first, then time controls, map-driven
            inputs, and the longer-range chart.
          </p>
        </section>

        {/* Interactive Experience */}
        <SunExperience mode="city" city={location} />

        {/* Continue Exploring Section */}
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="content-card">
            <p className="eyebrow">Continue exploring</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">
              Compare {location.name} with tools and guides
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/tools/sun-position-calculator"
                className="btn-secondary"
              >
                Sun position calculator
              </Link>
              <Link
                href="/tools/daylight-hours-calculator"
                className="btn-secondary"
              >
                Daylight hours calculator
              </Link>
              <Link
                href="/guides/why-daylight-hours-change"
                className="btn-secondary"
              >
                Why daylight hours change
              </Link>
            </div>
          </div>
          <PopularCityLinks limit={6} title="Compare with more city routes" />
        </section>
      </div>
      <Footer />
    </main>
  );
}
