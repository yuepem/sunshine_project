const siteUrl = "https://whereisthesun.org";
const siteName = "Where Is The Sun";
const defaultTitle = "Sun Position Calculator and Sunrise Sunset Times";
const defaultDescription =
  "Track where the sun is now, compare daylight hours, and explore sunrise, sunset, and solar noon data with preserved interactive solar tools.";

const defaultMetadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export { siteUrl, siteName, defaultTitle, defaultDescription };

const siteConfig = {
  siteUrl,
  siteName,
  defaultTitle,
  defaultDescription,
  defaultMetadata,
};

export default siteConfig;
