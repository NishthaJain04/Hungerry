const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': path.join(__dirname, 'src/assets')
      }
    }
  },
  lintOnSave: process.env.NODE_ENV !== "production",
  productionSourceMap: false,
  pwa: {
    themeColor: "#0095da"
  },
  devServer: {
    disableHostCheck: true,
    https: false,
    watchOptions: {
      poll: true
    },
    proxy: {
      "^/api": {
        target: "http://10.177.68.82",
        changeOrigin: true
      },
      "^/backend": {
        target: "https://wwwuata-mitra.gdn-app.com/",
        changeOrigin: true
      }
    }
  }
};
