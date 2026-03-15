import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import siteConfig from "@/lib/seo/site";
import "./globals.css";
import "leaflet/dist/leaflet.css";

const { defaultMetadata, siteName } = siteConfig;

export const metadata = defaultMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <div className="min-h-screen bg-background">
          <div className="mx-auto flex min-h-screen max-w-screen-2xl flex-col">
            {children}
          </div>
        </div>
        <span className="sr-only">{siteName}</span>
      </body>
    </html>
  );
}
