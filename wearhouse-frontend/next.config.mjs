/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "assets.myntassets.com", 
        port: "",
        pathname: "/v1/images/style/properties/**" // ← your image domain
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
