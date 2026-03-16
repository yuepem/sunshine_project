const siteUrl = "https://whereisthesun.org";
const siteName = "Where Is The Sun";
const defaultTitle =
  "Sun Position Calculator & Sunrise Sunset Times | Where Is The Sun";
const defaultDescription =
  "Track the sun's position, check sunrise and sunset times, and compare daylight hours for cities worldwide with interactive tools and 3D visualization.";
const defaultOgImagePath = "/og/share-default-1200x630.svg";
const defaultOgImage = {
  url: `${siteUrl}${defaultOgImagePath}`,
  width: 1200,
  height: 630,
  alt: "Where Is The Sun share image",
};
const publisher = {
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
};

const defaultMetadata = {
  metadataBase: new URL(siteUrl),
  title: defaultTitle,
  description: defaultDescription,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [defaultOgImage.url],
  },
};

module.exports = {
  siteUrl,
  siteName,
  defaultTitle,
  defaultDescription,
  defaultOgImagePath,
  defaultOgImage,
  publisher,
  defaultMetadata,
};
