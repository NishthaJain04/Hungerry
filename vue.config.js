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
        target: "//10.177.68.82:8090",
        changeOrigin: true
      }
    }
  }
};
