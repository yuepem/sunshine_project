const siteConfig = require("./site");

const { siteName, siteUrl, defaultDescription } = siteConfig;

function buildCanonical(pathname = "/") {
  return pathname === "/" ? siteUrl : `${siteUrl}${pathname}`;
}

function buildMetadata({
  title,
  description = defaultDescription,
  pathname = "/",
  type = "website",
}) {
  const canonical = buildCanonical(pathname);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type,
      siteName,
      title,
      description,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

module.exports = {
  buildCanonical,
  buildMetadata,
};
