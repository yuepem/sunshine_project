import Link from "next/link";
import Footer from "@/src/components/Footer";
import SunExperience from "@/components/client/SunExperience";
import PopularCityLinks from "@/components/navigation/PopularCityLinks";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export default function CityPage({ location, snapshot }) {
  return (
    <main>
      <div className="page-shell">
        <section className="content-card space-y-6">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/locations", label: "Locations" },
              { href: `/locations/${location.slug}`, label: location.name },
            ]}
          />
          <div className="space-y-4">
            <p className="eyebrow">{location.region}</p>
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Sunrise and Sunset Times in {location.name}
            </h1>
            <p className="lede">
              Track today’s sun position in {location.name}, {location.country},
              then move into the preserved simulator, slider, map, and yearly
              chart for deeper analysis.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-teal-300">
                Where is the sun now
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">
                {snapshot.isDaylight ? "Above the horizon" : "Below the horizon"}
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Altitude {snapshot.altitudeDegrees}° and azimuth {snapshot.azimuthDegrees}°.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-teal-300">
                Local time
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">
                {snapshot.localTime}
              </p>
              <p className="mt-2 text-sm text-slate-300">{location.timeZone}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-teal-300">
                Sunrise / sunset
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">
                {snapshot.sunrise} / {snapshot.sunset}
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Daylight duration {snapshot.daylightDuration}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-teal-300">
                Solar noon
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">
                {snapshot.solarNoon}
              </p>
              <p className="mt-2 text-sm text-slate-300">
                The rest of the page keeps the detailed interactive context.
              </p>
            </div>
          </div>
        </section>

        <section className="content-card">
          <p className="eyebrow">Visual and interaction stack</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Preserved simulator and detail modules for {location.name}
          </h2>
          <p className="mt-4 text-slate-300">
            The city route keeps the current UI as its interactive source of
            truth: visual solar state first, then time controls, map-driven
            inputs, and the longer-range chart.
          </p>
        </section>

        <SunExperience mode="city" city={location} />

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="content-card">
            <p className="eyebrow">Continue exploring</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Compare {location.name} with tools and guides
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/tools/sun-position-calculator"
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-white/40 hover:bg-white/5"
              >
                Sun position calculator
              </Link>
              <Link
                href="/tools/daylight-hours-calculator"
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-white/40 hover:bg-white/5"
              >
                Daylight hours calculator
              </Link>
              <Link
                href="/guides/why-daylight-hours-change"
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-white transition hover:border-white/40 hover:bg-white/5"
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
