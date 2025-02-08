/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  // Handle redirects
  async redirects() {
    return [
      {
        source: "/:path*//+",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
  // Handle 404s at the configuration level
  onDemandEntries: {
    // Keep pages in memory for longer
    maxInactiveAge: 25 * 1000,
    // Number of pages to keep in memory
    pagesBufferLength: 4,
  },

  // Add production error handling
  productionBrowserSourceMaps: true,
  generateEtags: true,
  poweredByHeader: false,

  // Customize server behavior
  serverRuntimeConfig: {
    errorHandling: {
      debug: false,
      reportErrors: true,
    },
  },
};

module.exports = nextConfig;
