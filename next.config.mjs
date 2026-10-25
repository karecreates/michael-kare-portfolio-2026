/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  transpilePackages: ['lenis', 'remotion', '@remotion/player'],
  images: {
    // Local /public assets only — avoids optimizer + wildcard remotePatterns issues
    // that can cause dev 500s / missing chunks with many large PNGs.
    unoptimized: true,
  },
};

export default nextConfig;
