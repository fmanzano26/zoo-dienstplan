/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Evita que un warning de ESLint bloquee el build en Vercel
  eslint: { ignoreDuringBuilds: true },
}

module.exports = nextConfig
