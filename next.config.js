/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist', // Changes the build output directory to `./dist/`.
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'raw.githubusercontent.com',
    }],
  },
}
 
export default nextConfig
