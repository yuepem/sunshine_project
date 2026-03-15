import Link from "next/link";
import Footer from "@/src/components/Footer";
import SunExperience from "@/components/client/SunExperience";
import PopularCityLinks from "@/components/navigation/PopularCityLinks";
import toolsData from "@/data/tools";
import guidesData from "@/data/guides";

const { tools } = toolsData;
const { guides } = guidesData;

export default function HomePage() {
  return (
    <main>
      <div className="page-shell">
        <section className="content-card overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-end">
            <div className="space-y-5">
              <p className="eyebrow">SEO-first sun tracking</p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Sun Position Calculator and Sunrise Sunset Times
              </h1>
              <p className="lede">
                Find where the sun is now, compare daylight hours, and inspect
                sunrise, sunset, and solar noon with a preserved interactive
                simulator wrapped in crawlable Next.js routes.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/locations"
                  className="rounded-full bg-teal-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
                >
                  Browse locations
                </Link>
                <Link
                  href="/tools/sun-position-calculator"
                  className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
                >
                  Open the calculator
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-teal-300">
                  Live question
                </p>
                <p className="mt-3 text-lg text-white">
                  Where is the sun now for a city you care about?
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-teal-300">
                  Route coverage
                </p>
                <p className="mt-3 text-lg text-white">
                  Homepage, locations, cities, tools, guides, sitemap, robots,
                  and true 404 handling.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
                <p className="text-sm uppercase tracking-[0.2em] text-teal-300">
                  Preserved UI
                </p>
                <p className="mt-3 text-lg text-white">
                  The current 3D model, map, chart, and controls still drive the
                  product experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <PopularCityLinks limit={8} />
          <div className="content-card">
            <p className="eyebrow">Why this route exists</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Brand entry and selected interaction
            </h2>
            <p className="mt-4 text-slate-300">
              The homepage introduces the product, surfaces crawlable route
              choices, and still lets users reach the preserved calculator
              experience without forcing a city-page layout onto the landing
              page.
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="content-card">
            <p className="eyebrow">Tools</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Task-focused calculators
            </h2>
            <div className="mt-6 grid gap-4">
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="rounded-2xl border border-white/10 bg-slate-950/40 p-5 transition hover:border-teal-300/40 hover:bg-slate-950/60"
                >
                  <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="content-card">
            <p className="eyebrow">Guides</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Learn the concepts behind the data
            </h2>
            <div className="mt-6 grid gap-4">
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="rounded-2xl border border-white/10 bg-slate-950/40 p-5 transition hover:border-teal-300/40 hover:bg-slate-950/60"
                >
                  <h3 className="text-lg font-semibold text-white">{guide.h1}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {guide.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="interactive-experience" className="space-y-4">
          <div className="content-card">
            <p className="eyebrow">Preserved interaction</p>
            <h2
              id="interactive-experience"
              className="mt-2 text-2xl font-semibold text-white"
            >
              Current solar position, controls, map, and chart
            </h2>
            <p className="mt-4 text-slate-300">
              The calculator below remains the current UI source of truth. The
              migration adds route structure and metadata around it rather than
              replacing it.
            </p>
          </div>
          <SunExperience mode="homepage" />
        </section>
      </div>
      <Footer />
    </main>
  );
}
