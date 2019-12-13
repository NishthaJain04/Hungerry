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
        target: "http://mitra-api.qa1-sg.cld",
        changeOrigin: true
      },
      "^/backend": {
        target: "https://wwwuata-mitra.gdn-app.com/",
        changeOrigin: true
      }
    }
  }
};
