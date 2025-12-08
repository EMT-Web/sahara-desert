/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow Sanity CDN images to be used with next/image
    domains: ['cdn.sanity.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

module.exports = nextConfig


