import Link from "next/link";
import Footer from "@/src/components/Footer";
import SunExperience from "@/components/client/SunExperience";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import PopularCityLinks from "@/components/navigation/PopularCityLinks";

export default function ToolPage({ tool, featuredLocation }) {
  return (
    <main>
      <div className="page-shell">
        <section className="content-card space-y-6">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: `/tools/${tool.slug}`, label: tool.name },
            ]}
          />
          <div className="space-y-4">
            <p className="eyebrow">Tool route</p>
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              {tool.h1}
            </h1>
            <p className="lede">{tool.intro}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-teal-300">
                Preserved source of truth
              </p>
              <p className="mt-3 text-base text-white">
                This route uses the existing calculator components instead of a
                rewritten tool UI.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-teal-300">
                Featured city
              </p>
              <p className="mt-3 text-base text-white">
                The interactive view starts with {featuredLocation.name},{" "}
                {featuredLocation.country} and can be changed from the preserved
                city controls.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-teal-300">
                Related guide
              </p>
              <Link
                href={`/guides/${
                  tool.slug === "solar-noon-calculator"
                    ? "what-is-solar-noon"
                    : tool.slug === "daylight-hours-calculator"
                      ? "why-daylight-hours-change"
                      : "what-is-sun-azimuth"
                }`}
                className="mt-3 block text-base text-white underline decoration-teal-400/60 underline-offset-4"
              >
                Read the matching concept guide
              </Link>
            </div>
          </div>
        </section>

        <section className="content-card">
          <p className="eyebrow">Task-focused experience</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">
            Interactive module selection without redesign
          </h2>
          <p className="mt-4 text-slate-300">
            The route narrows focus by reusing only the existing components that
            best fit this tool, while preserving their current visual
            presentation and interaction behavior.
          </p>
        </section>

        <SunExperience mode={tool.experienceMode} city={featuredLocation} />

        <PopularCityLinks limit={6} title="Open this tool with another city route" />
      </div>
      <Footer />
    </main>
  );
}
