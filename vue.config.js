const webpack = require('webpack')

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  productionSourceMap: false,
  filenameHashing: false,

  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ]
  },

  css: {
    extract: false,
    loaderOptions: {
    }
  },

  chainWebpack:
      config => {
        config.optimization.delete('splitChunks')
        config.module.rule('pdf').test(/\.pdf$/).use('file-loader').loader('file-loader')
      },

}
