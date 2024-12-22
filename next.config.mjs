/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.pokemontcg.io',
          port: '', // Leave empty if no specific port is required
          pathname: '/**', // Allow all paths
        },
      ],
    },
  };
  
  export default nextConfig;
