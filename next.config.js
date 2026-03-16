const redirectUtils = require("./lib/seo/redirects");

const { getRedirectRules } = redirectUtils;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return getRedirectRules();
  },
};

module.exports = nextConfig;
