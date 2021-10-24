const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'ja',
    locales: ['en', 'ja'],
  },
  localeExtension: 'yml',
  localePath: path.resolve('./public/locales'),
  ns: ['common', 'farming', 'items', 'material', 'servants'],
}