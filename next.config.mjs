/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images:{
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'res.cloudinary.com',
    //     port: '',
    //     pathname: '',
    //   },
    // ],
    domains: ['res.cloudinary.com']
  },
};

export default nextConfig;
