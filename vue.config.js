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
        target: "http://192.168.43.15:8090",
        changeOrigin: true
      }
    }
  }
};
