import Link from "next/link";
import { BookOpen, MapPin, Wrench } from "lucide-react";
import Footer from "@/src/components/Footer";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import PopularCityLinks from "@/components/navigation/PopularCityLinks";
import toolsData from "@/data/tools";

const { tools } = toolsData;

export default function ToolsPage() {
  return (
    <main>
      <div className="page-shell">
        <section className="content-card space-y-6 lg:rounded-3xl">
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
              Explore the live solar tools
            </h1>
            <p className="lede">
              Each tool keeps the existing simulator modules intact while
              focusing the page around one practical question: sun position,
              daylight hours, or solar noon.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="info-card">
              <p className="eyebrow">Preserved interaction</p>
              <p className="mt-3 text-base text-foreground">
                These routes reuse the current simulator, chart, and controls
                instead of replacing them with new widget shells.
              </p>
            </div>
            <div className="info-card">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <p className="eyebrow">City-aware</p>
              </div>
              <p className="mt-3 text-base text-foreground">
                Start with a featured city, then switch location from the
                preserved city and map controls inside the experience.
              </p>
            </div>
            <div className="info-card">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <p className="eyebrow">Paired guides</p>
              </div>
              <p className="mt-3 text-base text-foreground">
                Each calculator has a matching guide route for readable,
                crawlable concept explanations.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.slug} href={`/tools/${tool.slug}`} className="link-card">
              <p className="eyebrow">Tool route</p>
              <h2 className="mt-3 text-2xl font-semibold text-foreground">
                {tool.name}
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {tool.description}
              </p>
            </Link>
          ))}
        </section>

        <PopularCityLinks
          limit={6}
          title="Open any tool, then switch to a live city"
        />
      </div>
      <Footer />
    </main>
  );
}
