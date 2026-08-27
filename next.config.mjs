/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // ... অন্য কনফিগ অপশন
}

// 'module.exports' এর বদলে 'export default' ব্যবহার করুন
export default nextConfig