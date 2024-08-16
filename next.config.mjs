/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images:{
    domains: ['res.cloudinary.com']
  },
  env: {
    WEBSITE_URL: "https://goalnetonline.vercel.app",
    MONGO_URL:
      "mongodb+srv://pranavpremanand:march16th@cluster0.1njw5bf.mongodb.net/goalnet",
    JWT_SECRET: "goalnetofficial",
    // CLOUDINARY_CLOUD_NAME: "dxlmn8skp",
    // CLOUDINARY_API_KEY: "452999797899128",
    // CLOUDINARY_API_SECRET: "aSjdutGACuzHuOdIIJOh2NtsitQ",
    // CLOUDINARY_URL:
    //   "cloudinary://452999797899128:aSjdutGACuzHuOdIIJOh2NtsitQ@dxlmn8skp",
    CLOUDINARY_UPLOAD_URL:
      "https://api.cloudinary.com/v1_1/dxlmn8skp/image/upload",
  },
};

export default nextConfig;
