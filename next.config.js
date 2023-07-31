/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "reckfularchive.github.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "files.reckful-archive.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "catamphetamine.gitlab.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
