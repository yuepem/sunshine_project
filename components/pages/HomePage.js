import Link from "next/link";
import { Sun, MapPin, Clock } from "lucide-react";
import Footer from "@/src/components/Footer";
import SunExperience from "@/components/client/SunExperience";
import toolsData from "@/data/tools";
import guidesData from "@/data/guides";
import locationsData from "@/data/locations";

const { tools } = toolsData;
const { guides } = guidesData;
const { locations } = locationsData;

export default function HomePage() {
  const contentWidthClass = "mx-auto w-full max-w-6xl px-4";

  return (
    <main>
      <div className="page-shell gap-4 md:gap-4 ">
        <div className={contentWidthClass}>
          {/* Hero Section */}
          <section className="content-card overflow-hidden lg:rounded-3xl">
            <div className="space-y-8">
              <div className="max-w-4xl space-y-5">
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
              </div>

              <div className="rounded-2xl border border-border bg-secondary/60 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <p className="eyebrow">Popular cities</p>
                  </div>
                  <Link
                    href="/locations"
                    className="text-sm font-semibold text-primary transition-colors hover:text-foreground"
                  >
                    View all locations
                  </Link>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {locations.slice(0, 8).map((location) => (
                    <Link
                      key={location.slug}
                      href={`/locations/${location.slug}`}
                      className="tag transition-all hover:border-primary hover:bg-primary/20"
                    >
                      {location.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

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

        <div className={contentWidthClass}>
          {/* Tools & Guides Section */}
          <section className="grid gap-6 lg:grid-cols-2">
            {/* Tools */}
            <div className="content-card">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <p className="eyebrow">Tools</p>
                </div>
                <Link href="/tools" className="btn-secondary">
                  View all tools
                </Link>
              </div>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">
                Task-focused calculators
              </h2>
              <div className="mt-6 grid gap-4">
                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="link-card"
                  >
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
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <p className="eyebrow">Guides</p>
                </div>
                <Link href="/guides" className="btn-secondary">
                  View all guides
                </Link>
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
        </div>
      </div>
      <Footer />
    </main>
  );
}
