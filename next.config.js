/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "/404",
        permanent: false,
        missing: true,
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
};

module.exports = nextConfig;
