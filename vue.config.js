const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    port: 8088, // 端口号
    // proxy: {
    //   '/': {
    //     target: `https://www.fastmock.site/mock/cb0c5afeee102819b33f42bd97c83a93`,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/': ''
    //     }
    //   }
    // }
  }
})
