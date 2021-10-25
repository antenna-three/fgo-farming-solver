/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  i18n: {
    defaultLocale: 'ja',
    locales: ['en', 'ja'],
  },
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
