import Link from "next/link";
import Footer from "@/src/components/Footer";

export default function NotFound() {
  return (
    <main>
      <div className="page-shell">
        <section className="content-card space-y-6">
          <p className="eyebrow">404</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Page not found
          </h1>
          <p className="lede">
            The route you requested does not exist. Use the crawlable location,
            tool, and guide pages instead.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full bg-teal-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
            >
              Back to homepage
            </Link>
            <Link
              href="/locations"
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Browse locations
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
