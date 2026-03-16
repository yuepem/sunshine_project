import Link from "next/link";
import { ArrowRight, BookOpen, MapPin, Wrench } from "lucide-react";
import Footer from "@/src/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import guidesData from "@/data/guides";
import toolsData from "@/data/tools";
import locationsData from "@/data/locations";

const { getGuidesBySlugs } = guidesData;
const { tools } = toolsData;
const { locations } = locationsData;

export default function GuidePage({ guide }) {
  const relatedGuides = getGuidesBySlugs(guide.relatedGuides);
  const relatedTool = tools.find((tool) => tool.slug === guide.relatedTool);
  const relatedCities = guide.relatedCities
    .map((slug) => locations.find((location) => location.slug === slug))
    .filter(Boolean);

  return (
    <main>
      <div className="page-shell gap-4">
        <article className="content-card space-y-8 lg:rounded-3xl">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/guides", label: "Guides" },
              { href: `/guides/${guide.slug}`, label: guide.h1 },
            ]}
          />

          <header className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <p className="eyebrow">Guide · {guide.readingTime}</p>
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {guide.h1}
            </h1>
            <p className="lede">{guide.intro}</p>
          </header>

          <div className="grid gap-6">
            {guide.sections.map((section) => (
              <section key={section.heading} className="info-card">
                <h2 className="text-2xl font-semibold text-foreground">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-7 text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>

        <section className="content-card space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              <p className="eyebrow">See it in action</p>
            </div>
            <h2 className="section-heading">Open the live tool and compare real cities</h2>
            <p className="section-copy">
              See this concept in action with real data from any city.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href={`/tools/${guide.relatedTool}`} className="btn-primary">
              {relatedTool ? `Open ${relatedTool.name}` : "Open the related tool"}
            </Link>
            <Link href="/locations" className="btn-secondary">
              Browse city pages
            </Link>
          </div>

          {relatedCities.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-3">
              {relatedCities.map((location) => (
                <Link
                  key={location.slug}
                  href={`/locations/${location.slug}`}
                  className="link-card"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <p className="eyebrow">Case city</p>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-foreground">
                    {location.name}, {location.country}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {location.summary}
                  </p>
                  <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    View city page
                    <ArrowRight className="h-4 w-4" />
                  </p>
                </Link>
              ))}
            </div>
          ) : null}
        </section>

        {relatedGuides.length > 0 ? (
          <aside className="content-card space-y-6">
            <div className="space-y-3">
              <p className="eyebrow">Related guides</p>
              <h2 className="section-heading">Keep reading from the same topic cluster</h2>
              <p className="section-copy">
                Open the next guide when you want more context, a comparison
                angle, or a more practical application of the same idea.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {relatedGuides.map((relatedGuide) => (
                <Link
                  key={relatedGuide.slug}
                  href={`/guides/${relatedGuide.slug}`}
                  className="link-card"
                >
                  <p className="eyebrow">Guide</p>
                  <h3 className="mt-3 text-2xl font-semibold text-foreground">
                    {relatedGuide.h1}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {relatedGuide.description}
                  </p>
                  <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                    Read guide
                    <ArrowRight className="h-4 w-4" />
                  </p>
                </Link>
              ))}
            </div>
          </aside>
        ) : null}
      </div>
      <Footer />
    </main>
  );
}
