import Link from "next/link";
import { Sun, MapPin, Clock } from "lucide-react";
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
        {/* Hero Section */}
        <section className="content-card overflow-hidden lg:rounded-3xl">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <div className="space-y-5">
              <span className="tag">
                <Sun className="mr-2 h-4 w-4" />
                SunTracker
              </span>
              <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Sun Position Calculator and Sunrise Sunset Times
              </h1>
              <p className="lede">
                Find where the sun is now, compare daylight hours, and inspect
                sunrise, sunset, and solar noon with a preserved interactive
                simulator wrapped in crawlable Next.js routes.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/locations" className="btn-primary">
                  Browse locations
                </Link>
                <Link
                  href="/tools/sun-position-calculator"
                  className="btn-secondary"
                >
                  Open the calculator
                </Link>
              </div>
            </div>
            {/* Side Info Cards */}
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="info-card">
                <p className="eyebrow">Live question</p>
                <p className="mt-3 text-lg font-medium text-foreground">
                  Where is the sun now for a city you care about?
                </p>
              </div>
              {/* <div className="info-card">
                <p className="eyebrow">Route coverage</p>
                <p className="mt-3 text-lg font-medium text-foreground">
                  Homepage, locations, cities, tools, guides, sitemap, robots,
                  and true 404 handling.
                </p>
              </div> */}
              {/* <div className="info-card">
                <p className="eyebrow">Preserved UI</p>
                <p className="mt-3 text-lg font-medium text-foreground">
                  The current 3D model, map, chart, and controls still drive the
                  product experience.
                </p>
              </div> */}
            </div>
          </div>
        </section>

        {/* Popular Cities & About Section */}
        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <PopularCityLinks limit={8} />
          {/* <div className="content-card">
            <p className="eyebrow">Why this route exists</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
              Brand entry and selected interaction
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              The homepage introduces the product, surfaces crawlable route
              choices, and still lets users reach the preserved calculator
              experience without forcing a city-page layout onto the landing
              page.
            </p>
          </div> */}
        </section>

        {/* Tools & Guides Section */}
        <section className="grid gap-6 lg:grid-cols-2">
          {/* Tools */}
          <div className="content-card">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <p className="eyebrow">Tools</p>
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">
              Task-focused calculators
            </h2>
            <div className="mt-6 grid gap-4">
              {tools.map((tool) => (
                <Link key={tool.slug} href={`/tools/${tool.slug}`} className="link-card">
                  <h3 className="text-lg font-semibold text-foreground">
                    {tool.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Guides */}
          <div className="content-card">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <p className="eyebrow">Guides</p>
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">
              Learn the concepts behind the data
            </h2>
            <div className="mt-6 grid gap-4">
              {guides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className="link-card"
                >
                  <h3 className="text-lg font-semibold text-foreground">
                    {guide.h1}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {guide.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Experience Section */}
        <section aria-labelledby="interactive-experience" className="space-y-4">
          {/* <div className="content-card">
            <p className="eyebrow">Preserved interaction</p>
            <h2
              id="interactive-experience"
              className="mt-2 text-2xl font-semibold text-foreground"
            >
              Current solar position, controls, map, and chart
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              The calculator below remains the current UI source of truth. The
              migration adds route structure and metadata around it rather than
              replacing it.
            </p>
          </div> */}
          <SunExperience mode="homepage" />
        </section>
      </div>
      <Footer />
    </main>
  );
}
