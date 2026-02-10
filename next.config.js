/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable SWC minification to avoid syntax errors
  swcMinify: false,
  
  // Enable React strict mode
  reactStrictMode: true,
}

module.exports = nextConfig