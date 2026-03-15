import siteConfig from "@/lib/seo/site";
import "./globals.css";
import "leaflet/dist/leaflet.css";

const { defaultMetadata, siteName } = siteConfig;

export const metadata = defaultMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-[linear-gradient(180deg,#0f172a_0%,#164e63_38%,#0f172a_100%)] text-slate-100">
          <div className="mx-auto flex min-h-screen max-w-screen-2xl flex-col">
            {children}
          </div>
        </div>
        <span className="sr-only">{siteName}</span>
      </body>
    </html>
  );
}
