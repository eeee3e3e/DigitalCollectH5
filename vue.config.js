const { defineConfig } = require('@vue/cli-service')
const path = require('path')

const NODE_ENV = process.env.NODE_ENV

module.exports = defineConfig({
  publicPath: NODE_ENV === 'development' ? '/' : './',
  outputDir: 'dist',
  // pages: {},
  productionSourceMap: false,
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://api.csscmeta.com',
        changOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      },
      '/static': {
        target: 'http://api.csscmeta.com',
        changOrigin: true,
        pathRewrite: {
          '^/static': ''
        }
      }
    },
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "/src/assets/styles/vant-variable.less";`,
          },
        },
      }
    }
  },
  chainWebpack(config) {
    // config
    //   .module
    //   .rule('images')
    //   .use('url-loader')
    //   .loader('url-loader')
    //   .tap(options => {
    //     return Object.assign(options || {}, {
    //       limit: 8 * 1024,
    //       esModule: false,
    //       encoding: true,
    //       name: '[hash:10].[ext]'
    //     })
    //   })
    return config
  }
})
