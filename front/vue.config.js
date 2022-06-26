const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const ElementPlus = require('unplugin-element-plus/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports =({
  //transpileDependencies: true,
  outputDir: './build',
  lintOnSave: false,
  devServer: {
    port: 8081,
    host: '127.0.0.1',
    proxy: {
      '/api': {
        target: "http://127.0.0.1:8082",
        changeOrigin: true,
        pathRewrite: { // pathRewrite 的作用是把实际Request Url中的'/api'用""代替
          '^/api': ""
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components'
      }
    },
    //配置webpack自动按需引入element-plus，
    plugins: [
      ElementPlus({
        importStyle: 'sass',
        useSource: true
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
})
