import Link from "next/link";
import { BookOpen, MapPin, Wrench } from "lucide-react";
import Footer from "@/src/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import PopularCityLinks from "@/components/navigation/PopularCityLinks";
import guidesData from "@/data/guides";

const { guides } = guidesData;

export default function GuidesPage() {
  return (
    <main>
      <div className="page-shell">
        <section className="content-card space-y-6 lg:rounded-3xl">
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
              Learn the concepts behind the live solar data
            </h1>
            <p className="lede">
              These guide routes explain the ideas in crawlable HTML first,
              then point back to the preserved tool experience when you want to
              test the concept interactively.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="info-card">
              <p className="eyebrow">Readable first</p>
              <p className="mt-3 text-base text-foreground">
                The guides are plain content pages, designed to clarify the
                terminology before you open the interactive simulator.
              </p>
            </div>
            <div className="info-card">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-primary" />
                <p className="eyebrow">Linked tools</p>
              </div>
              <p className="mt-3 text-base text-foreground">
                Every guide connects to a specific tool so the learning path and
                the interaction path stay paired.
              </p>
            </div>
            <div className="info-card">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <p className="eyebrow">Live city context</p>
              </div>
              <p className="mt-3 text-base text-foreground">
                After reading, you can move straight into city pages and compare
                the concept against real locations.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="link-card"
            >
              <p className="eyebrow">Guide route</p>
              <h2 className="mt-3 text-2xl font-semibold text-foreground">
                {guide.h1}
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {guide.description}
              </p>
            </Link>
          ))}
        </section>

        <PopularCityLinks
          limit={6}
          title="Read a guide, then compare it on live city routes"
        />
      </div>
      <Footer />
    </main>
  );
}
