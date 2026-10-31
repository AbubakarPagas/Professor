import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Ensure Firebase ESM packages are transpiled correctly by Next.js
  transpilePackages: [
    'firebase',
    '@firebase/auth',
    '@firebase/firestore',
    '@firebase/storage',
    '@firebase/app',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
}

export default nextConfig
