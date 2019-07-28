const path = require('path');

const api = 'mock'; // process.env.NODE_ENV === 'development' ? 'mock' : 'server';
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'api-client': resolve(`src/api/${api}/index.js`)
      }
    }
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
    }
  },
};
