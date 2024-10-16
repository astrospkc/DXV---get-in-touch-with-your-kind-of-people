/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "icon-library.com",
        port: "",
        pathname: "/**", // Adjust this as needed to specify paths
      },
    ],
  },
};

export default nextConfig;
