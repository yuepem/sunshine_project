import Link from "next/link";
import Footer from "@/src/components/Footer";
import metadataUtils from "@/lib/seo/metadata";

const { buildMetadata } = metadataUtils;

export const metadata = buildMetadata({
  title: "Page Not Found | Where Is The Sun",
  description: "The page you requested does not exist. Browse locations, tools, or guides instead.",
  pathname: null,
  index: false,
  includeCanonical: false,
});

export default function NotFound() {
  return (
    <main>
      <div className="page-shell">
        <section className="content-card space-y-6">
          <p className="eyebrow">404</p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Page not found
          </h1>
          <p className="lede">
            The page you requested does not exist. Use the locations, tools,
            and guides to find the information you need.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="btn-primary">
              Back to homepage
            </Link>
            <Link href="/locations" className="btn-secondary">
              Browse locations
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
