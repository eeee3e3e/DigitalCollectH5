const { defineConfig } = require('@vue/cli-service')
const path = require('path')

const NODE_ENV = process.env.NODE_ENV

module.exports = defineConfig({
  publicPath: NODE_ENV === 'development' ? '/' : './',
  outputDir: 'dist',
  assetsDir: './',
  // pages: {},
  productionSourceMap: false,
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://api.csscmeta.com',
        // http://121.196.44.29:8001
        // target: 'http://121.196.44.29:8001',
        target: 'http://121.196.44.29:8999',
        changOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      },
      '/static-proxy': {
        // target: 'http://api.csscmeta.com',
        // target: 'http://121.196.44.29:8001',
        target: 'http://121.196.44.29:8999',
        changOrigin: true,
        pathRewrite: {
          '^/static-proxy': ''
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
//      config
//         .module
//         .rule("images")
//         .test(/\.(jpg|png|gif)$/)
//         .use("url-loader")
//         .loader("url-loader")
//         .options({
//             limit:10,
//             outputPath: 'images',
//             publicPath:  './' ,
//             name: `[name].[ext]`,
//             esModule: false
//         })
//         .end()
    return config
  }
})
