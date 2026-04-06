import Link from "next/link";
import { BookOpen } from "lucide-react";
import Footer from "@/src/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import PopularCityLinks from "@/components/navigation/PopularCityLinks";

export default function GuidePage({ guide }) {
  return (
    <main>
      <div className="page-shell">
        {/* Article */}
        <article className="content-card space-y-8 lg:rounded-3xl">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/guides", label: "Guides" },
              { href: `/guides/${guide.slug}`, label: guide.h1 },
            ]}
          />
          
          {/* Header */}
          <header className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <p className="eyebrow">Guide</p>
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {guide.h1}
            </h1>
            <p className="lede">{guide.intro}</p>
          </header>

          {/* Content Sections */}
          <div className="grid gap-6">
            {guide.sections.map((section) => (
              <section key={section.heading} className="info-card">
                <h2 className="text-2xl font-semibold text-foreground">
                  {section.heading}
                </h2>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          {/* CTA Section */}
          <section className="info-card">
            <h2 className="text-2xl font-semibold text-foreground">
              Continue with the interactive tool
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              The guide explains the concept in crawlable HTML. The live
              simulator remains available on the corresponding tool route.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/tools/${guide.relatedTool}`} className="btn-primary">
                Open the related tool
              </Link>
              <Link href="/locations" className="btn-secondary">
                Browse city pages
              </Link>
            </div>
          </section>
        </article>

        {/* Popular Cities */}
        <PopularCityLinks limit={6} title="Apply the concept on live city pages" />
      </div>
      <Footer />
    </main>
  );
}
