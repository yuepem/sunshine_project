import Link from "next/link";
import Footer from "@/src/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import PopularCityLinks from "@/components/navigation/PopularCityLinks";

export default function GuidePage({ guide }) {
  return (
    <main>
      <div className="page-shell">
        <article className="content-card space-y-8">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: `/guides/${guide.slug}`, label: guide.h1 },
            ]}
          />
          <header className="space-y-4">
            <p className="eyebrow">Guide</p>
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              {guide.h1}
            </h1>
            <p className="lede">{guide.intro}</p>
          </header>
          <div className="grid gap-6">
            {guide.sections.map((section) => (
              <section key={section.heading} className="rounded-2xl border border-white/10 bg-slate-950/40 p-6">
                <h2 className="text-2xl font-semibold text-white">{section.heading}</h2>
                <p className="mt-4 text-base leading-7 text-slate-300">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
          <section className="rounded-2xl border border-white/10 bg-slate-950/40 p-6">
            <h2 className="text-2xl font-semibold text-white">
              Continue with the interactive tool
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              The guide explains the concept in crawlable HTML. The live
              simulator remains available on the corresponding tool route.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/tools/${guide.relatedTool}`}
                className="rounded-full bg-teal-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
              >
                Open the related tool
              </Link>
              <Link
                href="/locations"
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
              >
                Browse city pages
              </Link>
            </div>
          </section>
        </article>

        <PopularCityLinks limit={6} title="Apply the concept on live city pages" />
      </div>
      <Footer />
    </main>
  );
}
