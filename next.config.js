/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  api: {
    bodyParser: false,
    responseLimit: false,
  },
}
module.exports = nextConfig
