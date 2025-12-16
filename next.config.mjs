/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // for Next 13/14
    serverComponentsExternalPackages: ['pdf-parse'],
    // for Next 15
    serverExternalPackages: ['pdf-parse'],
  },
}

export default nextConfig
