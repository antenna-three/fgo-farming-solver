/**
 * @type {import('next').NextConfig}
 */

const { withSentryConfig } = require('@sentry/nextjs')

const nextConfig = {
  experimental: {
    reactRoot: 'concurrent',
  },
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

const sentryWebpackPluginOptions = {
  silent: true,
}

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)
