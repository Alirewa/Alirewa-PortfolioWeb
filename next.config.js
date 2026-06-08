/** @type {import('next').NextConfig} */

const isGitHubPages = process.env.GITHUB_PAGES === 'true'
const basePath = isGitHubPages ? '/MyPersonal-Portfolio-Website' : ''

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(isGitHubPages && {
    basePath,
    assetPrefix: basePath,
  }),
}

module.exports = nextConfig
