/** @type {import('next').NextConfig} */

const isGitHubPages = process.env.GITHUB_PAGES === 'true'
const basePath = isGitHubPages ? '/Alirewa-portfolio-website' : ''

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
