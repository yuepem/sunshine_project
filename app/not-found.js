import Link from "next/link";
import Footer from "@/src/components/Footer";
import pageMetadataUtils from "@/lib/seo/pageMetadata";

const { buildNotFoundPageMetadata } = pageMetadataUtils;

export const metadata = buildNotFoundPageMetadata();

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
