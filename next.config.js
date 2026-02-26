/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Language root → default docs
      {
        source: "/:lang",
        destination: "/:lang/docs/v1/introduction",
        permanent: false,
      },

      // Version root → introduction
      {
        source: "/:lang/docs/:version",
        destination: "/:lang/docs/:version/introduction",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;