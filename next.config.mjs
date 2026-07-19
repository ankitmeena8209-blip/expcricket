/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sportmonks.com',
      },
      {
        protocol: 'https',
        hostname: 'fonts.googleapis.com',
      }
    ],
  },
};

export default nextConfig;
