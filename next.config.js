/**
 * @type {import('next').NextConfig}
 */

const {i18n} = require('./next-i18next.config')

const nextConfig = {
  i18n,
  async redirects() {
    return [
      {
        source: '/result',
        destination: '/farming/result',
        permanent: true,
      },
      {
        source: '/results/:id',
        destination: '/farming/results/:id',
        permanent: true,
      },
      {
        source: '/import-export',
        destination: '/farming/import-export',
        permanent: true,
      },
    ]
  },
}
module.exports = nextConfig
