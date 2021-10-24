const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'ja',
    locales: ['en', 'ja'],
    localePath: path.resolve('./public/locales'),
  },
  localeExtension: 'yml',
  ns: ['common', 'farming', 'items', 'material', 'servants'],
}