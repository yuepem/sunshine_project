import Link from "next/link";
import { ArrowRight, BookOpen, MapPin, Wrench } from "lucide-react";
import Footer from "@/src/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import PopularCityLinks from "@/components/navigation/PopularCityLinks";
import guidesData from "@/data/guides";
import toolsData from "@/data/tools";

const { guides } = guidesData;
const { tools } = toolsData;

export default function GuidesPage() {
  return (
    <main>
      <div className="page-shell">
        <section className="content-card space-y-8">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/guides", label: "Guides" },
            ]}
          />
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <p className="eyebrow">Guides</p>
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Sun &amp; daylight guides
            </h1>
            <p className="lede">
              Learn solar noon, sun azimuth, and seasonal daylight change in
              plain language. Each guide explains the concept first, then points
              you to the right tool when you want to see it in action.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="info-card">
              <p className="eyebrow">Plain-language answers</p>
              <p className="mt-3 text-base leading-7 text-foreground">
                Start with the question you want answered and get a clear
                explanation before you open a calculator.
              </p>
            </div>
            <div className="info-card">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-primary" />
                <p className="eyebrow">Follow with a tool</p>
              </div>
              <p className="mt-3 text-base leading-7 text-foreground">
                Every guide has a clear next step, whether you want to open a
                calculator or compare the concept in a real city.
              </p>
            </div>
            <div className="info-card">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <p className="eyebrow">City examples</p>
              </div>
              <p className="mt-3 text-base leading-7 text-foreground">
                After reading, move into city pages to compare how the idea
                looks in high, middle, and near-equatorial latitudes.
              </p>
            </div>
          </div>
        </section>

        <section className="content-card space-y-6">
          <div className="space-y-3">
            <p className="eyebrow">Browse guides</p>
            <h2 className="section-heading">Start with the concept you want to understand</h2>
            <p className="section-copy">
              Browse the key topics in one place and open the guide that best
              matches the question you want to understand.
            </p>
          </div>

          <ul className="grid gap-4 lg:grid-cols-3">
            {guides.map((guide) => {
              const relatedTool = tools.find(
                (tool) => tool.slug === guide.relatedTool,
              );

              const guideSummaryBySlug = {
                "what-is-solar-noon":
                  "Understand why midday sun is not always the same as 12:00, and why it shifts across places and seasons.",
                "what-is-sun-azimuth":
                  "Learn how azimuth describes direction so you can read where sunlight arrives from during the day.",
                "why-daylight-hours-change":
                  "See why the year stretches and compresses daylight differently depending on latitude.",
              };

              return (
                <li key={guide.slug} className="h-full">
                  <Link href={`/guides/${guide.slug}`} className="link-card h-full">
                    <p className="eyebrow">Guide</p>
                    <h3 className="mt-3 text-2xl font-semibold text-foreground">
                      {guide.h1}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      {guideSummaryBySlug[guide.slug]}
                    </p>
                    {relatedTool ? (
                      <p className="mt-5 text-sm text-muted-foreground">
                        Try it with:{" "}
                        <span className="font-medium text-foreground">
                          {relatedTool.name}
                        </span>
                      </p>
                    ) : null}
                    <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                      Read guide
                      <ArrowRight className="h-4 w-4" />
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="content-card space-y-4">
          <div className="space-y-3">
            <p className="eyebrow">See it in action</p>
            <h2 className="section-heading">Move from explanation to live data</h2>
            <p className="section-copy">
              After you read a guide, open the matching calculator or jump to a
              city page to compare the concept against real sun data.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/tools" className="btn-primary">
              Open the calculators
            </Link>
            <Link href="/locations" className="btn-secondary">
              Browse city pages
            </Link>
          </div>
        </section>

        <PopularCityLinks
          limit={6}
          title="Compare each guide with real city pages"
        />
      </div>
      <Footer />
    </main>
  );
}
