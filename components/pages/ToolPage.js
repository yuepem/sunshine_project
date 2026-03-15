import Link from "next/link";
import { Wrench, MapPin, BookOpen } from "lucide-react";
import Footer from "@/src/components/Footer";
import SunExperience from "@/components/client/SunExperience";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import PopularCityLinks from "@/components/navigation/PopularCityLinks";

export default function ToolPage({ tool, featuredLocation }) {
  return (
    <main>
      <div className="page-shell">
        {/* Hero Section */}
        <section className="content-card space-y-6 lg:rounded-3xl">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: `/tools/${tool.slug}`, label: tool.name },
            ]}
          />
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              <p className="eyebrow">Tool route</p>
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {tool.h1}
            </h1>
            <p className="lede">{tool.intro}</p>
          </div>

          {/* Info Grid */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="info-card">
              <p className="eyebrow">Preserved source of truth</p>
              <p className="mt-3 text-base text-foreground">
                This route uses the existing calculator components instead of a
                rewritten tool UI.
              </p>
            </div>
            <div className="info-card">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <p className="eyebrow">Featured city</p>
              </div>
              <p className="mt-3 text-base text-foreground">
                The interactive view starts with {featuredLocation.name},{" "}
                {featuredLocation.country} and can be changed from the preserved
                city controls.
              </p>
            </div>
            <div className="info-card">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <p className="eyebrow">Related guide</p>
              </div>
              <Link
                href={`/guides/${
                  tool.slug === "solar-noon-calculator"
                    ? "what-is-solar-noon"
                    : tool.slug === "daylight-hours-calculator"
                      ? "why-daylight-hours-change"
                      : "what-is-sun-azimuth"
                }`}
                className="mt-3 block text-base text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
              >
                Read the matching concept guide
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="content-card">
          <p className="eyebrow">Task-focused experience</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
            Interactive module selection without redesign
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            The route narrows focus by reusing only the existing components that
            best fit this tool, while preserving their current visual
            presentation and interaction behavior.
          </p>
        </section>

        {/* Interactive Experience */}
        <SunExperience mode={tool.experienceMode} city={featuredLocation} />

        {/* Popular Cities */}
        <PopularCityLinks limit={6} title="Open this tool with another city route" />
      </div>
      <Footer />
    </main>
  );
}
