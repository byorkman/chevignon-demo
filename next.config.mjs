/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "chevignon.vtexassets.com" },
      { protocol: "https", hostname: "chevignon.vteximg.com.br" }
    ]
  }
};

export default nextConfig;
