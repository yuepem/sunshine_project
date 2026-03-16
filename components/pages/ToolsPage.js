import Link from "next/link";
import { ArrowRight, BookOpen, MapPin, Wrench } from "lucide-react";
import Footer from "@/src/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import PopularCityLinks from "@/components/navigation/PopularCityLinks";
import guidesData from "@/data/guides";
import toolsData from "@/data/tools";

const { tools } = toolsData;
const { guides } = guidesData;

const guideByToolSlug = {
  "sun-position-calculator": "what-is-sun-azimuth",
  "daylight-hours-calculator": "why-daylight-hours-change",
  "solar-noon-calculator": "what-is-solar-noon",
};

export default function ToolsPage() {
  return (
    <main>
      <div className="page-shell">
        <section className="content-card space-y-8">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/tools", label: "Tools" },
            ]}
          />
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              <p className="eyebrow">Tools</p>
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Free sun calculators for position, daylight, and solar noon
            </h1>
            <p className="lede">
              Pick the question you want answered, then open a focused
              calculator for sun position, daylight hours, or solar noon. Each
              tool works for any supported location and connects to a matching
              guide if you want the concept explained first.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="info-card">
              <p className="eyebrow">Start with a question</p>
              <p className="mt-3 text-base leading-7 text-foreground">
                Choose the calculator that matches the answer you need right
                now: direction, day length, or solar noon timing.
              </p>
            </div>
            <div className="info-card">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <p className="eyebrow">Use real places</p>
              </div>
              <p className="mt-3 text-base leading-7 text-foreground">
                Open a tool, switch cities, and compare how the sun changes
                from Stockholm to Sydney without leaving the calculator.
              </p>
            </div>
            <div className="info-card">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <p className="eyebrow">Learn as you go</p>
              </div>
              <p className="mt-3 text-base leading-7 text-foreground">
                Every calculator points to a plain-language guide so you can
                understand the numbers and then test them with live data.
              </p>
            </div>
          </div>
        </section>

        <section className="content-card space-y-6">
          <div className="space-y-3">
            <p className="eyebrow">Choose a calculator</p>
            <h2 className="section-heading">Three focused ways to explore the sun</h2>
            <p className="section-copy">
              Browse the calculators in one place and open the one that matches
              the answer you need today.
            </p>
          </div>

          <ul className="grid gap-4 lg:grid-cols-3">
            {tools.map((tool) => {
              const relatedGuide = guides.find(
                (guide) => guide.slug === guideByToolSlug[tool.slug],
              );

              const toolSummaryBySlug = {
                "sun-position-calculator":
                  "See exactly where the sun is, then scrub through the day to compare altitude and azimuth.",
                "daylight-hours-calculator":
                  "Compare sunrise, sunset, and total daylight so seasonal changes are easy to read at a glance.",
                "solar-noon-calculator":
                  "Find the moment the sun reaches its highest point and compare how midday shifts by location.",
              };

              return (
                <li key={tool.slug} className="h-full">
                  <Link href={`/tools/${tool.slug}`} className="link-card h-full">
                    <p className="eyebrow">Tool</p>
                    <h3 className="mt-3 text-2xl font-semibold text-foreground">
                      {tool.name}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-muted-foreground">
                      {toolSummaryBySlug[tool.slug]}
                    </p>
                    {relatedGuide ? (
                      <p className="mt-5 text-sm text-muted-foreground">
                        Related guide:{" "}
                        <span className="font-medium text-foreground">
                          {relatedGuide.h1}
                        </span>
                      </p>
                    ) : null}
                    <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                      Open calculator
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
            <p className="eyebrow">See it with real cities</p>
            <h2 className="section-heading">Open a tool, then switch to a live location</h2>
            <p className="section-copy">
              Start with a calculator, then compare the result across cities
              with very different daylight patterns.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/guides" className="btn-secondary">
              Browse matching guides
            </Link>
            <Link href="/locations" className="btn-ghost">
              Explore city pages
            </Link>
          </div>
        </section>

        <PopularCityLinks
          limit={6}
          title="Try these city pages after you open a calculator"
        />
      </div>
      <Footer />
    </main>
  );
}
