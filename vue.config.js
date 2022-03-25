const path = require('path');//引入path模块
const HtmlWebpackPlugin = require('html-webpack-plugin')
function resolve (dir) {
  return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}
module.exports = {
  lintOnSave: false,
  devServer: {
    open: false,
    port: 8071,
    https: false,
    hot: true,
    proxy: {
      '/apis': {
        target: 'http://localhost:8072',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/apis': ''
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('views', resolve('./src/views'))
      .set('assets', resolve('./src/assets'))
  },
  configureWebpack: {
    devtool: 'inline-source-map',
    externals: {
      "bmapConfig ": "bmapConfig",
      "BMapLib.DrawingManager":"BMapLib.DrawingManager"
    },
    entry: {
      index: './src/main.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname,'dist'),
      clean: true,
      publicPath: '/'
    },
  }
};